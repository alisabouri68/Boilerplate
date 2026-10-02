const palettes = [
  {
    name: "Blue (Primary)",
    shades: [
      { shade: "50", value: "bg-blue-50", hex: "#eff6ff" },
      { shade: "100", value: "bg-blue-100", hex: "#dbeafe" },
      { shade: "200", value: "bg-blue-200", hex: "#bfdbfe" },
      { shade: "300", value: "bg-blue-300", hex: "#93c5fd" },
      { shade: "400", value: "bg-blue-400", hex: "#60a5fa" },
      { shade: "500", value: "bg-blue-500", hex: "#3b82f6" },
      { shade: "600", value: "bg-blue-600", hex: "#2563eb" },
      { shade: "700", value: "bg-blue-700", hex: "#1d4ed8" },
      { shade: "800", value: "bg-blue-800", hex: "#1e40af" },
      { shade: "900", value: "bg-blue-900", hex: "#1e3a8a" },
    ],
  },
  {
    name: "Emerald (Success)",
    shades: [
      { shade: "50", value: "bg-emerald-50", hex: "#ecfdf5" },
      { shade: "100", value: "bg-emerald-100", hex: "#d1fae5" },
      { shade: "300", value: "bg-emerald-300", hex: "#6ee7b7" },
      { shade: "500", value: "bg-emerald-500", hex: "#10b981" },
      { shade: "600", value: "bg-emerald-600", hex: "#059669" },
      { shade: "700", value: "bg-emerald-700", hex: "#047857" },
    ],
  },
  {
    name: "Amber (Warning)",
    shades: [
      { shade: "50", value: "bg-amber-50", hex: "#fffbeb" },
      { shade: "100", value: "bg-amber-100", hex: "#fef3c7" },
      { shade: "300", value: "bg-amber-300", hex: "#fcd34d" },
      { shade: "500", value: "bg-amber-500", hex: "#f59e0b" },
      { shade: "600", value: "bg-amber-600", hex: "#d97706" },
      { shade: "700", value: "bg-amber-700", hex: "#b45309" },
    ],
  },
  {
    name: "Red (Danger)",
    shades: [
      { shade: "50", value: "bg-red-50", hex: "#fef2f2" },
      { shade: "100", value: "bg-red-100", hex: "#fee2e2" },
      { shade: "300", value: "bg-red-300", hex: "#fca5a5" },
      { shade: "500", value: "bg-red-500", hex: "#ef4444" },
      { shade: "600", value: "bg-red-600", hex: "#dc2626" },
      { shade: "700", value: "bg-red-700", hex: "#b91c1c" },
    ],
  },
];

const semanticColors = [
  { name: "Primary", cls: "bg-blue-600", text: "text-white", desc: "اقدام اصلی" },
  { name: "Success", cls: "bg-emerald-600", text: "text-white", desc: "موفقیت" },
  { name: "Warning", cls: "bg-amber-500", text: "text-white", desc: "هشدار" },
  { name: "Danger", cls: "bg-red-600", text: "text-white", desc: "خطا" },
  { name: "Info", cls: "bg-cyan-600", text: "text-white", desc: "اطلاع" },
  { name: "Neutral", cls: "bg-gray-600", text: "text-white", desc: "خنثی" },
];

export default function ColorsPage() {
  return (
    <div className="space-y-8">
      {/* پالت‌ها */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          پالت رنگ‌ها
        </h2>
        {palettes.map((p) => (
          <div key={p.name}>
            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {p.name}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
              {p.shades.map((s) => (
                <div key={s.shade} className="overflow-hidden rounded-lg">
                  <div className={`h-16 ${s.value}`} />
                  <div className="bg-white px-2 py-1.5 text-center dark:bg-gray-900">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      {s.shade}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      {s.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* رنگ‌های معنایی */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          رنگ‌های معنایی
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {semanticColors.map((c) => (
            <div
              key={c.name}
              className={`rounded-xl ${c.cls} ${c.text} p-4 text-center shadow-lg`}
            >
              <div className="text-sm font-bold">{c.name}</div>
              <div className="mt-1 text-[11px] opacity-80">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* نمونه استفاده */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          نمونه استفاده
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              پس‌زمینه روشن
            </div>
            <div className="mt-2 text-sm text-gray-900 dark:text-white">
              متن اصلی روی سطح روشن
            </div>
          </div>
          <div className="rounded-xl bg-gray-900 p-5 dark:bg-gray-800">
            <div className="text-xs text-gray-400">پس‌زمینه تیره</div>
            <div className="mt-2 text-sm text-white">متن روی سطح تیره</div>
          </div>
        </div>
      </section>
    </div>
  );
}