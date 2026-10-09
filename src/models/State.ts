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

export interface IState {
  _id?: Types.ObjectId;

  /** Programming key — lowercase, unique ("brand", "success") */
  key: string;

  /** Human-readable name ("Brand", "Success") */
  name: string;

  /** Optional short description */
  description?: string;

  /** Order for UI display */
  order: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export type StateDocument = HydratedDocument<IState>;

/* =====================================================================
   Schema
   ===================================================================== */

const stateSchema = new Schema<IState>(
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
  },
);

/* =====================================================================
   Indexes
   ===================================================================== */

stateSchema.index({ key: 1 }, { unique: true });
stateSchema.index({ order: 1 });
stateSchema.index({ createdAt: -1 });

/* =====================================================================
   Statics
   ===================================================================== */

stateSchema.statics.findByKey = function (key: string) {
  return this.findOne({ key: key.toLowerCase().trim() });
};

/* =====================================================================
   Export
   ===================================================================== */

export const State: Model<IState> = getOrCreateModel<IState>(
  "State",
  stateSchema,
);

export default State;
