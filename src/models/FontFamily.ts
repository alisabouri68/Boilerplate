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

export type FontCategory =
  | "sans"
  | "serif"
  | "mono"
  | "display"
  | "handwriting";

export type FontSource = "google" | "custom" | "local";

export type FontFormat = "woff2" | "woff" | "ttf" | "otf" | "eot";

export interface IFontFile {
  /** فرمت فایل */
  format: FontFormat;
  /** آدرس فایل (upload شده یا URL خارجی) */
  url: string;
  /** وزن (100-900) */
  weight: number;
  /** استایل */
  style: "normal" | "italic";
  /** زیرمجموعه (latin, arabic, ...) */
  subset?: string;
  /** unicode-range اختیاری */
  unicodeRange?: string;
}

export interface IFontFamily {
  _id?: Types.ObjectId;

  /** شناسه‌ی برنامه‌نویسی — lowercase */
  key: string;

  /** نام نمایشی */
  name: string;

  /** دسته‌بندی */
  category: FontCategory;

  /** توضیح */
  description?: string;

  /** منبع فونت */
  source: FontSource;

  /** اگر google: نام دقیق در Google Fonts */
  googleFamily?: string;

  /** فایل‌های فونت (برای custom/local) */
  files: IFontFile[];

  /** وزن‌های موجود */
  weights: number[];

  /** استایل‌های موجود */
  styles: ("normal" | "italic")[];

  /** زیرمجموعه‌های زبانی */
  subsets: string[];

  /** متن پیش‌نمایش */
  previewText?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type FontFamilyDocument = HydratedDocument<IFontFamily>;

/* =====================================================================
   Sub-schemas
   ===================================================================== */

const fontFileSchema = new Schema<IFontFile>(
  {
    format: {
      type: String,
      enum: ["woff2", "woff", "ttf", "otf", "eot"],
      required: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 100,
      max: 900,
    },
    style: {
      type: String,
      enum: ["normal", "italic"],
      default: "normal",
    },
    subset: {
      type: String,
      trim: true,
    },
    unicodeRange: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

/* =====================================================================
   Main Schema
   ===================================================================== */

const fontFamilySchema = new Schema<IFontFamily>(
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

    category: {
      type: String,
      enum: ["sans", "serif", "mono", "display", "handwriting"],
      default: "sans",
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    source: {
      type: String,
      enum: ["google", "custom", "local"],
      required: true,
      default: "google",
      index: true,
    },

    googleFamily: {
      type: String,
      trim: true,
    },

    files: {
      type: [fontFileSchema],
      default: [],
    },

    weights: {
      type: [Number],
      default: [400],
    },

    styles: {
      type: [String],
      enum: ["normal", "italic"],
      default: ["normal"],
    },

    subsets: {
      type: [String],
      default: ["latin"],
    },

    previewText: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* =====================================================================
   Indexes
   ===================================================================== */

fontFamilySchema.index({ key: 1 }, { unique: true });
fontFamilySchema.index({ name: 1 });
fontFamilySchema.index({ category: 1, source: 1 });
fontFamilySchema.index({ createdAt: -1 });

/* =====================================================================
   Statics
   ===================================================================== */

fontFamilySchema.statics.findByKey = function (key: string) {
  return this.findOne({ key: key.toLowerCase().trim() });
};

/* =====================================================================
   Export
   ===================================================================== */

export const FontFamily: Model<IFontFamily> =
  getOrCreateModel<IFontFamily>("FontFamily", fontFamilySchema);

export default FontFamily;