import { Schema, type HydratedDocument, type Model, type Types } from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

/* =====================================================================
   Types
   ===================================================================== */

export type TokenScope = "state" | "theme";
export type TokenType = "color" | "size" | "radius" | "font" | "shadow" | "other";

export interface IToken {
  _id?: Types.ObjectId;

  /** Programming key — lowercase, unique ("bg", "text", "color-accent") */
  key: string;

  /** Human-readable name ("Background", "Accent Color") */
  name: string;

  description?: string;

  /**
   * Scope determines how the token is used:
   *  - "state": multiplied by each State → keys like "bg-brand", "text-danger"
   *  - "theme": a single key per theme → "color-accent", "color-odd"
   */
  scope: TokenScope;

  /** Value type hint (for UI editor) */
  type: TokenType;

  /** Order for UI display */
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export type TokenDocument = HydratedDocument<IToken>;

/* =====================================================================
   Schema
   ===================================================================== */

const tokenSchema = new Schema<IToken>(
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

    scope: {
      type: String,
      enum: ["state", "theme"],
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["color", "size", "radius", "font", "shadow", "other"],
      default: "color",
      index: true,
    },

    order: {
      type: Number,
      default: 0,
      index: true,
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

tokenSchema.index({ key: 1 }, { unique: true });
tokenSchema.index({ scope: 1, order: 1 });
tokenSchema.index({ createdAt: -1 });

/* =====================================================================
   Statics
   ===================================================================== */

tokenSchema.statics.findByKey = function (key: string) {
  return this.findOne({ key: key.toLowerCase().trim() });
};

tokenSchema.statics.findByScope = function (scope: TokenScope) {
  return this.find({ scope }).sort({ order: 1, createdAt: 1 });
};

/* =====================================================================
   Export
   ===================================================================== */

export const Token: Model<IToken> = getOrCreateModel<IToken>(
  "Token",
  tokenSchema
);

export default Token;