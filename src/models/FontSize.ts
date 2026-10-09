import { Schema, type HydratedDocument, type Model, type Types } from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

export interface IFontSize {
  _id?: Types.ObjectId;
  key: string;
  name: string;
  value: string;              // "0.75rem" یا "12px"
  lineHeight?: string;        // "1rem"
  letterSpacing?: string;     // "-0.01em"
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type FontSizeDocument = HydratedDocument<IFontSize>;

const fontSizeSchema = new Schema<IFontSize>(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [/^[a-z0-9][a-z0-9-]*$/, "Invalid key"],
      maxlength: 60,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    value: { type: String, required: true, trim: true, maxlength: 30 },
    lineHeight: { type: String, trim: true, maxlength: 30 },
    letterSpacing: { type: String, trim: true, maxlength: 30 },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

fontSizeSchema.index({ order: 1, createdAt: 1 });

export const FontSize: Model<IFontSize> = getOrCreateModel<IFontSize>(
  "FontSize",
  fontSizeSchema
);

export default FontSize;