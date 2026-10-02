const rules = [
  { endpoint: "/api/auth/login", limit: "۵ بار در ۱۵ دقیقه", scope: "IP" },
  { endpoint: "/api/auth/register", limit: "۳ بار در ساعت", scope: "IP" },
  { endpoint: "/api/* (عمومی)", limit: "۱۰۰ بار در دقیقه", scope: "IP" },
  { endpoint: "/api/* (احراز شده)", limit: "۱۰۰۰ بار در دقیقه", scope: "User" },
  { endpoint: "/api/upload", limit: "۱۰ بار در ساعت", scope: "User" },
];

const codeExample = `// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
});

// استفاده در API Route
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success, limit, remaining } =
    await rateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
        },
      }
    );
  }

  // ادامه پردازش
}`;

export default function RateLimitPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          قوانین Rate Limiting
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {["Endpoint", "محدودیت", "مبنا"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-right text-xs font-bold text-gray-600 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {rules.map((r) => (
                <tr
                  key={r.endpoint}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300">
                    {r.endpoint}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {r.limit}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                      {r.scope}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          پیاده‌سازی با Upstash
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
        🛡️ <strong>امنیت:</strong> حتماً روی endpointهای احراز هویت
        (login، register، reset-password) محدودیت سخت‌گیرانه بذار تا از
        Brute Force جلوگیری بشه.
      </section>
    </div>
  );
}