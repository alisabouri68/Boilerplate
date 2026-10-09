import mongoose, { type Model, type Schema } from "mongoose";

/**
 * مدل را اگر قبلاً رجیستر شده برگردان، وگرنه بساز.
 * این الگو از خطای "Cannot overwrite model once compiled" جلوگیری می‌کند.
 */
export function getOrCreateModel<T>(
  name: string,
  schema: Schema<T>
): Model<T> {
  const existing = mongoose.models[name] as Model<T> | undefined;
  return existing ?? mongoose.model<T>(name, schema);
}