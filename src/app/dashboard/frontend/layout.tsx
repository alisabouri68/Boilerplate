"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/dashboard/frontend", label: "نمای کلی" },
  { href: "/dashboard/frontend/colors", label: "رنگ‌ها" },
  { href: "/dashboard/frontend/typography", label: "تایپوگرافی" },
  { href: "/dashboard/frontend/spacing", label: "فاصله‌ها" },
  { href: "/dashboard/frontend/radius", label: "گردی گوشه" },
  { href: "/dashboard/frontend/shadows", label: "سایه‌ها" },
  { href: "/dashboard/frontend/elevation", label: "ارتفاع" },
  { href: "/dashboard/frontend/grid", label: "گرید" },
  { href: "/dashboard/frontend/breakpoints", label: "بریک‌پوینت" },
  { href: "/dashboard/frontend/z-index", label: "Z-index" },
  { href: "/dashboard/frontend/motion", label: "انیمیشن" },
  { href: "/dashboard/frontend/icons", label: "آیکون‌ها" },
];

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* هدر بخش */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          دیزاین سیستم
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          راهنمای جامع طراحی، رنگ‌ها، تایپوگرافی و کامپوننت‌های پایه
        </p>
      </div>

      {/* زیرمنو */}
      <nav className="-mx-1 flex flex-wrap gap-1.5 border-b border-gray-200 pb-4 dark:border-gray-800">
        {sections.map((s) => {
          const active =
            s.href === "/dashboard/frontend"
              ? pathname === s.href
              : pathname.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
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