"use client";

import { useState } from "react";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";

const queries = [
  {
    name: "لیست کاربران",
    desc: "دریافت همه کاربران با تعداد پست‌ها",
    category: "Read",
    code: `const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    _count: { select: { posts: true } },
  },
  orderBy: { createdAt: "desc" },
});`,
  },
  {
    name: "جستجوی کاربر",
    desc: "جستجو در نام و ایمیل (case-insensitive)",
    category: "Read",
    code: `const users = await prisma.user.findMany({
  where: {
    OR: [
      { name: { contains: q } },
      { email: { contains: q } },
    ],
  },
});`,
  },
  {
    name: "ساخت کاربر",
    desc: "ایجاد کاربر جدید با نقش",
    category: "Create",
    code: `const user = await prisma.user.create({
  data: {
    name: "علی رضایی",
    email: "ali@example.com",
    password: hashedPassword,
    role: "USER",
  },
});`,
  },
  {
    name: "به‌روزرسانی",
    desc: "تغییر نقش کاربر",
    category: "Update",
    code: `const updated = await prisma.user.update({
  where: { id: userId },
  data: { role: "ADMIN" },
});`,
  },
  {
    name: "حذف",
    desc: "حذف کاربر (و پست‌هایش cascade)",
    category: "Delete",
    code: `await prisma.user.delete({
  where: { id: userId },
});`,
  },
  {
    name: "پست‌های منتشرشده",
    desc: "فقط پست‌های published: true",
    category: "Read",
    code: `const posts = await prisma.post.findMany({
  where: { published: true },
  include: { author: true, tags: true },
});`,
  },
  {
    name: "پربازدیدترین‌ها",
    desc: "۵ پست با بیشترین بازدید",
    category: "Read",
    code: `const top = await prisma.post.findMany({
  take: 5,
  orderBy: { views: "desc" },
});`,
  },
  {
    name: "آمار تجمیعی",
    desc: "مجموع بازدیدهای همه پست‌ها",
    category: "Aggregate",
    code: `const stats = await prisma.post.aggregate({
  _sum: { views: true },
  _avg: { views: true },
  _count: true,
});`,
  },
  {
    name: "گروه‌بندی",
    desc: "تعداد کاربران به تفکیک نقش",
    category: "Aggregate",
    code: `const byRole = await prisma.user.groupBy({
  by: ["role"],
  _count: { _all: true },
});`,
  },
  {
    name: "Transaction",
    desc: "چند عملیات به‌صورت اتمیک",
    category: "Advanced",
    code: `await prisma.$transaction([
  prisma.user.update({
    where: { id: "1" },
    data: { role: "ADMIN" },
  }),
  prisma.setting.create({
    data: { key: "migrated", value: "true" },
  }),
]);`,
  },
];

const categoryColors: Record<string, string> = {
  Read: "bg-blue-600",
  Create: "bg-emerald-600",
  Update: "bg-amber-500",
  Delete: "bg-red-600",
  Aggregate: "bg-purple-600",
  Advanced: "bg-slate-700",
};

export default function QueriesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800 dark:border-purple-900 dark:bg-purple-900/20 dark:text-purple-300">
        📘 مجموعه‌ای از کوئری‌های پرکاربرد Prisma — کلیک کن روی هر کد تا کپی شه.
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {queries.map((q) => (
          <div
            key={q.name}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 p-4 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md ${categoryColors[q.category]} px-2 py-0.5 font-mono text-[10px] font-bold text-white`}
                  >
                    {q.category}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {q.name}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {q.desc}
                </p>
              </div>
              <button
                onClick={() => copy(q.code, q.name)}
                className="shrink-0 rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="کپی"
              >
                {copied === q.name ? (
                  <HiCheck className="h-4 w-4 text-emerald-500" />
                ) : (
                  <HiClipboardCopy className="h-4 w-4" />
                )}
              </button>
            </div>
            <pre className="overflow-x-auto bg-gray-900 p-4 text-[11px] leading-relaxed text-gray-100 dark:bg-black">
              <code dir="ltr" className="block text-left">
                {q.code}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}