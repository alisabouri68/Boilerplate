import {
  Schema,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

/* =====================================================================
   Types
   ===================================================================== */

export interface ITheme {
  _id?: Types.ObjectId;

  /** Programming key — lowercase, unique (e.g. "light", "dark", "ocean") */
  key: string;

  /** Human-readable name shown in UI (e.g. "Popcorn", "Night Wish") */
  name: string;

  /** Short description of what this theme represents */
  description?: string;

  /**
   * Flat key-value store for all theme values.
   * Keys are built at runtime from (tokens × states) and palettes.
   *
   * Examples:
   *   "bg-brand"        → "cyan-50"
   *   "text-success"    → "green-700"
   *   "color-primary"   → "cyan"
   */
  values: Map<string, string>;

  createdAt?: Date;
  updatedAt?: Date;
}

export type ThemeDocument = HydratedDocument<ITheme>;

/* =====================================================================
   Schema
   ===================================================================== */

const themeSchema = new Schema<ITheme>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [
        /^[a-z][a-z0-9-]*$/,
        "key must start with a letter and contain only lowercase letters, numbers, and dashes",
      ],
      maxlength: 60,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    values: {
      type: Map,
      of: String,
      default: () => new Map(),
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toJSON: {
      virtuals: true,
      flattenMaps: true,
    },
    toObject: {
      virtuals: true,
      flattenMaps: true,
    },
  },
);

/* =====================================================================
   Indexes
   ===================================================================== */

themeSchema.index({ key: 1 }, { unique: true });
themeSchema.index({ name: 1 });
themeSchema.index({ createdAt: -1 });

/* =====================================================================
   Instance methods
   ===================================================================== */

/** Get a single value by key */
themeSchema.methods.getValue = function (
  this: ThemeDocument,
  key: string,
): string | undefined {
  return this.values.get(key);
};

/** Set a single value */
themeSchema.methods.setValue = function (
  this: ThemeDocument,
  key: string,
  value: string,
): void {
  this.values.set(key, value);
};

/** Merge multiple values at once */
themeSchema.methods.mergeValues = function (
  this: ThemeDocument,
  patch: Record<string, string>,
): void {
  for (const [k, v] of Object.entries(patch)) {
    this.values.set(k, v);
  }
};

/** Remove a value */
themeSchema.methods.removeValue = function (
  this: ThemeDocument,
  key: string,
): void {
  this.values.delete(key);
};

/* =====================================================================
   Statics
   ===================================================================== */

themeSchema.statics.findByKey = function (key: string) {
  return this.findOne({ key: key.toLowerCase().trim() });
};

/* =====================================================================
   Export
   ===================================================================== */

export const Theme: Model<ITheme> = getOrCreateModel<ITheme>(
  "Theme",
  themeSchema,
);

export default Theme;
