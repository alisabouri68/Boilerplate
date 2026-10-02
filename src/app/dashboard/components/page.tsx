import Link from "next/link";
import {
  HiCursorClick,
  HiPencil,
  HiViewGrid,
  HiTable,
  HiTemplate,
  HiExclamationCircle,
  HiBadgeCheck,
  HiUserCircle,
  HiChevronDown,
  HiMenu,
  HiChartBar,
  HiChat,
} from "react-icons/hi";

const cards = [
  { href: "/dashboard/components/buttons", title: "دکمه‌ها", desc: "انواع دکمه، سایز و حالت", icon: HiCursorClick, color: "from-blue-500 to-cyan-500" },
  { href: "/dashboard/components/forms", title: "فرم‌ها", desc: "Input، Select، Checkbox", icon: HiPencil, color: "from-emerald-500 to-teal-500" },
  { href: "/dashboard/components/cards", title: "کارت‌ها", desc: "کارت‌های محتوا، محصول", icon: HiViewGrid, color: "from-purple-500 to-fuchsia-500" },
  { href: "/dashboard/components/tables", title: "جداول", desc: "جدول ساده و پیشرفته", icon: HiTable, color: "from-amber-500 to-orange-500" },
  { href: "/dashboard/components/modals", title: "مودال‌ها", desc: "Dialog و Popup", icon: HiTemplate, color: "from-pink-500 to-rose-500" },
  { href: "/dashboard/components/alerts", title: "هشدارها", desc: "Alert و Notification", icon: HiExclamationCircle, color: "from-red-500 to-rose-500" },
  { href: "/dashboard/components/badges", title: "بج‌ها", desc: "Badge و Tag", icon: HiBadgeCheck, color: "from-indigo-500 to-blue-500" },
  { href: "/dashboard/components/avatars", title: "آواتارها", desc: "Avatar و تصویر کاربر", icon: HiUserCircle, color: "from-teal-500 to-emerald-500" },
  { href: "/dashboard/components/dropdowns", title: "Dropdownها", desc: "منوی کشویی", icon: HiChevronDown, color: "from-slate-600 to-slate-800" },
  { href: "/dashboard/components/navigation", title: "ناوبری", desc: "Navbar، Breadcrumb، Pagination", icon: HiMenu, color: "from-cyan-500 to-blue-500" },
  { href: "/dashboard/components/progress", title: "پیشرفت", desc: "Progress Bar و Spinner", icon: HiChartBar, color: "from-yellow-500 to-amber-500" },
  { href: "/dashboard/components/tooltips", title: "Tooltipها", desc: "راهنمای شناور", icon: HiChat, color: "from-rose-500 to-pink-500" },
];

export default function ComponentsOverview() {
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