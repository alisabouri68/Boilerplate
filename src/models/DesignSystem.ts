import { Schema, type HydratedDocument, type Model, type Types } from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

/* =====================================================================
   Typography Slot
   ===================================================================== */

export interface ITypographyConfig {
  /** فونت‌های اصلی با نقش */
  families: {
    sans?: Types.ObjectId;
    serif?: Types.ObjectId;
    mono?: Types.ObjectId;
    display?: Types.ObjectId;
    handwriting?: Types.ObjectId;
  };

  /** سایزها — به FontSize رفرنس */
  sizes: Types.ObjectId[];

  /** وزن‌ها — به FontWeight رفرنس */
  weights: Types.ObjectId[];
}

/* =====================================================================
   Types
   ===================================================================== */

export interface IDSTheme {
  key: string;
  name: string;
  description?: string;
  isDefault: boolean;
  values: Map<string, string>;
}

export interface IDesignSystem {
  _id?: Types.ObjectId;
  project?: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  isTemplate: boolean;
  sourceTemplate?: Types.ObjectId;

  states: Types.ObjectId[];
  tokens: Types.ObjectId[];
  palettes: Types.ObjectId[];
  themes: IDSTheme[];

  /** Typography — جدید */
  typography: ITypographyConfig;

  createdAt?: Date;
  updatedAt?: Date;
}

export type DesignSystemDocument = HydratedDocument<IDesignSystem>;

/* =====================================================================
   Sub-schemas
   ===================================================================== */

const dsThemeSchema = new Schema<IDSTheme>(
  {
    key: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
    values: { type: Map, of: String, default: () => new Map() },
  },
  { _id: false }
);

const typographySchema = new Schema<ITypographyConfig>(
  {
    families: {
      sans: { type: Schema.Types.ObjectId, ref: "FontFamily" },
      serif: { type: Schema.Types.ObjectId, ref: "FontFamily" },
      mono: { type: Schema.Types.ObjectId, ref: "FontFamily" },
      display: { type: Schema.Types.ObjectId, ref: "FontFamily" },
      handwriting: { type: Schema.Types.ObjectId, ref: "FontFamily" },
    },
    sizes: [{ type: Schema.Types.ObjectId, ref: "FontSize" }],
    weights: [{ type: Schema.Types.ObjectId, ref: "FontWeight" }],
  },
  { _id: false }
);

/* =====================================================================
   Main Schema
   ===================================================================== */

const designSystemSchema = new Schema<IDesignSystem>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", index: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z][a-z0-9-]*$/, "Invalid slug"],
    },
    description: { type: String, trim: true, maxlength: 1000 },
    isTemplate: { type: Boolean, default: false, index: true },
    sourceTemplate: { type: Schema.Types.ObjectId, ref: "DesignSystem" },

    states: [{ type: Schema.Types.ObjectId, ref: "State" }],
    tokens: [{ type: Schema.Types.ObjectId, ref: "Token" }],
    palettes: [{ type: Schema.Types.ObjectId, ref: "ColorPalette" }],
    themes: { type: [dsThemeSchema], default: [] },

    typography: { type: typographySchema, default: () => ({}) },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toJSON: { virtuals: true, flattenMaps: true },
    toObject: { virtuals: true, flattenMaps: true },
  }
);

designSystemSchema.index(
  { project: 1 },
  {
    unique: true,
    partialFilterExpression: { isTemplate: false, project: { $exists: true } },
  }
);
designSystemSchema.index({ isTemplate: 1, slug: 1 }, { unique: true, sparse: true });
designSystemSchema.index({ name: "text", description: "text" });

export const DesignSystem: Model<IDesignSystem> = getOrCreateModel<IDesignSystem>(
  "DesignSystem",
  designSystemSchema
);

export default DesignSystem;