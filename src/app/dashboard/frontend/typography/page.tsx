const headings = [
  { tag: "h1", cls: "text-5xl font-black", label: "Display" },
  { tag: "h1", cls: "text-4xl font-black", label: "H1" },
  { tag: "h2", cls: "text-3xl font-bold", label: "H2" },
  { tag: "h3", cls: "text-2xl font-bold", label: "H3" },
  { tag: "h4", cls: "text-xl font-semibold", label: "H4" },
  { tag: "h5", cls: "text-lg font-semibold", label: "H5" },
  { tag: "h6", cls: "text-base font-semibold", label: "H6" },
];

const body = [
  { cls: "text-lg leading-relaxed", label: "Large Body" },
  { cls: "text-base leading-relaxed", label: "Base Body" },
  { cls: "text-sm leading-relaxed", label: "Small Body" },
  { cls: "text-xs leading-relaxed", label: "Caption" },
  { cls: "text-[10px] uppercase tracking-wider", label: "Overline" },
];

const weights = [
  { weight: "font-light", label: "Light 300" },
  { weight: "font-normal", label: "Regular 400" },
  { weight: "font-medium", label: "Medium 500" },
  { weight: "font-semibold", label: "Semibold 600" },
  { weight: "font-bold", label: "Bold 700" },
  { weight: "font-black", label: "Black 900" },
];

export default function TypographyPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          سلسله‌مراتب تیترها
        </h2>
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          {headings.map((h, i) => (
            <div
              key={i}
              className="flex items-baseline gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
            >
              <span className="w-20 shrink-0 text-xs font-mono text-gray-400">
                {h.label}
              </span>
              <span className={`${h.cls} text-gray-900 dark:text-white`}>
                تیتر نمونه
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          متن‌ها
        </h2>
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          {body.map((b, i) => (
            <div
              key={i}
              className="flex items-baseline gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
            >
              <span className="w-24 shrink-0 text-xs font-mono text-gray-400">
                {b.label}
              </span>
              <span className={`${b.cls} text-gray-700 dark:text-gray-300`}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          وزن فونت
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {weights.map((w) => (
            <div
              key={w.weight}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-xs font-mono text-gray-400">{w.label}</div>
              <div className={`${w.weight} mt-2 text-2xl text-gray-900 dark:text-white`}>
                نمونه متن
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          فونت پروژه
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="text-3xl font-black text-gray-900 dark:text-white">
            وزیرمتن
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            این پروژه از فونت <strong>Vazirmatn</strong> استفاده می‌کند که یک
            فونت فارسی متن‌باز و مدرن است و برای رابط‌های کاربری بهینه شده.
          </p>
        </div>
      </section>
    </div>
  );
}