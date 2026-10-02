"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/dashboard/components", label: "نمای کلی" },
  { href: "/dashboard/components/buttons", label: "دکمه‌ها" },
  { href: "/dashboard/components/forms", label: "فرم‌ها" },
  { href: "/dashboard/components/cards", label: "کارت‌ها" },
  { href: "/dashboard/components/tables", label: "جداول" },
  { href: "/dashboard/components/modals", label: "مودال‌ها" },
  { href: "/dashboard/components/alerts", label: "هشدارها" },
  { href: "/dashboard/components/badges", label: "بج‌ها" },
  { href: "/dashboard/components/avatars", label: "آواتارها" },
  { href: "/dashboard/components/dropdowns", label: "Dropdownها" },
  { href: "/dashboard/components/navigation", label: "ناوبری" },
  { href: "/dashboard/components/progress", label: "پیشرفت" },
  { href: "/dashboard/components/tooltips", label: "Tooltipها" },
];

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          کامپوننت‌ها
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          گالری کامپوننت‌های آماده‌ی UI Kit
        </p>
      </div>

      <nav className="-mx-1 flex flex-wrap gap-1.5 border-b border-gray-200 pb-4 dark:border-gray-800">
        {sections.map((s) => {
          const active =
            s.href === "/dashboard/components"
              ? pathname === s.href
              : pathname.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-orange-600 text-white shadow-sm shadow-orange-500/30"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}