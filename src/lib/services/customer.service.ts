import mongoose from "mongoose";
import { customerRepository } from "@/lib/repositories/customer.repository";
import { projectRepository } from "@/lib/repositories/project.repository";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors/app-error";
import type {
  CreateCustomerInput,
  UpdateCustomerInput,
  CustomerFilterInput,
} from "@/lib/validations/customer";
import type { ICustomer } from "@/models/Customer";

/* =====================================================================
   Types
   ===================================================================== */

export interface ListCustomersParams extends CustomerFilterInput {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

/* =====================================================================
   Helpers
   ===================================================================== */

/**
 * تبدیل رشته به ObjectId (اگر معتبر باشد) — وگرنه undefined
 */
function toObjectId(v?: string | null): mongoose.Types.ObjectId | undefined {
  if (!v) return undefined;
  return mongoose.isValidObjectId(v)
    ? new mongoose.Types.ObjectId(v)
    : undefined;
}

/**
 * ساخت فیلتر مونگو از روی فیلترهای کاربر
 */
function buildFilter(input: CustomerFilterInput) {
  const filter: Record<string, unknown> = {};

  if (input.type) filter.type = input.type;
  if (input.status) filter.status = input.status;
  if (input.tag) filter.tags = input.tag;

  if (input.owner) {
    const ownerId = toObjectId(input.owner as string | undefined);
    if (ownerId) filter.owner = ownerId;
  }

  if (input.q) {
    filter.$or = [
      { displayName: { $regex: input.q, $options: "i" } },
      { firstName: { $regex: input.q, $options: "i" } },
      { lastName: { $regex: input.q, $options: "i" } },
      { "company.name": { $regex: input.q, $options: "i" } },
      { "contact.email": { $regex: input.q, $options: "i" } },
      { "contact.mobile": { $regex: input.q, $options: "i" } },
    ];
  }

  return filter;
}

/**
 * چک می‌کند ایمیل/موبایل تکراری نباشد.
 */
async function assertNoDuplicate(
  email?: string,
  mobile?: string,
  excludeId?: string
) {
  if (!email && !mobile) return;

  const existing = await customerRepository.findDuplicate(email, mobile);

  if (existing && String(existing._id) !== excludeId) {
    const field =
      email && existing.contact?.email === email ? "Email" : "Mobile";
    throw new ConflictError(
      `${field} is already registered to another customer`,
      { customerId: existing._id }
    );
  }
}

/**
 * تبدیل ورودی Zod به شکل قابل ذخیره در Mongoose
 * (owner را از string به ObjectId تبدیل می‌کند)
 */
function toCustomerPayload(input: CreateCustomerInput | UpdateCustomerInput) {
  return {
    ...input,
    owner: toObjectId(input.owner as string | undefined),
  };
}

/* =====================================================================
   Service
   ===================================================================== */

export const customerService = {
  /* =============================== List ============================= */

  async list(params: ListCustomersParams = {}) {
    const filter = buildFilter(params);

    return customerRepository.findMany({
      filter,
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      sort: params.sort ?? { createdAt: -1 },
    });
  },

  /* ============================== Get One =========================== */

  async getById(id: string): Promise<ICustomer> {
    const customer = await customerRepository.findById(id);
    if (!customer) throw new NotFoundError("Customer");
    return customer;
  },

  async getByIdWithProjects(id: string): Promise<ICustomer> {
    const customer = await customerRepository.findById(id, {
      populate: ["projects"],
    });
    if (!customer) throw new NotFoundError("Customer");
    return customer;
  },

  /* ============================== Create ============================ */

  async create(input: CreateCustomerInput): Promise<ICustomer> {
    // 1) Duplicate check
    await assertNoDuplicate(input.contact?.email, input.contact?.mobile);

    // 2) Business rule: company must have a name
    if (input.type === "company" && !input.company?.name) {
      throw new ValidationError(
        "Company name is required for company customers",
        { field: "company.name" }
      );
    }

    // 3) Convert and create
    const payload = toCustomerPayload(input);
    const created = await customerRepository.create(payload);

    // 4) Return plain object
    return created.toObject() as ICustomer;
  },

  /* ============================== Update ============================ */

  async update(
    id: string,
    input: UpdateCustomerInput
  ): Promise<ICustomer> {
    // 1) Existence check
    const existing = await customerRepository.findById(id);
    if (!existing) throw new NotFoundError("Customer");

    // 2) Duplicate check (exclude self)
    await assertNoDuplicate(input.contact?.email, input.contact?.mobile, id);

    // 3) Convert and update
    const payload = toCustomerPayload(input);
    const updated = await customerRepository.updateById(id, {
      $set: payload,
    });

    if (!updated) throw new NotFoundError("Customer");
    return updated;
  },

  /* ============================== Delete ============================ */

  async delete(id: string): Promise<{ id: string }> {
    const existing = await customerRepository.findById(id);
    if (!existing) throw new NotFoundError("Customer");

    // Cascade: delete customer's projects too
    const deletedProjects = await projectRepository.deleteByCustomer(id);
    if (deletedProjects.removedProjectIds.length) {
      // TODO: also delete orphan design systems if needed
    }

    await customerRepository.deleteById(id);
    return { id };
  },

  /* =========================== Statistics =========================== */

  async stats() {
    const [total, leads, active, companies] = await Promise.all([
      customerRepository.count(),
      customerRepository.count({ status: "lead" }),
      customerRepository.count({ status: "active" }),
      customerRepository.count({ type: "company" }),
    ]);

    return { total, leads, active, companies };
  },

  /* ========================== Touch Contact ========================= */

  async touchLastContact(id: string): Promise<void> {
    const exists = await customerRepository.exists(id);
    if (!exists) throw new NotFoundError("Customer");
    await customerRepository.touchLastContact(id);
  },
};

export type CustomerService = typeof customerService;