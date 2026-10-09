import { Schema, type HydratedDocument, type Model, type Types } from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

export interface IFontWeight {
  _id?: Types.ObjectId;
  key: string;
  name: string;
  value: number;              // 100-900
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type FontWeightDocument = HydratedDocument<IFontWeight>;

const fontWeightSchema = new Schema<IFontWeight>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [/^[a-z][a-z0-9-]*$/, "Invalid key"],
      maxlength: 60,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    value: {
      type: Number,
      required: true,
      min: 100,
      max: 900,
      validate: {
        validator: (v: number) => v % 100 === 0,
        message: "Weight must be a multiple of 100",
      },
    },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

fontWeightSchema.index({ order: 1, createdAt: 1 });

export const FontWeight: Model<IFontWeight> = getOrCreateModel<IFontWeight>(
  "FontWeight",
  fontWeightSchema
);

export default FontWeight;