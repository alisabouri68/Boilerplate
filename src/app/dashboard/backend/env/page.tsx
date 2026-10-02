const envVars = [
  {
    key: "DATABASE_URL",
    desc: "اتصال به PostgreSQL",
    example: "postgresql://user:pass@localhost:5432/db",
    required: true,
  },
  {
    key: "NEXTAUTH_SECRET",
    desc: "کلید رمزنگاری Session",
    example: "openssl rand -base64 32",
    required: true,
  },
  {
    key: "NEXTAUTH_URL",
    desc: "آدرس کامل اپلیکیشن",
    example: "https://example.com",
    required: true,
  },
  {
    key: "GOOGLE_CLIENT_ID",
    desc: "شناسه OAuth گوگل",
    example: "xxx.apps.googleusercontent.com",
    required: false,
  },
  {
    key: "RESEND_API_KEY",
    desc: "کلید سرویس ایمیل",
    example: "re_xxxxxxxxxxxx",
    required: false,
  },
  {
    key: "UPSTASH_REDIS_URL",
    desc: "آدرس Redis برای Rate Limit",
    example: "https://xxx.upstash.io",
    required: false,
  },
];

export default function EnvPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
        ⚠️ فایل <span className="font-mono">.env</span> رو هرگز commit
        نکن. فقط <span className="font-mono">.env.example</span> رو در
        ریپازیتوری نگه دار.
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          متغیرهای محیطی
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {["کلید", "توضیح", "نمونه", "وضعیت"].map((h) => (
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
              {envVars.map((v) => (
                <tr
                  key={v.key}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {v.key}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
                    {v.desc}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                    {v.example}
                  </td>
                  <td className="px-4 py-3">
                    {v.required ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        الزامی
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        اختیاری
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          اعتبارسنجی ENV با Zod
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
{`// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  RESEND_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);`}
          </code>
        </pre>
      </section>
    </div>
  );
}