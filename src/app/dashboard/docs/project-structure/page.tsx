import { HiFolder, HiDocumentText, HiCode, HiCog } from "react-icons/hi";

type Node = {
  name: string;
  type: "folder" | "file";
  desc?: string;
  depth: number;
};

const tree: Node[] = [
  { name: "src/", type: "folder", desc: "کد اصلی پروژه", depth: 0 },
  { name: "app/", type: "folder", desc: "مسیرها و صفحات (App Router)", depth: 1 },
  { name: "layout.tsx", type: "file", desc: "Layout ریشه", depth: 2 },
  { name: "page.tsx", type: "file", desc: "صفحه‌ی خانه", depth: 2 },
  { name: "globals.css", type: "file", desc: "استایل‌های سراسری", depth: 2 },
  { name: "dashboard/", type: "folder", desc: "بخش داشبورد", depth: 2 },
  { name: "layout.tsx", type: "file", desc: "Layout داشبورد", depth: 3 },
  { name: "page.tsx", type: "file", desc: "نمای کلی داشبورد", depth: 3 },
  { name: "frontend/", type: "folder", desc: "دیزاین سیستم", depth: 3 },
  { name: "backend/", type: "folder", desc: "مستندات بک‌اند", depth: 3 },
  { name: "database/", type: "folder", desc: "مدیریت دیتابیس", depth: 3 },
  { name: "components/", type: "folder", desc: "گالری کامپوننت‌ها", depth: 3 },
  { name: "docs/", type: "folder", desc: "مستندات", depth: 3 },
  { name: "api/", type: "folder", desc: "API Routes", depth: 1 },
  { name: "users/", type: "folder", desc: "API کاربران", depth: 2 },
  { name: "route.ts", type: "file", desc: "GET, POST", depth: 3 },
  { name: "components/", type: "folder", desc: "کامپوننت‌های قابل استفاده مجدد", depth: 1 },
  { name: "dashboard/", type: "folder", desc: "کامپوننت‌های داشبورد", depth: 2 },
  { name: "Sidebar.tsx", type: "file", desc: "سایدبار", depth: 3 },
  { name: "Topbar.tsx", type: "file", desc: "هدر", depth: 3 },
  { name: "lib/", type: "folder", desc: "توابع و پیکربندی", depth: 1 },
  { name: "prisma.ts", type: "file", desc: "Prisma Client singleton", depth: 2 },
  { name: "utils.ts", type: "file", desc: "توابع کمکی", depth: 2 },
  { name: "prisma/", type: "folder", desc: "دیتابیس (خارج از src)", depth: 0 },
  { name: "schema.prisma", type: "file", desc: "مدل‌های دیتابیس", depth: 1 },
  { name: "seed.ts", type: "file", desc: "داده‌های اولیه", depth: 1 },
  { name: "migrations/", type: "folder", desc: "تاریخچه تغییرات", depth: 1 },
  { name: "public/", type: "folder", desc: "فایل‌های استاتیک", depth: 0 },
  { name: "package.json", type: "file", desc: "وابستگی‌ها", depth: 0 },
  { name: "tsconfig.json", type: "file", desc: "تنظیمات TypeScript", depth: 0 },
  { name: "next.config.js", type: "file", desc: "تنظیمات Next.js", depth: 0 },
];

export default function ProjectStructurePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-300">
        📁 نقشه‌ی کامل فایل‌ها و پوشه‌های پروژه با توضیح هر بخش.
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 p-4 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            ساختار درختی
          </h2>
        </div>
        <div className="p-4 font-mono text-xs">
          {tree.map((n, i) => {
            const Icon =
              n.type === "folder"
                ? HiFolder
                : n.name.endsWith(".tsx")
                ? HiCode
                : n.name.endsWith(".json") || n.name.endsWith(".js")
                ? HiCog
                : HiDocumentText;
            return (
              <div
                key={i}
                className="group flex items-center gap-2 rounded py-1 pr-1 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                style={{ paddingRight: `${n.depth * 20 + 4}px` }}
              >
                <Icon
                  className={`h-3.5 w-3.5 shrink-0 ${
                    n.type === "folder"
                      ? "text-purple-500"
                      : n.name.endsWith(".tsx")
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={
                    n.type === "folder"
                      ? "font-bold text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }
                >
                  {n.name}
                </span>
                {n.desc && (
                  <span className="ml-2 hidden text-[10px] text-gray-400 sm:inline">
                    — {n.desc}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            title: "app/",
            desc: "مسیرهای پروژه با App Router. هر پوشه یک Route و هر page.tsx یک صفحه است.",
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "components/",
            desc: "کامپوننت‌های قابل استفاده مجدد. بین بخش‌های مختلف پروژه مشترکند.",
            color: "from-emerald-500 to-teal-500",
          },
          {
            title: "lib/",
            desc: "توابع کمکی، تنظیمات و سینگلتون‌ها (مثل Prisma Client).",
            color: "from-purple-500 to-fuchsia-500",
          },
          {
            title: "prisma/",
            desc: "همه‌چیز مربوط به دیتابیس: Schema، Migration و Seed.",
            color: "from-amber-500 to-orange-500",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`inline-block rounded-lg bg-gradient-to-br ${c.color} px-3 py-1 font-mono text-xs font-bold text-white`}
            >
              {c.title}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {c.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}