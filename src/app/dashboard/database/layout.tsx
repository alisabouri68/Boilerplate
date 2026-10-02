    "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/dashboard/database", label: "نمای کلی" },
  { href: "/dashboard/database/models", label: "مدل‌ها" },
  { href: "/dashboard/database/tables", label: "جداول" },
  { href: "/dashboard/database/relations", label: "روابط" },
  { href: "/dashboard/database/queries", label: "کوئری‌ها" },
  { href: "/dashboard/database/migrations", label: "Migration" },
  { href: "/dashboard/database/indexes", label: "ایندکس‌ها" },
  { href: "/dashboard/database/seed", label: "Seed" },
  { href: "/dashboard/database/backup", label: "پشتیبان" },
  { href: "/dashboard/database/health", label: "سلامت" },
];

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          دیتابیس
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          مدیریت داده‌ها با Prisma
        </p>
      </div>

      <nav className="-mx-1 flex flex-wrap gap-1.5 border-b border-gray-200 pb-4 dark:border-gray-800">
        {sections.map((s) => {
          const active =
            s.href === "/dashboard/database"
              ? pathname === s.href
              : pathname.startsWith(s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-500/30"
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