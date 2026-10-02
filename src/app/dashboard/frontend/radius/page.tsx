const radii = [
  { name: "rounded-none", value: "0px", cls: "rounded-none" },
  { name: "rounded-sm", value: "2px", cls: "rounded-sm" },
  { name: "rounded", value: "4px", cls: "rounded" },
  { name: "rounded-md", value: "6px", cls: "rounded-md" },
  { name: "rounded-lg", value: "8px", cls: "rounded-lg" },
  { name: "rounded-xl", value: "12px", cls: "rounded-xl" },
  { name: "rounded-2xl", value: "16px", cls: "rounded-2xl" },
  { name: "rounded-3xl", value: "24px", cls: "rounded-3xl" },
  { name: "rounded-full", value: "9999px", cls: "rounded-full" },
];

export default function RadiusPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          مقیاس گردی گوشه
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {radii.map((r) => (
            <div key={r.name} className="space-y-2">
              <div
                className={`flex h-24 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 ${r.cls} text-xs font-semibold text-white shadow-lg`}
              >
                {r.value}
              </div>
              <div className="text-center text-xs font-mono text-gray-500 dark:text-gray-400">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          کاربردهای پیشنهادی
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            { label: "دکمه‌ها", value: "rounded-lg" },
            { label: "کارت‌ها", value: "rounded-xl" },
            { label: "مودال‌ها", value: "rounded-2xl" },
            { label: "آواتارها", value: "rounded-full" },
            { label: "فیلدهای ورودی", value: "rounded-lg" },
            { label: "بج‌ها", value: "rounded-full" },
          ].map((u) => (
            <div
              key={u.label}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {u.label}
              </span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                {u.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}