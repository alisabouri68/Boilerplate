export default function InstallationPage() {
  const requirements = [
    { name: "Node.js", version: "≥ 20.x", required: true },
    { name: "npm", version: "≥ 10.x", required: true },
    { name: "Git", version: "آخرین نسخه", required: true },
    { name: "PostgreSQL", version: "≥ 14 (اختیاری)", required: false },
  ];

  const commands = [
    { label: "npm", code: "npm install" },
    { label: "pnpm", code: "pnpm install" },
    { label: "yarn", code: "yarn install" },
    { label: "bun", code: "bun install" },
  ];

  return (
    <div className="space-y-6">
      {/* پیش‌نیازها */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          پیش‌نیازها
        </h2>
        <div className="space-y-2">
          {requirements.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {r.name}
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                  {r.version}
                </span>
              </div>
              {r.required ? (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  الزامی
                </span>
              ) : (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  اختیاری
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* نصب با پکیج منیجرهای مختلف */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          نصب وابستگی‌ها
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {commands.map((c) => (
            <div key={c.label} className="space-y-1">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {c.label}
              </div>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs text-emerald-400">
                <code dir="ltr" className="block text-left">
                  {c.code}
                </code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ساختار پکیج */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          پکیج‌های اصلی
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">پکیج</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">نقش</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">نسخه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[
                { name: "next", role: "فریمورک اصلی", ver: "15.x" },
                { name: "react", role: "کتابخانه UI", ver: "19.x" },
                { name: "flowbite-react", role: "کامپوننت‌ها", ver: "0.10+" },
                { name: "tailwindcss", role: "استایل", ver: "4.x" },
                { name: "@prisma/client", role: "ORM", ver: "6.x" },
                { name: "zod", role: "اعتبارسنجی", ver: "3.x" },
                { name: "bcryptjs", role: "هش رمز", ver: "2.x" },
                { name: "react-icons", role: "آیکون‌ها", ver: "5.x" },
              ].map((p) => (
                <tr key={p.name}>
                  <td className="px-4 py-3 font-mono text-gray-900 dark:text-white">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {p.role}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                    {p.ver}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* عیب‌یابی */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-900/20">
        <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">
          ⚠️ عیب‌یابی نصب
        </h3>
        <div className="mt-3 space-y-2 text-xs text-amber-700 dark:text-amber-400">
          <p>
            <strong>خطای cache خراب npm:</strong>{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono dark:bg-amber-900/40">
              npm cache clean --force
            </code>
          </p>
          <p>
            <strong>خطای پرمیشن:</strong> از sudo استفاده نکن؛ به‌جاش nvm نصب کن.
          </p>
          <p>
            <strong>خطای peer dependency:</strong>{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono dark:bg-amber-900/40">
              npm install --legacy-peer-deps
            </code>
          </p>
        </div>
      </section>
    </div>
  );
}