import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { HiTable, HiEye } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function TablesPage() {
  const [
    usersCount,
    postsCount,
    tagsCount,
    settingsCount,
    usersSample,
    postsSample,
    tagsSample,
    settingsSample,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.tag.count(),
    prisma.setting.count(),
    prisma.user.findMany({
      take: 5,
      select: { id: true, name: true, email: true, role: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.findMany({
      take: 5,
      select: { id: true, title: true, published: true, views: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.tag.findMany({
      take: 5,
      select: { id: true, name: true, slug: true },
    }),
    prisma.setting.findMany({ take: 5 }),
  ]);

  const tables = [
    {
      name: "User",
      count: usersCount,
      columns: ["id", "email", "name", "role", "createdAt"],
      sample: usersSample,
      color: "from-blue-500 to-cyan-500",
      detailUrl: "/dashboard/database/users",
    },
    {
      name: "Post",
      count: postsCount,
      columns: ["id", "title", "slug", "published", "views"],
      sample: postsSample,
      color: "from-emerald-500 to-teal-500",
      detailUrl: "/dashboard/database/posts",
    },
    {
      name: "Tag",
      count: tagsCount,
      columns: ["id", "name", "slug"],
      sample: tagsSample,
      color: "from-purple-500 to-fuchsia-500",
      detailUrl: null,
    },
    {
      name: "Setting",
      count: settingsCount,
      columns: ["id", "key", "value"],
      sample: settingsSample,
      color: "from-slate-500 to-slate-700",
      detailUrl: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        📊 نمای کلی جداول دیتابیس با نمونه‌ی داده‌ها (۵ رکورد آخر هر جدول)
      </div>

      {tables.map((t) => (
        <div
          key={t.name}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        >
          {/* هدر جدول */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-5 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} text-white shadow-lg`}
              >
                <HiTable className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-mono text-base font-bold text-gray-900 dark:text-white">
                  {t.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.count.toLocaleString("fa-IR")} رکورد —{" "}
                  {t.columns.length} ستون
                </p>
              </div>
            </div>
            {t.detailUrl && (
              <Link
                href={t.detailUrl}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <HiEye className="h-3.5 w-3.5" />
                مشاهده کامل
              </Link>
            )}
          </div>

          {/* نمونه داده */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  {t.columns.map((c) => (
                    <th
                      key={c}
                      className="px-4 py-2.5 text-right font-mono font-bold text-gray-600 dark:text-gray-400"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {t.sample.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    {t.columns.map((c) => {
                      const val = row[c];
                      const display =
                        typeof val === "boolean"
                          ? val
                            ? "✓"
                            : "✗"
                          : val === null || val === undefined
                          ? "—"
                          : String(val);
                      return (
                        <td
                          key={c}
                          className="max-w-[200px] truncate px-4 py-2.5 font-mono text-gray-700 dark:text-gray-300"
                        >
                          {display}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}