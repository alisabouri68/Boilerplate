const layers = [
  { name: "z-0", value: 0, desc: "پایه - محتوای معمولی" },
  { name: "z-10", value: 10, desc: "کارت‌های بالاتر از پس‌زمینه" },
  { name: "z-20", value: 20, desc: "Dropdown سفارشی" },
  { name: "z-30", value: 30, desc: "Topbar چسبان" },
  { name: "z-40", value: 40, desc: "سایدبار موبایل" },
  { name: "z-50", value: 50, desc: "Modal، Toast، Overlay" },
];

export default function ZIndexPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          مقیاس Z-index
        </h2>
        <div className="space-y-2">
          {layers.map((l) => (
            <div
              key={l.name}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="w-16 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 px-2 py-1 text-center font-mono text-xs font-bold text-white">
                {l.name}
              </span>
              <span className="w-12 shrink-0 font-mono text-sm text-gray-500 dark:text-gray-400">
                {l.value}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {l.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمایش لایه‌ها
        </h2>
        <div className="relative h-80 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          {[
            { label: "z-10", top: "20px", right: "20px", bg: "bg-blue-500" },
            { label: "z-20", top: "60px", right: "60px", bg: "bg-emerald-500" },
            { label: "z-30", top: "100px", right: "100px", bg: "bg-amber-500" },
            { label: "z-40", top: "140px", right: "140px", bg: "bg-rose-500" },
            { label: "z-50", top: "180px", right: "180px", bg: "bg-purple-500" },
          ].map((l, i) => (
            <div
              key={l.label}
              className={`absolute flex h-20 w-40 items-center justify-center rounded-xl ${l.bg} text-sm font-bold text-white shadow-xl`}
              style={{ top: l.top, right: l.right, zIndex: i + 1 }}
            >
              {l.label}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          کاربردهای توصیه‌شده
        </h2>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
          ⚠️ <strong>نکته:</strong> هرگز z-index های تصادفی مثل{" "}
          <span className="font-mono">z-[9999]</span> استفاده نکن. همیشه از
          مقیاس بالا استفاده کن و بین‌شان فاصله بگذار.
        </div>
      </section>
    </div>
  );
}   