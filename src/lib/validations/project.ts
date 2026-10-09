import { z } from "zod";
import { enumSchema, optionalString, trimmedString } from "./common";

/* ----------------------------- Enums ------------------------------- */

export const projectTypeEnum = [
  "web-app",
  "landing",
  "ecommerce",
  "dashboard",
  "saas",
  "api-only",
  "mobile",
  "other",
] as const;

export const projectStatusEnum = [
  "draft",
  "discovery",
  "proposal",
  "contract",
  "in-progress",
  "review",
  "delivered",
  "maintenance",
  "cancelled",
] as const;

/* --------------------------- Tech Stack ---------------------------- */

const techArray = z
  .array(z.string().trim().min(1).max(60))
  .max(30)
  .default([]);

export const techStackSchema = z.object({
  frontend: techArray,
  backend: techArray,
  database: techArray,
});

/* --------------------------- Main Schema --------------------------- */

export const createProjectSchema = z.object({
  name: trimmedString(1, 200),
  type: enumSchema(projectTypeEnum).default("web-app"),
  status: enumSchema(projectStatusEnum).default("draft"),
  description: optionalString(5000),
  techStack: techStackSchema.default({ frontend: [], backend: [], database: [] }),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;