const versions = [
  {
    version: "2.4.0",
    date: "۱۴۰۳/۰۵/۱۵",
    type: "major",
    changes: [
      { type: "feat", text: "افزودن بخش دیزاین سیستم کامل" },
      { type: "feat", text: "صفحات دیتابیس با Prisma" },
      { type: "feat", text: "گالری کامپوننت‌ها با ۱۲ بخش" },
      { type: "feat", text: "بخش مستندات جامع" },
      { type: "fix", text: "رفع مشکل RTL در سایدبار" },
    ],
  },
  {
    version: "2.3.0",
    date: "۱۴۰۳/۰۴/۲۸",
    type: "minor",
    changes: [
      { type: "feat", text: "پشتیبانی از Tailwind v4" },
      { type: "feat", text: "ارتقا به Next.js 15" },
      { type: "improvement", text: "بهبود سرعت بارگذاری" },
    ],
  },
  {
    version: "2.2.0",
    date: "۱۴۰۳/۰۴/۱۰",
    type: "minor",
    changes: [
      { type: "feat", text: "افزودن دارک مود" },
      { type: "feat", text: "فونت وزیرمتن" },
      { type: "fix", text: "رفع خطای hydration" },
    ],
  },
  {
    version: "2.1.0",
    date: "۱۴۰۳/۰۳/۲۲",
    type: "minor",
    changes: [
      { type: "feat", text: "راه‌اندازی Prisma" },
      { type: "feat", text: "مدل‌های User، Post، Tag" },
    ],
  },
  {
    version: "2.0.0",
    date: "۱۴۰۳/۰۳/۰۱",
    type: "major",
    changes: [
      { type: "breaking", text: "مهاجرت به App Router" },
      { type: "breaking", text: "تغییر ساختار پوشه‌ها" },
      { type: "feat", text: "پشتیبانی از Server Components" },
    ],
  },
];

const typeColors = {
  feat: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  fix: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  improvement: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  breaking: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const versionColors = {
  major: "from-purple-500 to-fuchsia-500",
  minor: "from-blue-500 to-cyan-500",
  patch: "from-gray-500 to-gray-700",
};

export default function ChangelogPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-800 dark:border-teal-900 dark:bg-teal-900/20 dark:text-teal-300">
        📋 تاریخچه‌ی کامل نسخه‌ها با تغییرات هرکدام.
      </div>

      <div className="relative space-y-6 pr-6">
        {/* خط عمودی */}
        <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-800" />

        {versions.map((v) => (
          <div key={v.version} className="relative">
            {/* نقطه */}
            <div className="absolute right-[-22px] top-3 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
              <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${versionColors[v.type as keyof typeof versionColors]}`} />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-block rounded-lg bg-gradient-to-br ${versionColors[v.type as keyof typeof versionColors]} px-3 py-1 font-mono text-xs font-bold text-white`}
                >
                  v{v.version}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {v.date}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  {v.type}
                </span>
              </div>

              <ul className="mt-4 space-y-2">
                {v.changes.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${typeColors[c.type as keyof typeof typeColors]}`}
                    >
                      {c.type}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}