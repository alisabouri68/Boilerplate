"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiChartPie,
  HiCode,
  HiServer,
  HiDatabase,
  HiViewGrid,
  HiBookOpen,
  HiCog,
  HiOutlineSupport,
} from "react-icons/hi";

const mainNav = [
  { href: "/", label: "خانه", icon: HiHome },
  { href: "/dashboard", label: "داشبورد", icon: HiChartPie },
  { href: "/dashboard/frontend", label: "فرانت‌اند", icon: HiCode },
  { href: "/dashboard/backend", label: "بک‌اند", icon: HiServer },
  { href: "/dashboard/database", label: "دیتابیس", icon: HiDatabase },
  { href: "/dashboard/components", label: "کامپوننت‌ها", icon: HiViewGrid },
  { href: "/dashboard/docs", label: "مستندات", icon: HiBookOpen },
];

const secondaryNav = [
  { href: "/dashboard/settings", label: "تنظیمات", icon: HiCog },
  { href: "/dashboard/support", label: "پشتیبانی", icon: HiOutlineSupport },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gray-900 px-3 py-4">
      {/* برند */}
      <div className="mb-6 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/30">
          پ
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold leading-tight text-white">
            پنل پرو
          </span>
          <span className="text-xs text-gray-400">نسخه 2.4.0</span>
        </div>
      </div>

      {/* منوی اصلی */}
      <nav className="flex flex-col gap-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-lg p-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-gradient-to-l from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${
                  active ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              />
              <span className="flex-1 whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* منوی عمومی */}
      <div className="mt-6 flex flex-col gap-1 border-t border-gray-800 pt-4">
        <span className="mb-2 block px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          عمومی
        </span>
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-lg p-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-gradient-to-l from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${
                  active ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              />
              <span className="flex-1 whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* کارت پایین سایدبار */}
      <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white">
        <p className="text-sm font-semibold">نسخه Pro</p>
        <p className="mt-1 text-xs text-blue-100">
          به همه‌ی امکانات حرفه‌ای دسترسی داشته باشید.
        </p>
        <button className="mt-3 w-full rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-white/25">
          ارتقا حساب
        </button>
      </div>
    </div>
  );
}
