const breakpoints = [
  { name: "sm", value: "640px", desc: "موبایل بزرگ / تبلت کوچک" },
  { name: "md", value: "768px", desc: "تبلت" },
  { name: "lg", value: "1024px", desc: "لپ‌تاپ" },
  { name: "xl", value: "1280px", desc: "دسکتاپ" },
  { name: "2xl", value: "1536px", desc: "مانیتور بزرگ" },
];

export default function BreakpointsPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          مرورگر را ریسایز کن تا رفتار هر بریک‌پوینت را ببینی.
        </p>
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {["نام", "حداقل عرض", "توضیح", "وضعیت"].map((h) => (
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
              {breakpoints.map((b) => (
                <tr
                  key={b.name}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {b.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                    ≥ {b.value}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {b.desc}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`inline-flex h-2 w-2 rounded-full ${
                        b.name === "sm"
                          ? "bg-emerald-500"
                          : b.name === "md"
                          ? "bg-emerald-500"
                          : b.name === "lg"
                          ? "bg-amber-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه واکنش‌گرا
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-center text-white shadow-lg"
            >
              <div className="text-2xl font-black">{i}</div>
              <div className="mt-1 text-xs opacity-80">
                {i === 1 && "grid-cols-1"}
                {i === 2 && "sm:grid-cols-2"}
                {i === 3 && "lg:grid-cols-3"}
                {i === 4 && "xl:grid-cols-4"}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          مرورگر را باریک/پهن کن تا تعداد ستون‌ها تغییر کند.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          الگوهای نمایش/مخفی
        </h2>
        <div className="space-y-3">
          {[
            { label: "فقط موبایل", cls: "block md:hidden", color: "bg-rose-500" },
            { label: "فقط تبلت", cls: "hidden md:block lg:hidden", color: "bg-amber-500" },
            { label: "فقط دسکتاپ", cls: "hidden lg:block", color: "bg-emerald-500" },
          ].map((p) => (
            <div key={p.label} className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                {p.label}
              </div>
              <div className={`rounded-lg ${p.color} h-10`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}