import {
  Schema,
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";
import { getOrCreateModel } from "@/lib/db/model";

/* ----------------------------- Types ----------------------------- */

export type CustomerType = "individual" | "company";
export type CustomerStatus =
  | "lead"
  | "prospect"
  | "active"
  | "inactive"
  | "churned";

export interface ICustomer {
  _id?: Types.ObjectId;
  type: CustomerType;
  status: CustomerStatus;

  firstName?: string;
  lastName?: string;
  displayName?: string;

  company?: {
    name?: string;
    legalName?: string;
    registrationNumber?: string;
    nationalId?: string;
    economicCode?: string;
    industry?: string;
    website?: string;
    size?: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
  };

  contact: {
    email?: string;
    mobile?: string;
    phone?: string;
    fax?: string;
    website?: string;
  };

  address?: {
    country?: string;
    province?: string;
    city?: string;
    postalCode?: string;
    line1?: string;
    line2?: string;
  };

  contacts?: Array<{
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
    mobile?: string;
    isPrimary?: boolean;
  }>;

  billing?: {
    billingEmail?: string;
    taxId?: string;
    currency?: "IRR" | "USD" | "EUR";
    paymentTerms?: "prepaid" | "net-15" | "net-30" | "net-60";
    preferredMethod?: "card" | "transfer" | "crypto" | "cash";
  };

  preferences?: {
    locale?: "fa" | "en";
    timezone?: string;
    communicationChannel?:
      | "email"
      | "phone"
      | "telegram"
      | "whatsapp"
      | "slack";
  };

  leadSource?:
    | "website"
    | "referral"
    | "social"
    | "ads"
    | "cold-call"
    | "event"
    | "other";
  tags?: string[];
  owner?: Types.ObjectId;
  description?: string;

  projectCount?: number;
  totalRevenue?: number;
  lastContactAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export type CustomerDocument = HydratedDocument<ICustomer>;

/* -------------------------- Sub Schemas -------------------------- */

const companySchema = new Schema(
  {
    name: { type: String, trim: true, maxlength: 200 },
    legalName: { type: String, trim: true, maxlength: 200 },
    registrationNumber: { type: String, trim: true },
    nationalId: { type: String, trim: true },
    economicCode: { type: String, trim: true },
    industry: { type: String, trim: true },
    website: { type: String, trim: true },
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
  },
  { _id: false },
);

const contactSchema = new Schema(
  {
    email: { type: String, trim: true, lowercase: true },
    mobile: { type: String, trim: true },
    phone: { type: String, trim: true },
    fax: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    country: { type: String, trim: true, default: "IR" },
    province: { type: String, trim: true },
    city: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
  },
  { _id: false },
);

const contactPersonSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    role: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    mobile: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false },
);

const billingSchema = new Schema(
  {
    billingEmail: { type: String, trim: true, lowercase: true },
    taxId: { type: String, trim: true },
    currency: { type: String, enum: ["IRR", "USD", "EUR"], default: "IRR" },
    paymentTerms: {
      type: String,
      enum: ["prepaid", "net-15", "net-30", "net-60"],
      default: "prepaid",
    },
    preferredMethod: {
      type: String,
      enum: ["card", "transfer", "crypto", "cash"],
    },
  },
  { _id: false },
);

const preferencesSchema = new Schema(
  {
    locale: { type: String, enum: ["fa", "en"], default: "fa" },
    timezone: { type: String, default: "Asia/Tehran" },
    communicationChannel: {
      type: String,
      enum: ["email", "phone", "telegram", "whatsapp", "slack"],
      default: "email",
    },
  },
  { _id: false },
);

/* --------------------------- Main Schema -------------------------- */

const customerSchema = new Schema<ICustomer>(
  {
    type: {
      type: String,
      enum: ["individual", "company"],
      default: "company",
      index: true,
    },
    status: {
      type: String,
      enum: ["lead", "prospect", "active", "inactive", "churned"],
      default: "lead",
      index: true,
    },

    firstName: { type: String, trim: true, maxlength: 80 },
    lastName: { type: String, trim: true, maxlength: 80 },
    displayName: { type: String, trim: true, maxlength: 200 },

    company: { type: companySchema },
    contact: { type: contactSchema, default: () => ({}) },
    address: { type: addressSchema },
    contacts: { type: [contactPersonSchema], default: [] },
    billing: { type: billingSchema, default: () => ({}) },
    preferences: { type: preferencesSchema, default: () => ({}) },

    leadSource: {
      type: String,
      enum: [
        "website",
        "referral",
        "social",
        "ads",
        "cold-call",
        "event",
        "other",
      ],
    },
    tags: { type: [String], default: [], index: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", index: true },
    description: { type: String, trim: true, maxlength: 3000 },

    projectCount: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    lastContactAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* ---------------------------- Indexes ---------------------------- */

customerSchema.index({ "contact.email": 1 }, { sparse: true, unique: true });
customerSchema.index({ "contact.mobile": 1 }, { sparse: true });
customerSchema.index({
  displayName: "text",
  description: "text",
  "company.name": "text",
});

/* --------------------------- Virtuals ---------------------------- */

customerSchema.virtual("fullName").get(function (this: CustomerDocument) {
  if (this.type === "company")
    return this.company?.name ?? this.displayName ?? "";
  return [this.firstName, this.lastName].filter(Boolean).join(" ");
});

customerSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "customer",
});

/* ------------------------ Pre Validation ------------------------- */

customerSchema.pre("validate", function () {
  if (!this.displayName) {
    if (this.type === "company" && this.company?.name) {
      this.displayName = this.company.name;
    } else {
      this.displayName = [this.firstName, this.lastName]
        .filter(Boolean)
        .join(" ");
    }
  }
});

/* ---------------------------- Export ------------------------------ */

export const Customer: Model<ICustomer> = getOrCreateModel<ICustomer>(
  "Customer",
  customerSchema,
);

export default Customer;
