const levels = [
  {
    level: 0,
    title: "سطح پایه (0)",
    desc: "پس‌زمینه صفحه، بدون سایه",
    cls: "bg-gray-50 dark:bg-gray-950",
    example: "بدنه اصلی صفحه",
  },
  {
    level: 1,
    title: "کارت (1)",
    desc: "کارت‌های روی پس‌زمینه",
    cls: "bg-white dark:bg-gray-900 shadow-sm",
    example: "کارت آمار، جدول",
  },
  {
    level: 2,
    title: "کارت hover (2)",
    desc: "کارت‌های تعاملی هنگام hover",
    cls: "bg-white dark:bg-gray-900 shadow-lg",
    example: "کارت‌های قابل کلیک",
  },
  {
    level: 3,
    title: "Dropdown (3)",
    desc: "منوهای شناور و Popover",
    cls: "bg-white dark:bg-gray-800 shadow-xl",
    example: "Dropdown، Tooltip",
  },
  {
    level: 4,
    title: "Modal (4)",
    desc: "بالاترین لایه محتوا",
    cls: "bg-white dark:bg-gray-800 shadow-2xl",
    example: "مودال، Dialog",
  },
];

export default function ElevationPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        سلسله‌مراتب بصری از طریق سایه و لایه‌بندی ایجاد می‌شود. هرچه المان
        بالاتر باشد، سایه عمیق‌تر است.
      </p>

      <div className="space-y-4">
        {levels.map((l) => (
          <div
            key={l.level}
            className={`flex flex-col gap-4 rounded-xl p-6 transition-all md:flex-row md:items-center ${l.cls}`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg">
              {l.level}
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {l.title}
              </h3>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {l.desc}
              </p>
            </div>
            <div className="text-xs text-gray-500 md:text-left dark:text-gray-400">
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {l.example}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}