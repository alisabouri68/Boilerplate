import { z } from "zod";
import {
  emailSchema,
  enumSchema,
  mobileSchema,
  objectIdSchema,
  optionalObjectId,
  optionalString,
  phoneSchema,
  trimmedString,
  urlSchema,
} from "./common";

/* ----------------------------- Enums ------------------------------- */

export const customerTypeEnum = ["individual", "company"] as const;
export const customerStatusEnum = [
  "lead",
  "prospect",
  "active",
  "inactive",
  "churned",
] as const;
export const leadSourceEnum = [
  "website",
  "referral",
  "social",
  "ads",
  "cold-call",
  "event",
  "other",
] as const;
export const currencyEnum = ["IRR", "USD", "EUR"] as const;
export const paymentTermsEnum = [
  "prepaid",
  "net-15",
  "net-30",
  "net-60",
] as const;
export const paymentMethodEnum = [
  "card",
  "transfer",
  "crypto",
  "cash",
] as const;
export const localeEnum = ["fa", "en"] as const;
export const communicationEnum = [
  "email",
  "phone",
  "telegram",
  "whatsapp",
  "slack",
] as const;
export const companySizeEnum = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
] as const;

/* --------------------------- Sub Schemas --------------------------- */

const companySchema = z.object({
  name: optionalString(200),
  legalName: optionalString(200),
  registrationNumber: optionalString(50),
  nationalId: optionalString(20),
  economicCode: optionalString(20),
  industry: optionalString(100),
  website: urlSchema.optional(),
  size: enumSchema(companySizeEnum).optional(),
});

const contactSchema = z.object({
  email: emailSchema.optional(),
  mobile: mobileSchema.optional(),
  phone: phoneSchema.optional(),
  fax: optionalString(20),
  website: urlSchema.optional(),
});

const addressSchema = z.object({
  country: optionalString(60),
  province: optionalString(60),
  city: optionalString(60),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  line1: optionalString(200),
  line2: optionalString(200),
});

const contactPersonSchema = z.object({
  firstName: optionalString(80),
  lastName: optionalString(80),
  role: optionalString(80),
  email: emailSchema.optional(),
  mobile: mobileSchema.optional(),
  isPrimary: z.boolean().default(false),
});

const billingSchema = z.object({
  billingEmail: emailSchema.optional(),
  taxId: optionalString(50),
  currency: enumSchema(currencyEnum).default("IRR"),
  paymentTerms: enumSchema(paymentTermsEnum).default("prepaid"),
  preferredMethod: enumSchema(paymentMethodEnum).optional(),
});

const preferencesSchema = z.object({
  locale: enumSchema(localeEnum).default("fa"),
  timezone: optionalString(60),
  communicationChannel: enumSchema(communicationEnum).default("email"),
});

/* --------------------------- Main Schema --------------------------- */

export const createCustomerSchema = z
  .object({
    type: enumSchema(customerTypeEnum).default("company"),
    status: enumSchema(customerStatusEnum).default("lead"),

    firstName: optionalString(80),
    lastName: optionalString(80),
    displayName: optionalString(200),

    company: companySchema.optional(),
    contact: contactSchema.prefault({}),

    address: addressSchema.optional(),
    contacts: z.array(contactPersonSchema).default([]),
    billing: billingSchema.prefault({}),
    preferences: preferencesSchema.prefault({}),

    leadSource: enumSchema(leadSourceEnum).optional(),
    tags: z.array(trimmedString(1, 40)).max(20).default([]),
    owner: optionalObjectId,
    description: optionalString(3000),
  })
  /* ------------------- refinements / business rules --------------- */
  .superRefine((data, ctx) => {
    // اگر company است، نام شرکت اجباری است
    if (data.type === "company" && !data.company?.name) {
      ctx.addIssue({
        code: "custom",
        path: ["company", "name"],
        message: "برای مشتری حقوقی، نام شرکت الزامی است",
      });
    }

    // اگر individual است، حداقل یکی از نام/فامیل
    if (
      data.type === "individual" &&
      !data.firstName &&
      !data.lastName &&
      !data.displayName
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["firstName"],
        message: "حداقل نام یا نام خانوادگی لازم است",
      });
    }

    // حداقل یک راه تماس
    if (!data.contact?.email && !data.contact?.mobile && !data.contact?.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["contact", "email"],
        message: "حداقل یک راه ارتباطی (ایمیل، موبایل یا تلفن) لازم است",
      });
    }

    // فقط یک isPrimary در contacts
    const primaries = data.contacts.filter((c) => c.isPrimary);
    if (primaries.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["contacts"],
        message: "فقط یک شخص تماس می‌تواند اصلی باشد",
      });
    }
  });

/* ---------------------- Update = Partial --------------------------- */

export const updateCustomerSchema = z
  .object({
    type: enumSchema(customerTypeEnum).optional(),
    status: enumSchema(customerStatusEnum).optional(),
    firstName: optionalString(80),
    lastName: optionalString(80),
    displayName: optionalString(200),
    company: companySchema.partial().optional(),
    contact: contactSchema.partial().optional(),
    address: addressSchema.partial().optional(),
    contacts: z.array(contactPersonSchema).optional(),
    billing: billingSchema.partial().optional(),
    preferences: preferencesSchema.partial().optional(),
    leadSource: enumSchema(leadSourceEnum).optional(),
    tags: z.array(trimmedString(1, 40)).max(20).optional(),
    owner: optionalObjectId,
    description: optionalString(3000),
  })
  .strict(); // ← فیلد ناشناخته را رد کن

/* ----------------------------- Filters ----------------------------- */

export const customerFilterSchema = z.object({
  type: enumSchema(customerTypeEnum).optional(),
  status: enumSchema(customerStatusEnum).optional(),
  tag: z.string().trim().optional(),
  owner: objectIdSchema.optional(),
  q: z.string().trim().max(100).optional(),
});

/* ------------------------------ Types ------------------------------ */

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type CustomerFilterInput = z.infer<typeof customerFilterSchema>;
