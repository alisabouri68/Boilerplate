const errorTypes = [
  {
    code: 400,
    name: "Bad Request",
    desc: "ورودی نامعتبر",
    cls: "bg-amber-500",
  },
  { code: 401, name: "Unauthorized", desc: "احراز هویت نشده", cls: "bg-orange-500" },
  { code: 403, name: "Forbidden", desc: "دسترسی غیرمجاز", cls: "bg-red-500" },
  { code: 404, name: "Not Found", desc: "منبع پیدا نشد", cls: "bg-gray-500" },
  { code: 422, name: "Unprocessable", desc: "اعتبارسنجی رد شد", cls: "bg-pink-500" },
  { code: 429, name: "Too Many Requests", desc: "Rate Limit", cls: "bg-purple-500" },
  { code: 500, name: "Internal Error", desc: "خطای سرور", cls: "bg-red-700" },
];

const codeExample = `// src/lib/errors.ts
import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = 500,
    public code?: string
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Validation failed", details: error.flatten() },
      { status: 422 }
    );
  }

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}`;

export default function ErrorsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          کدهای وضعیت HTTP
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {errorTypes.map((e) => (
            <div
              key={e.code}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span
                className={`flex h-11 w-14 shrink-0 items-center justify-center rounded-lg ${e.cls} font-mono text-sm font-bold text-white`}
              >
                {e.code}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {e.name}
                </div>
                <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {e.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          مدیریت متمرکز خطا
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Error Boundary در Next.js
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          فایل <span className="font-mono">error.tsx</span> در هر پوشه، به
          عنوان Error Boundary عمل می‌کند:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
{`// src/app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h2 className="text-xl font-bold">خطایی رخ داد</h2>
      <p className="text-sm text-gray-500">{error.message}</p>
      <button onClick={reset}>تلاش مجدد</button>
    </div>
  );
}`}
          </code>
        </pre>
      </section>
    </div>
  );
}