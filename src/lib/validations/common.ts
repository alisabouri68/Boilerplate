import { z } from "zod";

/* ----------------------------- ObjectId ---------------------------- */

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "شناسه معتبر نیست");

/** ObjectId اختیاری که رشته‌ی خالی را هم undefined حساب می‌کند */
export const optionalObjectId = z
  .union([objectIdSchema, z.literal(""), z.undefined()])
  .transform(v => (v === "" ? undefined : v))
  .optional();

/* ------------------------------- String ---------------------------- */

export const trimmedString = (min = 0, max = 255) =>
  z
    .string()
    .trim()
    .min(min, `حداقل ${min} کاراکتر لازم است`)
    .max(max, `حداکثر ${max} کاراکتر مجاز است`);

export const optionalString = (max = 255) =>
  z
    .string()
    .trim()
    .max(max, `حداکثر ${max} کاراکتر مجاز است`)
    .optional()
    .or(z.literal("").transform(() => undefined));

/* -------------------------------- Email ---------------------------- */

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("ایمیل نامعتبر است")
  .max(255);

/* ------------------------------- Mobile ---------------------------- */

/** موبایل ایران: 09xxxxxxxxx */
export const mobileSchema = z
  .string()
  .trim()
  .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با 09 شروع شود");

/* -------------------------------- Phone ---------------------------- */

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^0\d{2,3}\d{7,8}$/, "شماره تلفن نامعتبر است");

/* ------------------------------ URL -------------------------------- */

export const urlSchema = z
  .string()
  .trim()
  .url("آدرس معتبر نیست")
  .max(500);

/* ------------------------------ Enum ------------------------------- */

export const enumSchema = <T extends readonly [string, ...string[]]>(
  values: T,
  message = "مقدار نامعتبر است"
) => z.enum(values, { error: () => message });

/* ----------------------------- Pagination -------------------------- */

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().trim().optional(),
  q: z.string().trim().max(100).optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
