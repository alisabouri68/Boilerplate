"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


const sections = [
  { href: "/dashboard/docs", label: "نمای کلی" },
  { href: "/dashboard/docs/getting-started", label: "شروع سریع" },
  { href: "/dashboard/docs/installation", label: "نصب" },
  { href: "/dashboard/docs/project-structure", label: "ساختار پروژه" },
  { href: "/dashboard/docs/design-system", label: "سیستم طراحی" }, // ← جدید
  { href: "/dashboard/docs/configuration", label: "تنظیمات" },
  { href: "/dashboard/docs/deployment", label: "استقرار" },
  { href: "/dashboard/docs/faq", label: "سوالات متداول" },
  { href: "/dashboard/docs/changelog", label: "تغییرات" },
  { href: "/dashboard/docs/contributing", label: "مشارکت" },
];
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          مستندات
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          راهنمای کامل استفاده و توسعه‌ی پروژه
        </p>
      </div>

      <nav className="-mx-1 flex flex-wrap gap-1.5 border-b border-gray-200 pb-4 dark:border-gray-800">
        {sections.map((s) => {
          const active =
            s.href === "/dashboard/docs"
              ? pathname === s.href
              : pathname.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-cyan-600 text-white shadow-sm shadow-cyan-500/30"
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