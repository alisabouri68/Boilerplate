const shadows = [
  { name: "shadow-sm", cls: "shadow-sm" },
  { name: "shadow", cls: "shadow" },
  { name: "shadow-md", cls: "shadow-md" },
  { name: "shadow-lg", cls: "shadow-lg" },
  { name: "shadow-xl", cls: "shadow-xl" },
  { name: "shadow-2xl", cls: "shadow-2xl" },
  { name: "shadow-inner", cls: "shadow-inner" },
  { name: "shadow-none", cls: "shadow-none border border-gray-300" },
];

const coloredShadows = [
  { name: "Blue", cls: "shadow-lg shadow-blue-500/50 bg-blue-500" },
  { name: "Emerald", cls: "shadow-lg shadow-emerald-500/50 bg-emerald-500" },
  { name: "Red", cls: "shadow-lg shadow-red-500/50 bg-red-500" },
  { name: "Purple", cls: "shadow-lg shadow-purple-500/50 bg-purple-500" },
];

export default function ShadowsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          سایه‌های استاندارد
        </h2>
        <div className="grid grid-cols-1 gap-6 rounded-xl bg-gray-50 p-6 sm:grid-cols-2 lg:grid-cols-4 dark:bg-gray-900/50">
          {shadows.map((s) => (
            <div key={s.name} className="text-center">
              <div
                className={`mx-auto h-24 w-full max-w-[180px] rounded-xl bg-white dark:bg-gray-800 ${s.cls}`}
              />
              <div className="mt-3 text-xs font-mono text-gray-500 dark:text-gray-400">
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          سایه‌های رنگی
        </h2>
        <div className="grid grid-cols-2 gap-6 rounded-xl bg-gray-50 p-6 lg:grid-cols-4 dark:bg-gray-900/50">
          {coloredShadows.map((s) => (
            <div key={s.name} className="text-center">
              <div
                className={`mx-auto h-20 w-full max-w-[140px] rounded-xl ${s.cls}`}
              />
              <div className="mt-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          کاربردها
        </h2>
        <div className="space-y-3 text-sm">
          {[
            { label: "کارت‌های معمولی", value: "shadow-sm یا shadow" },
            { label: "کارت‌های hover", value: "shadow-lg" },
            { label: "Dropdown / Popover", value: "shadow-lg" },
            { label: "مودال", value: "shadow-2xl" },
            { label: "دکمه‌های CTA", value: "shadow-md shadow-blue-500/30" },
          ].map((u) => (
            <div
              key={u.label}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {u.label}
              </span>
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
                {u.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}