import mongoose, { type Mongoose } from "mongoose";

/**
 * در Next.js dev mode، ماژول‌ها با هر hot-reload دوباره اجرا می‌شوند.
 * برای جلوگیری از ساخت چند اتصال، کش را روی globalThis نگه می‌داریم.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI در متغیرهای محیطی تعریف نشده است");
}

// اگر قبلاً کش شده، از همان استفاده کن
const cached = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB(): Promise<Mongoose> {
  // 1) اگر اتصال فعال داریم، همان را برگردان
  if (cached.conn) return cached.conn;

  // 2) اگر در حال اتصال هستیم، منتظر همان promise بمان
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      // برای production این‌ها را تنظیم کن:
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      // autoIndex در production باید false باشد (پرفورمنس)
      autoIndex: process.env.NODE_ENV !== "production",
      // برای دیباگ:
      // debug: process.env.NODE_ENV === "development",
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // اگر اتصال شکست خورد، promise را پاک کن تا تلاش بعدی دوباره انجام شود
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}