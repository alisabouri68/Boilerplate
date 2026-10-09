import mongoose from "mongoose";
import { projectRepository } from "@/lib/repositories/project.repository";
import { customerRepository } from "@/lib/repositories/customer.repository";
import { NotFoundError, ConflictError } from "@/lib/errors/app-error";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/validations/project";
import type { IProject } from "@/models/Project";

function toObjectId(v?: string | null): mongoose.Types.ObjectId | undefined {
  if (!v) return undefined;
  return mongoose.isValidObjectId(v)
    ? new mongoose.Types.ObjectId(v)
    : undefined;
}

export const projectService = {
  /* ------------------------------- List ----------------------------- */

  async listByCustomer(customerId: string) {
    const customer = await customerRepository.findById(customerId);
    if (!customer) throw new NotFoundError("Customer");

    const items = await projectRepository.findByCustomer(customerId);
    return { items, total: items.length };
  },

  async getById(id: string): Promise<IProject> {
    const project = await projectRepository.findById(id);
    if (!project) throw new NotFoundError("Project");
    return project;
  },

  /* ------------------------------ Create ---------------------------- */

  async create(
    customerId: string,
    input: CreateProjectInput
  ): Promise<IProject> {
    const customer = await customerRepository.findById(customerId);
    if (!customer) throw new NotFoundError("Customer");

    // Unique name per customer
    const existing = await projectRepository.findMany({
      filter: { customer: toObjectId(customerId), name: input.name },
      limit: 1,
    });
    if (existing.total > 0) {
      throw new ConflictError(
        `A project named "${input.name}" already exists for this customer`
      );
    }

    const created = await projectRepository.create({
      ...input,
      customer: toObjectId(customerId),
    });

    // Update customer stats
    await customerRepository.applyProjectStats(customerId, 1, 0);

    return created.toObject() as IProject;
  },

  /* ------------------------------ Update ---------------------------- */

  async update(id: string, input: UpdateProjectInput): Promise<IProject> {
    const existing = await projectRepository.findById(id);
    if (!existing) throw new NotFoundError("Project");

    const updated = await projectRepository.updateById(id, { $set: input });
    if (!updated) throw new NotFoundError("Project");
    return updated;
  },

  /* ------------------------------ Delete ---------------------------- */

  async delete(id: string): Promise<{ id: string }> {
    const existing = await projectRepository.findById(id);
    if (!existing) throw new NotFoundError("Project");

    await projectRepository.deleteById(id);

    // Update customer stats
    const customerId = String(existing.customer);
    await customerRepository.applyProjectStats(customerId, -1, 0);

    return { id };
  },
};

export type ProjectService = typeof projectService;