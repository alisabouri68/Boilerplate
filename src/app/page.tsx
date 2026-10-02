import Link from "next/link";
import {
  HiArrowLeft,
  HiCode,
  HiServer,
  HiDatabase,
  HiLightningBolt,
  HiShieldCheck,
  HiColorSwatch,
  HiMoon,
  HiCheck,
} from "react-icons/hi";

const features = [
  {
    icon: HiCode,
    title: "فرانت‌اند مدرن",
    desc: "Next.js 15 + App Router، TypeScript و Tailwind CSS v4",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: HiServer,
    title: "بک‌اند قدرتمند",
    desc: "Route Handlers، Server Actions و احراز هویت امن",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: HiDatabase,
    title: "دیتابیس آماده",
    desc: "Prisma ORM با پشتیبانی PostgreSQL و MySQL",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: HiColorSwatch,
    title: "UI Kit حرفه‌ای",
    desc: "Flowbite React با تم‌های سفارشی و RTL کامل",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: HiShieldCheck,
    title: "امنیت از روز اول",
    desc: "CSRF، XSS، Rate Limiting و مدیریت Session",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: HiMoon,
    title: "دارک مود",
    desc: "پشتیبانی از تم روشن و تاریک به‌صورت پیش‌فرض",
    color: "from-slate-600 to-slate-800",
  },
];

const techStack = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Tailwind v4",
  "Flowbite React",
  "Prisma",
  "Zod",
  "NextAuth",
];

const stats = [
  { value: "۵۰+", label: "کامپوننت آماده" },
  { value: "۱۰۰٪", label: "TypeScript" },
  { value: "RTL", label: "پشتیبانی کامل" },
  { value: "MIT", label: "لایسنس آزاد" },
];

const checklist = [
  "احراز هویت با ایمیل و OAuth",
  "داشبورد مدیریت کاربران",
  "API مستندشده با OpenAPI",
  "مدیریت فایل و آپلود",
  "ایمیل تراکنشی آماده",
  "تست‌های Unit و E2E",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* ============ هدر ============ */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white shadow-md shadow-blue-500/30">
              پ
            </div>
            <span className="text-base font-bold">پنل پرو</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "#features", label: "ویژگی‌ها" },
              { href: "#stack", label: "تکنولوژی‌ها" },
              { href: "#checklist", label: "امکانات" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-l from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition hover:from-blue-700 hover:to-indigo-700"
            >
              ورود به داشبورد
              <HiArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden">
        {/* پس‌زمینه تزئینی */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute right-1/2 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8 md:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-400">
            <HiLightningBolt className="h-3.5 w-3.5" />
            نسخه ۲.۴ منتشر شد
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            بویلرپلیت حرفه‌ای برای
            <span className="bg-gradient-to-l from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              پروژه‌های مدرن{" "}
            </span>
            وب
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
            همه‌چیز برای شروع سریع آماده‌ست: فرانت، بک، دیتابیس، احراز هویت و
            UI Kit. فقط کافیه ایده‌ت رو اضافه کنی.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700 sm:w-auto"
            >
              شروع کنید
              <HiArrowLeft className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
            >
              مشاهده ویژگی‌ها
            </a>
          </div>

          {/* آمار */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-gray-900 md:text-3xl dark:text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ویژگی‌ها ============ */}
      <section
        id="features"
        className="border-t border-gray-200 bg-gray-50 py-20 md:py-24 dark:border-gray-800 dark:bg-gray-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              همه‌چیز آماده، فقط کد بزن
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              ساختار ماژولار، تایپ‌سیف و آماده‌ی توسعه‌ی تیمی
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ تکنولوژی‌ها ============ */}
      <section id="stack" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              ساخته‌شده با بهترین‌ها
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              پشته‌ی فناوری مدرن و پرطرفدار
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ چک‌لیست ============ */}
      <section
        id="checklist"
        className="border-t border-gray-200 bg-gray-50 py-20 md:py-24 dark:border-gray-800 dark:bg-gray-900/50"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
          {/* متن */}
          <div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              از روز اول آماده‌ی تولید
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              همه‌ی امکاناتی که برای راه‌اندازی یه پروژه‌ی واقعی لازم داری،
              از قبل پیاده‌سازی شده.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-700 hover:to-indigo-700"
            >
              مشاهده داشبورد
              <HiArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          {/* لیست */}
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow">
                  <HiCheck className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-10 text-center text-white shadow-2xl md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <h2 className="relative text-3xl font-black tracking-tight md:text-4xl">
              آماده‌ای شروع کنی؟
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-blue-100">
              همین حالا پروژه رو clone کن و تو چند ثانیه اول رو بزن.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50 sm:w-auto"
              >
                ورود به داشبورد
                <HiArrowLeft className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
              >
                مشاهده در گیت‌هاب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ فوتر ============ */}
      <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-black text-white">
              پ
            </div>
            <span className="text-sm font-semibold">پنل پرو</span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} — تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/dashboard/docs"
              className="text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              مستندات
            </Link>
            <Link
              href="/dashboard/support"
              className="text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              پشتیبانی
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}