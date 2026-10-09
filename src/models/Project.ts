import mongoose, {
  Schema,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

export type ProjectType =
  | "web-app"
  | "landing"
  | "ecommerce"
  | "dashboard"
  | "saas"
  | "api-only"
  | "mobile"
  | "other";

export type ProjectStatus =
  | "draft"
  | "discovery"
  | "proposal"
  | "contract"
  | "in-progress"
  | "review"
  | "delivered"
  | "maintenance"
  | "cancelled";

export interface ITechStack {
  frontend: string[];
  backend: string[];
  database: string[];
}

export interface IProject {
  _id?: Types.ObjectId;
  customer: Types.ObjectId;
  code?: string;
  name: string;
  slug?: string;
  type: ProjectType;
  status: ProjectStatus;
  description?: string;

  techStack: ITechStack;

  designSystem?: Types.ObjectId;
  manager?: Types.ObjectId;
  team?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProjectDocument = HydratedDocument<IProject>;

const techStackSchema = new Schema<ITechStack>(
  {
    frontend: { type: [String], default: [] },
    backend: { type: [String], default: [] },
    database: { type: [String], default: [] },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    code: { type: String, trim: true, unique: true, sparse: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, trim: true, lowercase: true, index: true },
    type: {
      type: String,
      enum: [
        "web-app",
        "landing",
        "ecommerce",
        "dashboard",
        "saas",
        "api-only",
        "mobile",
        "other",
      ],
      default: "web-app",
    },
    status: {
      type: String,
      enum: [
        "draft",
        "discovery",
        "proposal",
        "contract",
        "in-progress",
        "review",
        "delivered",
        "maintenance",
        "cancelled",
      ],
      default: "draft",
      index: true,
    },
    description: { type: String, trim: true, maxlength: 5000 },

    techStack: { type: techStackSchema, default: () => ({}) },

    designSystem: { type: Schema.Types.ObjectId, ref: "DesignSystem" },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.index({ customer: 1, name: 1 }, { unique: true });

export const Project: Model<IProject> = getOrCreateModel<IProject>(
  "Project",
  projectSchema
);

export default Project;