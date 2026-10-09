import mongoose, { isValidObjectId } from "mongoose";
import { Project, type IProject, type ProjectDocument } from "@/models/Project";

export interface CascadeDeleteResult {
  removedProjectIds: string[];
  count: number;
}

export interface FindManyProjectsOptions {
  filter?: mongoose.QueryFilter<IProject>;
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

export interface FindManyProjectsResult {
  items: IProject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const projectRepository = {
  /* ------------------------------ Read ------------------------------ */

  async findMany(
    options: FindManyProjectsOptions = {}
  ): Promise<FindManyProjectsResult> {
    const {
      filter = {},
      page = 1,
      limit = 20,
      sort = { createdAt: -1 },
    } = options;

    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      Project.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(safeLimit)
        .lean<IProject[]>(),
      Project.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  },

  async findById(id: string): Promise<IProject | null> {
    if (!isValidObjectId(id)) return null;
    return Project.findById(id).lean<IProject>();
  },

  async findByCustomer(customerId: string): Promise<IProject[]> {
    if (!isValidObjectId(customerId)) return [];
    return Project.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .lean<IProject[]>();
  },

  async exists(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const doc = await Project.exists({ _id: id });
    return Boolean(doc);
  },

  async count(filter: mongoose.QueryFilter<IProject> = {}): Promise<number> {
    return Project.countDocuments(filter);
  },

  /* ------------------------------ Write ----------------------------- */

  async create(data: Partial<IProject>): Promise<ProjectDocument> {
    return Project.create(data);
  },

  async updateById(
    id: string,
    data: mongoose.UpdateQuery<IProject>
  ): Promise<IProject | null> {
    if (!isValidObjectId(id)) return null;
    return Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean<IProject>();
  },

  async deleteById(id: string): Promise<IProject | null> {
    if (!isValidObjectId(id)) return null;
    return Project.findByIdAndDelete(id).lean<IProject>();
  },

  /* ---------------------- Cascade helpers --------------------------- */

  async deleteByCustomer(customerId: string): Promise<CascadeDeleteResult> {
    if (!isValidObjectId(customerId)) {
      return { removedProjectIds: [], count: 0 };
    }

    const projects = await Project.find({ customer: customerId })
      .select("_id")
      .lean<{ _id: mongoose.Types.ObjectId }[]>();

    const ids = projects.map(p => String(p._id));

    if (ids.length) {
      await Project.deleteMany({ customer: customerId });
    }

    return { removedProjectIds: ids, count: ids.length };
  },
};

export type ProjectRepository = typeof projectRepository;