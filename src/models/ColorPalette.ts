import type { SchemaDefinitionProperty } from "mongoose";
import { Schema, type HydratedDocument, type Model, type Types } from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

/* =====================================================================
   Types
   ===================================================================== */

/** 11 shades — از 50 (روشن‌ترین) تا 950 (تیره‌ترین) */
export interface IColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface IColorPalette {
  _id?: Types.ObjectId;

  /** Programming key — lowercase, unique ("red", "blue", "brand") */
  key: string;

  /** Human-readable name ("Red", "Brand Blue") */
  name: string;

  description?: string;

  /** رنگ‌های ۱۱ شید — همه HEX */
  shades: IColorShades;

  createdAt?: Date;
  updatedAt?: Date;
}

export type ColorPaletteDocument = HydratedDocument<IColorPalette>;

/* =====================================================================
   Helpers
   ===================================================================== */

/** Regex برای اعتبارسنجی HEX — accepts #rgb, #rrggbb, #rrggbbaa */
const HEX_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;


const hexField: SchemaDefinitionProperty<string> = {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  match: [HEX_REGEX, "Must be a valid HEX color (e.g. #ef4444)"],
};

/* =====================================================================
   Sub-schema — Shades
   ===================================================================== */

const shadesSchema = new Schema<IColorShades>(
  {
    50:  hexField,
    100: hexField,
    200: hexField,
    300: hexField,
    400: hexField,
    500: hexField,
    600: hexField,
    700: hexField,
    800: hexField,
    900: hexField,
    950: hexField,
  },
  { _id: false }
);

/* =====================================================================
   Main Schema
   ===================================================================== */

const colorPaletteSchema = new Schema<IColorPalette>(
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

    shades: {
      type: shadesSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* =====================================================================
   Indexes
   ===================================================================== */

colorPaletteSchema.index({ key: 1 }, { unique: true });
colorPaletteSchema.index({ name: 1 });
colorPaletteSchema.index({ createdAt: -1 });

/* =====================================================================
   Statics
   ===================================================================== */

colorPaletteSchema.statics.findByKey = function (key: string) {
  return this.findOne({ key: key.toLowerCase().trim() });
};

/* =====================================================================
   Export
   ===================================================================== */

export const ColorPalette: Model<IColorPalette> =
  getOrCreateModel<IColorPalette>("ColorPalette", colorPaletteSchema);

export default ColorPalette;