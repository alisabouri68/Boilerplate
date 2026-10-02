const envVars = [
  { key: "DATABASE_URL", desc: "اتصال دیتابیس", example: "postgresql://...", req: true },
  { key: "NEXTAUTH_SECRET", desc: "کلید رمزنگاری", example: "openssl rand -base64 32", req: true },
  { key: "NEXTAUTH_URL", desc: "آدرس اپ", example: "http://localhost:3000", req: true },
  { key: "NODE_ENV", desc: "محیط اجرا", example: "development | production", req: false },
  { key: "RESEND_API_KEY", desc: "ارسال ایمیل", example: "re_xxxxx", req: false },
  { key: "UPSTASH_REDIS_URL", desc: "کش و Rate Limit", example: "https://xxx.upstash.io", req: false },
];

const configs = [
  {
    file: "next.config.js",
    desc: "تنظیمات Next.js مثل redirects، rewrites، headers و images",
    code: `const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com"],
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
      ],
    }];
  },
};

module.exports = nextConfig;`,
  },
  {
    file: "tsconfig.json",
    desc: "تنظیمات TypeScript و مسیرهای alias (مثل @/*)",
    code: `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true
  }
}`,
  },
  {
    file: "postcss.config.mjs",
    desc: "تنظیمات PostCSS برای Tailwind v4",
    code: `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;`,
  },
];

export default function ConfigurationPage() {
  return (
    <div className="space-y-6">
      {/* متغیرهای محیطی */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          متغیرهای محیطی (.env)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {["کلید", "توضیح", "نمونه", "الزام"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {envVars.map((v) => (
                <tr key={v.key}>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {v.key}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {v.desc}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                    {v.example}
                  </td>
                  <td className="px-4 py-3">
                    {v.req ? (
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

      {/* فایل‌های پیکربندی */}
      {configs.map((c) => (
        <section
          key={c.file}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="font-mono text-base font-bold text-gray-900 dark:text-white">
            {c.file}
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {c.desc}
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
            <code dir="ltr" className="block text-left">
              {c.code}
            </code>
          </pre>
        </section>
      ))}

      {/* نکات */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
        ⚠️ <strong>مهم:</strong> فایل{" "}
        <span className="font-mono">.env</span> رو هرگز در گیت commit نکن. فقط{" "}
        <span className="font-mono">.env.example</span> رو به اشتراک بگذار.
      </section>
    </div>
  );
}