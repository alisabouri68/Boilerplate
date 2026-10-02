import Link from "next/link";
import {
  HiServer,
  HiKey,
  HiLightningBolt,
  HiShieldCheck,
  HiCheckCircle,
  HiDatabase,
  HiCog,
  HiExclamation,
  HiDocumentText,
  HiClock,
  HiGlobe,
} from "react-icons/hi";

const cards = [
  {
    href: "/dashboard/backend/api-routes",
    title: "API Routes",
    desc: "Route Handlers در App Router",
    icon: HiServer,
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/dashboard/backend/auth",
    title: "احراز هویت",
    desc: "Session، JWT و OAuth",
    icon: HiKey,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/dashboard/backend/actions",
    title: "Server Actions",
    desc: "توابع سمت سرور بدون API",
    icon: HiLightningBolt,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/dashboard/backend/middleware",
    title: "Middleware",
    desc: "فیلتر و مدیریت درخواست‌ها",
    icon: HiShieldCheck,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    href: "/dashboard/backend/validation",
    title: "اعتبارسنجی",
    desc: "Schema اعتبارسنجی با Zod",
    icon: HiCheckCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    href: "/dashboard/backend/database",
    title: "دیتابیس",
    desc: "مدل‌ها، کوئری‌ها و Migration",
    icon: HiDatabase,
    color: "from-indigo-500 to-blue-500",
  },
  {
    href: "/dashboard/backend/env",
    title: "متغیرهای محیطی",
    desc: "مدیریت ENV و Secrets",
    icon: HiCog,
    color: "from-slate-600 to-slate-800",
  },
  {
    href: "/dashboard/backend/errors",
    title: "مدیریت خطا",
    desc: "Error Boundary و Response",
    icon: HiExclamation,
    color: "from-red-500 to-rose-500",
  },
  {
    href: "/dashboard/backend/logging",
    title: "لاگینگ",
    desc: "ثبت رویدادها و اشکال‌زدایی",
    icon: HiDocumentText,
    color: "from-yellow-500 to-amber-500",
  },
  {
    href: "/dashboard/backend/rate-limit",
    title: "Rate Limit",
    desc: "محدودیت درخواست و DDoS",
    icon: HiClock,
    color: "from-pink-500 to-rose-500",
  },
  {
    href: "/dashboard/backend/webhooks",
    title: "Webhooks",
    desc: "دریافت و ارسال وبهوک",
    icon: HiGlobe,
    color: "from-teal-500 to-emerald-500",
  },
];

const stack = [
  { name: "Next.js Route Handlers", status: "فعال" },
  { name: "NextAuth.js v5", status: "فعال" },
  { name: "Prisma ORM", status: "فعال" },
  { name: "Zod Validation", status: "فعال" },
  { name: "Upstash Redis", status: "اختیاری" },
  { name: "Resend Email", status: "اختیاری" },
];

export default function BackendOverview() {
  return (
    <div className="space-y-6">
      {/* وضعیت پشته */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          وضعیت سرویس‌ها
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/50"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {s.name}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  s.status === "فعال"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* کارت‌های بخش‌ها */}
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
    </div>
  );
}