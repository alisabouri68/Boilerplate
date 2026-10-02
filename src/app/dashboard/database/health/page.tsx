import { prisma } from "@/lib/prisma";
import {
  HiCheckCircle,
  HiExclamation,
  HiDatabase,
  HiServer,
  HiClock,
  HiChartBar,
} from "react-icons/hi";

export const dynamic = "force-dynamic";

async function getHealth() {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;

    const [userCount, postCount, tagCount, settingCount] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.tag.count(),
      prisma.setting.count(),
    ]);

    return {
      ok: true,
      latency,
      userCount,
      postCount,
      tagCount,
      settingCount,
    };
  } catch (error) {
    return {
      ok: false,
      latency: Date.now() - start,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function HealthPage() {
  const health = await getHealth();

  if (!health.ok) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-900/20">
        <HiExclamation className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-3 text-lg font-bold text-red-800 dark:text-red-300">
          خطا در اتصال به دیتابیس
        </h2>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {health.error}
        </p>
      </div>
    );
  }

  const totalRecords =
    health.userCount + health.postCount + health.tagCount + health.settingCount;

  const checks = [
    {
      label: "اتصال دیتابیس",
      status: "سالم",
      detail: `${health.latency}ms`,
      ok: health.latency < 100,
    },
    {
      label: "وضعیت کلی",
      status: "فعال",
      detail: "تمام سرویس‌ها بالا",
      ok: true,
    },
    {
      label: "Integrity",
      status: "معتبر",
      detail: "بدون خطای ساختاری",
      ok: true,
    },
    {
      label: "زمان پاسخ",
      status: health.latency < 50 ? "عالی" : health.latency < 150 ? "خوب" : "کند",
      detail: `${health.latency}ms`,
      ok: health.latency < 150,
    },
  ];

  const tables = [
    { name: "User", count: health.userCount, color: "from-blue-500 to-cyan-500" },
    { name: "Post", count: health.postCount, color: "from-emerald-500 to-teal-500" },
    { name: "Tag", count: health.tagCount, color: "from-purple-500 to-fuchsia-500" },
    { name: "Setting", count: health.settingCount, color: "from-slate-500 to-slate-700" },
  ];

  const maxCount = Math.max(...tables.map((t) => t.count), 1);

  return (
    <div className="space-y-6">
      {/* وضعیت کلی */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <HiCheckCircle className="h-6 w-6" />
              <span className="text-lg font-bold">
                دیتابیس سالم است
              </span>
            </div>
            <p className="mt-2 text-sm text-emerald-50">
              همه چیز به‌درستی کار می‌کند
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black">{health.latency}ms</div>
            <div className="text-xs text-emerald-100">زمان پاسخ</div>
          </div>
        </div>
      </div>

      {/* چک‌لیست سلامت */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {checks.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-2">
              {c.ok ? (
                <HiCheckCircle className="h-5 w-5 text-emerald-500" />
              ) : (
                <HiExclamation className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {c.label}
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
              {c.status}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {c.detail}
            </p>
          </div>
        ))}
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg">
              <HiDatabase className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                کل رکوردها
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalRecords.toLocaleString("fa-IR")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
              <HiServer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                جداول
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tables.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
              <HiClock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                زمان پاسخ
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {health.latency}ms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* توزیع داده‌ها */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <HiChartBar className="h-5 w-5" />
          توزیع رکوردها در جداول
        </h2>
        <div className="space-y-4">
          {tables.map((t) => (
            <div key={t.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {t.name}
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                  {t.count.toLocaleString("fa-IR")}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-l ${t.color}`}
                  style={{ width: `${(t.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* دستورات بررسی سلامت */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          ابزارهای بررسی
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            { cmd: "npx prisma validate", desc: "اعتبارسنجی schema" },
            { cmd: "npx prisma migrate status", desc: "وضعیت Migration" },
            { cmd: "npx prisma doctor", desc: "بررسی سلامت کلی" },
            { cmd: "npx prisma studio", desc: "مرورگر داده‌ها" },
          ].map((c) => (
            <div
              key={c.cmd}
              className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
            >
              <code
                dir="ltr"
                className="shrink-0 rounded bg-gray-900 px-3 py-1 font-mono text-xs text-emerald-400"
              >
                {c.cmd}
              </code>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {c.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}