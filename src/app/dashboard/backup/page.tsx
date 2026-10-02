"use client";

import { HiDownload, HiUpload, HiDatabase, HiCloud, HiClock } from "react-icons/hi";
import { useState } from "react";

const strategies = [
  {
    title: "بکاپ روزانه",
    desc: "پشتیبان‌گیری خودکار در ساعت ۳ بامداد",
    icon: HiClock,
    color: "from-blue-500 to-cyan-500",
    status: "فعال",
  },
  {
    title: "بکاپ هفتگی",
    desc: "آرشیو کامل به S3 یا FTP",
    icon: HiCloud,
    color: "from-purple-500 to-fuchsia-500",
    status: "فعال",
  },
  {
    title: "بکاپ دستی",
    desc: "بر اساس درخواست کاربر",
    icon: HiDatabase,
    color: "from-amber-500 to-orange-500",
    status: "آماده",
  },
];

const history = [
  { date: "۱۴۰۳/۰۵/۱۲ - ۰۳:۰۰", size: "۲.۴ MB", type: "خودکار", status: "موفق" },
  { date: "۱۴۰۳/۰۵/۱۱ - ۰۳:۰۰", size: "۲.۳ MB", type: "خودکار", status: "موفق" },
  { date: "۱۴۰۳/۰۵/۱۰ - ۱۵:۳۲", size: "۲.۳ MB", type: "دستی", status: "موفق" },
  { date: "۱۴۰۳/۰۵/۱۰ - ۰۳:۰۰", size: "۲.۳ MB", type: "خودکار", status: "موفق" },
  { date: "۱۴۰۳/۰۵/۰۹ - ۰۳:۰۰", size: "۲.۲ MB", type: "خودکار", status: "موفق" },
];

export default function BackupPage() {
  const [backing, setBacking] = useState(false);

  const handleBackup = () => {
    setBacking(true);
    setTimeout(() => setBacking(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* کارت‌های عملیات */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {strategies.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {s.status}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                {s.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* دکمه‌های عملیات */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          عملیات
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleBackup}
            disabled={backing}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-l from-purple-600 to-fuchsia-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-purple-500/30 transition hover:from-purple-700 hover:to-fuchsia-700 disabled:opacity-60"
          >
            <HiDownload className="h-4 w-4" />
            {backing ? "در حال بکاپ..." : "بکاپ فوری"}
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <HiUpload className="h-4 w-4" />
            بازیابی از فایل
          </button>
        </div>
      </section>

      {/* راهنمای دستورات */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          دستورات بکاپ (CLI)
        </h2>
        <div className="space-y-2">
          {[
            {
              cmd: "cp prisma/dev.db backups/dev-$(date +%Y%m%d).db",
              desc: "بکاپ SQLite",
            },
            {
              cmd: "pg_dump mydb > backup.sql",
              desc: "بکاپ PostgreSQL",
            },
            {
              cmd: "psql mydb < backup.sql",
              desc: "بازیابی PostgreSQL",
            },
            {
              cmd: "sqlite3 dev.db .dump > backup.sql",
              desc: "خروجی SQL از SQLite",
            },
          ].map((c) => (
            <div
              key={c.cmd}
              className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 md:flex-row md:items-center dark:bg-gray-800/50"
            >
              <code
                dir="ltr"
                className="overflow-x-auto rounded bg-gray-900 px-3 py-1 font-mono text-xs text-emerald-400"
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

      {/* تاریخچه */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 p-5 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            تاریخچه بکاپ‌ها
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                {["تاریخ", "حجم", "نوع", "وضعیت"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {h.date}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-400">
                    {h.size}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        h.type === "خودکار"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {h.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ✓ {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}