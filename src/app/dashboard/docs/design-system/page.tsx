import Link from "next/link";
import {
  HiColorSwatch,
  HiViewBoards,
  HiViewGrid,
  HiSparkles,
  HiArrowLeft,
  HiCheckCircle,
  HiCode,
} from "react-icons/hi";

const modules = [
  {
    href: "/dashboard/docs/design-system/typography",
    title: "تایپوگرافی",
    desc: "فونت، مقیاس سایز، وزن، line-height و استایل‌های متنی",
    icon: HiColorSwatch,
    color: "from-blue-500 to-indigo-600",
    status: "آماده",
    features: [
      "۵۰+ فونت Google + آپلود محلی",
      "تولید خودکار مقیاس (Modular Scale)",
      "پشتیبانی Variable Fonts",
      "خروجی: CSS / Tailwind / Figma / TS",
      "بررسی WCAG و کنتراست",
    ],
  },
  {
    href: "#",
    title: "رنگ‌ها",
    desc: "پالت رنگ، semantic tokens و dark mode",
    icon: HiViewBoards,
    color: "from-pink-500 to-rose-600",
    status: "به‌زودی",
    features: [],
  },
  {
    href: "#",
    title: "فاصله‌ها",
    desc: "Spacing scale و grid system",
    icon: HiViewGrid,
    color: "from-amber-500 to-orange-600",
    status: "به‌زودی",
    features: [],
  },
  {
    href: "#",
    title: "افکت‌ها",
    desc: "سایه‌ها، blur، و انیمیشن‌ها",
    icon: HiSparkles,
    color: "from-emerald-500 to-teal-600",
    status: "به‌زودی",
    features: [],
  },
];

export default function DesignSystemOverview() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-black">سیستم طراحی 🎨</h2>
        <p className="mt-2 max-w-2xl text-sm text-violet-50">
          مجموعه‌ای از استانداردها، توکن‌ها و ابزارها برای ساخت رابط‌های کاربری
          یکپارچه و زیبا.
        </p>
        <Link
          href="/dashboard/docs/design-system/typography"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
        >
          شروع با تایپوگرافی
          <HiArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {modules.map((m) => {
          const Icon = m.icon;
          const isReady = m.status === "آماده";
          return (
            <Link
              key={m.title}
              href={m.href}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all dark:border-gray-800 dark:bg-gray-900 ${
                isReady
                  ? "hover:-translate-y-1 hover:shadow-lg"
                  : "cursor-not-allowed opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    isReady
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
                {m.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {m.desc}
              </p>
              {m.features.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {m.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-1.5 text-[11px] text-gray-600 dark:text-gray-400"
                    >
                      <HiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {isReady && (
                <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                  مشاهده مستندات
                  <HiArrowLeft className="h-3 w-3" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          اصول سیستم طراحی
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "توکن‌محور",
              desc: "همه چیز از توکن‌ها ساخته می‌شه",
              icon: HiCode,
            },
            {
              title: "قابل خروجی",
              desc: "CSS، Tailwind، Figma، TS",
              icon: HiArrowLeft,
            },
            {
              title: "دسترس‌پذیر",
              desc: "استانداردهای WCAG 2.1",
              icon: HiCheckCircle,
            },
            {
              title: "فارسی‌محور",
              desc: "بهینه برای RTL و فارسی",
              icon: HiSparkles,
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50"
              >
                <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <h4 className="mt-2 text-xs font-bold text-gray-900 dark:text-white">
                  {p.title}
                </h4>
                <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
