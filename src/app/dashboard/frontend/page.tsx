import Link from "next/link";
import {
  HiColorSwatch,
  HiSparkles,
  HiViewGrid,
  HiCube,
  HiLightningBolt,
  HiPhotograph,
  HiMoon,
} from "react-icons/hi";

const cards = [
    {
    href: "/dashboard/frontend/theme", // ← کارت جدید
    title: "تم",
    desc: "توکن‌های پایه، حالت روشن/تاریک و رنگ‌های معنایی",
    icon: HiMoon,
    color: "from-violet-500 to-indigo-500",
  },
  {
    href: "/dashboard/frontend/colors",
    title: "سیستم رنگ",
    desc: "پالت اصلی، ثانویه، وضعیت‌ها و رنگ‌های معنایی",
    icon: HiColorSwatch,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/dashboard/frontend/typography",
    title: "تایپوگرافی",
    desc: "سلسله‌مراتب تیترها، متن و فونت‌ها",
    icon: HiSparkles,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    href: "/dashboard/frontend/spacing",
    title: "فاصله‌ها",
    desc: "سیستم ۴ پیکسلی و مقیاس فاصله‌ها",
    icon: HiViewGrid,
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/dashboard/frontend/radius",
    title: "گردی گوشه",
    desc: "مقیاس border-radius برای کامپوننت‌ها",
    icon: HiCube,
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/dashboard/frontend/shadows",
    title: "سایه‌ها",
    desc: "سایه‌های استاندارد و کاربردشان",
    icon: HiPhotograph,
    color: "from-slate-600 to-slate-800",
  },
  {
    href: "/dashboard/frontend/elevation",
    title: "ارتفاع",
    desc: "سلسله‌مراتب بصری با سایه و لایه",
    icon: HiCube,
    color: "from-indigo-500 to-blue-500",
  },
  {
    href: "/dashboard/frontend/grid",
    title: "گرید و کانتینر",
    desc: "سیستم گرید ۱۲ ستونه و عرض کانتینر",
    icon: HiViewGrid,
    color: "from-pink-500 to-rose-500",
  },
  {
    href: "/dashboard/frontend/breakpoints",
    title: "بریک‌پوینت‌ها",
    desc: "نقاط شکست ریسپانسیو",
    icon: HiViewGrid,
    color: "from-cyan-500 to-blue-500",
  },
  {
    href: "/dashboard/frontend/z-index",
    title: "لایه‌بندی",
    desc: "مدیریت z-index برای لایه‌ها",
    icon: HiCube,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/dashboard/frontend/motion",
    title: "انیمیشن",
    desc: "مدت، منحنی و انواع حرکت",
    icon: HiLightningBolt,
    color: "from-yellow-500 to-amber-500",
  },
  {
    href: "/dashboard/frontend/icons",
    title: "آیکون‌ها",
    desc: "کتابخانه آیکون و کاربردها",
    icon: HiPhotograph,
    color: "from-teal-500 to-emerald-500",
  },
];

export default function DesignSystemOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-lg`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
              {c.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              {c.desc}
            </p>
          </Link>
        );
      })}
    </div>
  );
}