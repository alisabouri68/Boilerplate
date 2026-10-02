const logLevels = [
  { level: "debug", color: "bg-gray-500", use: "توسعه" },
  { level: "info", color: "bg-blue-500", use: "رویدادهای عادی" },
  { level: "warn", color: "bg-amber-500", use: "هشدارها" },
  { level: "error", color: "bg-red-500", use: "خطاها" },
  { level: "fatal", color: "bg-red-700", use: "خطاهای بحرانی" },
];

const codeExample = `// src/lib/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

// استفاده
logger.info({ userId: "123" }, "کاربر وارد شد");
logger.error({ err }, "خطا در پردازش پرداخت");
logger.warn("محدودیت درخواست نزدیک است");

// در API Route
export async function POST(req: NextRequest) {
  logger.info({ path: req.url }, "درخواست POST");
  try {
    // ...
  } catch (error) {
    logger.error({ error }, "خطا در پردازش");
    throw error;
  }
}`;

export default function LoggingPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          سطوح لاگ
        </h2>
        <div className="space-y-2">
          {logLevels.map((l) => (
            <div
              key={l.level}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
            >
              <span
                className={`w-16 rounded-md ${l.color} px-2 py-0.5 text-center font-mono text-[10px] font-bold text-white`}
              >
                {l.level}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {l.use}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه پیاده‌سازی
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        💡 <strong>بهترین شیوه:</strong> از ساختار JSON برای لاگ‌ها
        استفاده کن تا در سرویس‌هایی مثل Datadog، Sentry یا Grafana قابل
        جستجو باشند.
      </section>
    </div>
  );
}