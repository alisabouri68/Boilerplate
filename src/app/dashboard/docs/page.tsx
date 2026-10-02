import Link from "next/link";
import {
  HiPlay,
  HiDownload,
  HiFolder,
  HiCog,
  HiCloudUpload,
  HiQuestionMarkCircle,
  HiDocumentText,
  HiUserGroup,
  HiArrowLeft,
} from "react-icons/hi";

const guides = [
  {
    href: "/dashboard/docs/getting-started",
    title: "شروع سریع",
    desc: "در ۵ دقیقه پروژه را بالا بیاور",
    icon: HiPlay,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/dashboard/docs/installation",
    title: "نصب و راه‌اندازی",
    desc: "پیش‌نیازها، نصب پکیج‌ها و اولین اجرا",
    icon: HiDownload,
    color: "from-emerald-500 to-teal-500",
  },
  {
    href: "/dashboard/docs/project-structure",
    title: "ساختار پروژه",
    desc: "نقشه‌ی فایل‌ها و پوشه‌ها",
    icon: HiFolder,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    href: "/dashboard/docs/configuration",
    title: "تنظیمات",
    desc: "متغیرهای محیطی و config",
    icon: HiCog,
    color: "from-amber-500 to-orange-500",
  },
  {
    href: "/dashboard/docs/deployment",
    title: "استقرار",
    desc: "Deploy روی Vercel، Docker و...",
    icon: HiCloudUpload,
    color: "from-pink-500 to-rose-500",
  },
  {
    href: "/dashboard/docs/faq",
    title: "سوالات متداول",
    desc: "پاسخ به پرتکرارترین سوالات",
    icon: HiQuestionMarkCircle,
    color: "from-indigo-500 to-blue-500",
  },
  {
    href: "/dashboard/docs/changelog",
    title: "تاریخچه تغییرات",
    desc: "نسخه‌ها و ویژگی‌های جدید",
    icon: HiDocumentText,
    color: "from-teal-500 to-emerald-500",
  },
  {
    href: "/dashboard/docs/contributing",
    title: "مشارکت",
    desc: "راهنمای مشارکت در پروژه",
    icon: HiUserGroup,
    color: "from-slate-600 to-slate-800",
  },
];

export default function DocsOverview() {
  return (
    <div className="space-y-6">
      {/* هیرو */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <h2 className="text-2xl font-black">به مستندات خوش آمدید 👋</h2>
        <p className="mt-2 max-w-2xl text-sm text-cyan-50">
          همه چیز برای شروع، توسعه و استقرار پروژه در اینجا مستند شده.
          از شروع سریع تا مرجع کامل API.
        </p>
        <Link
          href="/dashboard/docs/getting-started"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
        >
          شروع سریع
          <HiArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* راهنماها */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => {
          const Icon = g.icon;
          return (
            <Link
              key={g.href}
              href={g.href}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${g.color} text-white shadow-lg`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
                {g.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {g.desc}
              </p>
            </Link>
          );
        })}
      </div>

      {/* پشته فنی */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          پشته‌ی فنی پروژه
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: "Next.js", version: "15.x" },
            { name: "React", version: "19.x" },
            { name: "TypeScript", version: "5.x" },
            { name: "Tailwind", version: "4.x" },
            { name: "Flowbite React", version: "0.10+" },
            { name: "Prisma", version: "6.x" },
            { name: "Node.js", version: "20+" },
            { name: "npm", version: "10+" },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800/50"
            >
              <div className="text-xs font-semibold text-gray-900 dark:text-white">
                {t.name}
              </div>
              <div className="mt-1 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                {t.version}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}