const spacingScale = [
  { name: "0", value: "0px", class: "w-0" },
  { name: "0.5", value: "2px", class: "w-0.5" },
  { name: "1", value: "4px", class: "w-1" },
  { name: "2", value: "8px", class: "w-2" },
  { name: "3", value: "12px", class: "w-3" },
  { name: "4", value: "16px", class: "w-4" },
  { name: "5", value: "20px", class: "w-5" },
  { name: "6", value: "24px", class: "w-6" },
  { name: "8", value: "32px", class: "w-8" },
  { name: "10", value: "40px", class: "w-10" },
  { name: "12", value: "48px", class: "w-12" },
  { name: "16", value: "64px", class: "w-16" },
  { name: "20", value: "80px", class: "w-20" },
  { name: "24", value: "96px", class: "w-24" },
  { name: "32", value: "128px", class: "w-32" },
];

const useCases = [
  { title: "Gap بین کارت‌ها", value: "gap-4 (16px)" },
  { title: "Padding کارت", value: "p-6 (24px)" },
  { title: "Padding دکمه", value: "px-4 py-2" },
  { title: "فاصله بین بخش‌ها", value: "space-y-8 (32px)" },
];

export default function SpacingPage() {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            مقیاس فاصله (۴ پیکسلی)
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            بر پایه 4px
          </span>
        </div>
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          {spacingScale.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-12 shrink-0 text-xs font-mono text-gray-400">
                {s.name}
              </span>
              <span className="w-16 shrink-0 text-xs text-gray-500 dark:text-gray-400">
                {s.value}
              </span>
              <div className={`h-4 ${s.class} rounded bg-gradient-to-l from-blue-500 to-indigo-500`} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          کاربردهای رایج
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {useCases.map((u) => (
            <div
              key={u.title}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {u.title}
              </div>
              <div className="mt-1 text-xs font-mono text-blue-600 dark:text-blue-400">
                {u.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه Padding و Margin
        </h2>
        <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="rounded-lg border border-dashed border-blue-400 bg-white p-6 dark:border-blue-600 dark:bg-gray-800">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              این کادر p-6 (24px) دارد
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}