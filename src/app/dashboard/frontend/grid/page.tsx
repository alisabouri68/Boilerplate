export default function GridPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          سیستم گرید ۱۲ ستونه
        </h2>
        <div className="grid grid-cols-12 gap-2 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه چیدمان‌ها
        </h2>
        <div className="space-y-4">
          {/* 12 */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              col-span-12
            </div>
          </div>

          {/* 6-6 */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              6
            </div>
            <div className="col-span-6 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              6
            </div>
          </div>

          {/* 4-4-4 */}
          <div className="grid grid-cols-12 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="col-span-4 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                4
              </div>
            ))}
          </div>

          {/* 3-3-3-3 */}
          <div className="grid grid-cols-12 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="col-span-3 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                3
              </div>
            ))}
          </div>

          {/* 8-4 */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              8
            </div>
            <div className="col-span-4 flex h-12 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              4
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          کانتینرها
        </h2>
        <div className="space-y-4">
          {[
            { name: "max-w-sm", cls: "max-w-sm", value: "384px" },
            { name: "max-w-md", cls: "max-w-md", value: "448px" },
            { name: "max-w-lg", cls: "max-w-lg", value: "512px" },
            { name: "max-w-xl", cls: "max-w-xl", value: "576px" },
            { name: "max-w-3xl", cls: "max-w-3xl", value: "768px" },
            { name: "max-w-5xl", cls: "max-w-5xl", value: "1024px" },
            { name: "max-w-7xl", cls: "max-w-7xl", value: "1280px" },
          ].map((c) => (
            <div key={c.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-gray-600 dark:text-gray-300">
                  {c.name}
                </span>
                <span className="text-gray-400">{c.value}</span>
              </div>
              <div
                className={`mx-auto h-8 rounded bg-gradient-to-l from-blue-500 to-indigo-500 ${c.cls}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}