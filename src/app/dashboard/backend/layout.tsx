"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/dashboard/backend", label: "نمای کلی" },
  { href: "/dashboard/backend/api-routes", label: "API Routes" },
  { href: "/dashboard/backend/auth", label: "احراز هویت" },
  { href: "/dashboard/backend/actions", label: "Server Actions" },
  { href: "/dashboard/backend/middleware", label: "Middleware" },
  { href: "/dashboard/backend/validation", label: "اعتبارسنجی" },
  { href: "/dashboard/backend/database", label: "دیتابیس" },
  { href: "/dashboard/backend/env", label: "متغیرها" },
  { href: "/dashboard/backend/errors", label: "مدیریت خطا" },
  { href: "/dashboard/backend/logging", label: "لاگینگ" },
  { href: "/dashboard/backend/rate-limit", label: "Rate Limit" },
  { href: "/dashboard/backend/webhooks", label: "Webhooks" },
];

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          بک‌اند
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          API، احراز هویت، دیتابیس و زیرساخت سرور
        </p>
      </div>

      <nav className="-mx-1 flex flex-wrap gap-1.5 border-b border-gray-200 pb-4 dark:border-gray-800">
        {sections.map((s) => {
          const active =
            s.href === "/dashboard/backend"
              ? pathname === s.href
              : pathname.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30"
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