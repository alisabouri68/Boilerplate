import mongoose, { isValidObjectId } from "mongoose";
import {
  Customer,
  type ICustomer,
  type CustomerDocument,
} from "@/models/Customer";

/* =====================================================================
   Types
   ===================================================================== */

export interface FindManyOptions {
  filter?: mongoose.QueryFilter<ICustomer>;
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string;
  populate?: string[];
}

export interface FindManyResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FindByIdOptions {
  select?: string;
  populate?: string[];
}

/* =====================================================================
   Repository
   ===================================================================== */

export const customerRepository = {
  /* ============================== READ ============================== */

  /**
   * دریافت لیست مشتریان با فیلتر، صفحه‌بندی و مرتب‌سازی
   */
  async findMany(
    options: FindManyOptions = {}
  ): Promise<FindManyResult<ICustomer>> {
    const {
      filter = {},
      page = 1,
      limit = 20,
      sort = { createdAt: -1 },
      select,
      populate,
    } = options;

    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const skip = (safePage - 1) * safeLimit;

    let query = Customer.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(safeLimit);

    if (select) query = query.select(select);
    if (populate?.length) {
      for (const path of populate) {
        query = query.populate(path);
      }
    }

    const [items, total] = await Promise.all([
      query.lean<ICustomer[]>(),
      Customer.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  },

  /**
   * دریافت یک مشتری با شناسه
   */
  async findById(
    id: string,
    options: FindByIdOptions = {}
  ): Promise<ICustomer | null> {
    if (!isValidObjectId(id)) return null;

    let query = Customer.findById(id);

    if (options.select) query = query.select(options.select);
    if (options.populate?.length) {
      for (const path of options.populate) {
        query = query.populate(path);
      }
    }

    return query.lean<ICustomer>();
  },

  /**
   * دریافت مشتری با ایمیل
   */
  async findByEmail(email: string): Promise<ICustomer | null> {
    if (!email) return null;

    return Customer.findOne({
      "contact.email": email.toLowerCase().trim(),
    }).lean<ICustomer>();
  },

  /**
   * دریافت مشتری با موبایل
   */
  async findByMobile(mobile: string): Promise<ICustomer | null> {
    if (!mobile) return null;

    return Customer.findOne({
      "contact.mobile": mobile.trim(),
    }).lean<ICustomer>();
  },

  /**
   * پیدا کردن مشتری تکراری بر اساس ایمیل یا موبایل
   */
  async findDuplicate(
    email?: string,
    mobile?: string
  ): Promise<ICustomer | null> {
    const conditions: mongoose.QueryFilter<ICustomer>[] = [];

    if (email) {
      conditions.push({ "contact.email": email.toLowerCase().trim() });
    }
    if (mobile) {
      conditions.push({ "contact.mobile": mobile.trim() });
    }

    if (!conditions.length) return null;

    return Customer.findOne({ $or: conditions }).lean<ICustomer>();
  },

  /**
   * شمارش مشتریان با فیلتر
   */
  async count(
    filter: mongoose.QueryFilter<ICustomer> = {}
  ): Promise<number> {
    return Customer.countDocuments(filter);
  },

  /**
   * بررسی وجود مشتری با شناسه
   */
  async exists(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;

    const doc = await Customer.exists({ _id: id });
    return Boolean(doc);
  },

  /* ============================== WRITE ============================= */

  /**
   * ساخت مشتری جدید
   */
  async create(data: Partial<ICustomer>): Promise<CustomerDocument> {
    return Customer.create(data);
  },

  /**
   * بروزرسانی مشتری با شناسه — نسخه‌ی جدید برمی‌گردد
   */
  async updateById(
    id: string,
    data: mongoose.UpdateQuery<ICustomer>
  ): Promise<ICustomer | null> {
    if (!isValidObjectId(id)) return null;

    return Customer.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean<ICustomer>();
  },

  /**
   * حذف مشتری با شناسه
   */
  async deleteById(id: string): Promise<ICustomer | null> {
    if (!isValidObjectId(id)) return null;

    return Customer.findByIdAndDelete(id).lean<ICustomer>();
  },

  /**
   * حذف چند مشتری با فیلتر
   */
  async deleteMany(
    filter: mongoose.QueryFilter<ICustomer>
  ): Promise<number> {
    const result = await Customer.deleteMany(filter);
    return result.deletedCount ?? 0;
  },

  /* ====================== ATOMIC / COUNTERS ========================= */

  /**
   * افزایش/کاهش یک فیلد عددی به‌صورت atomic
   */
  async increment(
    id: string,
    field: keyof ICustomer,
    delta: number
  ): Promise<void> {
    if (!isValidObjectId(id)) return;

    await Customer.updateOne(
      { _id: id },
      { $inc: { [field]: delta } }
    );
  },

  /**
   * بروزرسانی آخرین زمان تماس
   */
  async touchLastContact(id: string): Promise<void> {
    if (!isValidObjectId(id)) return;

    await Customer.updateOne(
      { _id: id },
      { $set: { lastContactAt: new Date() } }
    );
  },

  /**
   * بروزرسانی هم‌زمان چند شمارنده پس از ساخت پروژه
   */
  async applyProjectStats(
    id: string,
    deltaCount: number,
    deltaRevenue: number
  ): Promise<void> {
    if (!isValidObjectId(id)) return;

    await Customer.updateOne(
      { _id: id },
      {
        $inc: {
          projectCount: deltaCount,
          totalRevenue: deltaRevenue,
        },
      }
    );
  },
};

export type CustomerRepository = typeof customerRepository;