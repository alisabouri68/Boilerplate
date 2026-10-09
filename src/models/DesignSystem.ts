import { Schema, type HydratedDocument, type Model, type Types } from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

/* =====================================================================
   Types
   ===================================================================== */

/** یک تم داخل Design System — با مقادیرش */
export interface IDSTheme {
  key: string;                // "light", "dark", "ocean"
  name: string;               // "Popcorn", "Night Wish"
  description?: string;
  isDefault: boolean;
  values: Map<string, string>; // "bg-brand" → "#22c55e"
}

export interface IDesignSystem {
  _id?: Types.ObjectId;

  /** پروژه‌ای که این DS بهش تعلق داره (اگر template نیست) */
  project?: Types.ObjectId;

  name: string;
  slug: string;
  description?: string;

  /** آیا یک قالب آماده‌ست؟ (بدون پروژه) */
  isTemplate: boolean;

  /** از کدام قالب کپی شده؟ */
  sourceTemplate?: Types.ObjectId;

  /** رفرنس به کتابخانه‌ی گلوبال */
  states: Types.ObjectId[];    // ref State
  tokens: Types.ObjectId[];    // ref Token
  palettes: Types.ObjectId[];  // ref ColorPalette

  /** تم‌ها — با مقادیر */
  themes: IDSTheme[];

  createdAt?: Date;
  updatedAt?: Date;
}

export type DesignSystemDocument = HydratedDocument<IDesignSystem>;

/* =====================================================================
   Sub-schemas
   ===================================================================== */

const dsThemeSchema = new Schema<IDSTheme>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    values: {
      type: Map,
      of: String,
      default: () => new Map(),
    },
  },
  { _id: false }
);

/* =====================================================================
   Main Schema
   ===================================================================== */

const designSystemSchema = new Schema<IDesignSystem>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z][a-z0-9-]*$/, "Invalid slug"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    isTemplate: {
      type: Boolean,
      default: false,
      index: true,
    },

    sourceTemplate: {
      type: Schema.Types.ObjectId,
      ref: "DesignSystem",
    },

    states: [{ type: Schema.Types.ObjectId, ref: "State" }],
    tokens: [{ type: Schema.Types.ObjectId, ref: "Token" }],
    palettes: [{ type: Schema.Types.ObjectId, ref: "ColorPalette" }],

    themes: {
      type: [dsThemeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toJSON: {
      virtuals: true,
      flattenMaps: true,      // ← مهم برای Map values
    },
    toObject: {
      virtuals: true,
      flattenMaps: true,
    },
  }
);

/* =====================================================================
   Indexes
   ===================================================================== */

// یک پروژه فقط یک DS غیر-template می‌تونه داشته باشه
designSystemSchema.index(
  { project: 1 },
  {
    unique: true,
    partialFilterExpression: { isTemplate: false, project: { $exists: true } },
  }
);

designSystemSchema.index({ isTemplate: 1, slug: 1 }, { unique: true, sparse: true });
designSystemSchema.index({ name: "text", description: "text" });

/* =====================================================================
   Statics
   ===================================================================== */

designSystemSchema.statics.findByProject = function (projectId: string) {
  return this.findOne({ project: projectId, isTemplate: false });
};

/* =====================================================================
   Export
   ===================================================================== */

export const DesignSystem: Model<IDesignSystem> = getOrCreateModel<IDesignSystem>(
  "DesignSystem",
  designSystemSchema
);

export default DesignSystem;