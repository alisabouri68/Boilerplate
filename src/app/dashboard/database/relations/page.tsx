import { prisma } from "@/lib/prisma";
import { HiArrowLeft, HiUser, HiDocumentText, HiTag } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function RelationsPage() {
  const usersWithPosts = await prisma.user.findMany({
    take: 5,
    include: { _count: { select: { posts: true } } },
    orderBy: { createdAt: "desc" },
  });

  const postsWithRelations = await prisma.post.findMany({
    take: 5,
    include: {
      author: { select: { name: true } },
      tags: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const relations = [
    {
      from: "User",
      to: "Post",
      type: "1 - N",
      desc: "یک کاربر چندین پست دارد",
      fromColor: "from-blue-500 to-cyan-500",
      toColor: "from-emerald-500 to-teal-500",
      field: "authorId → id",
      onDelete: "Cascade",
    },
    {
      from: "Post",
      to: "Tag",
      type: "N - M",
      desc: "هر پست می‌تواند چندین تگ داشته باشد",
      fromColor: "from-emerald-500 to-teal-500",
      toColor: "from-purple-500 to-fuchsia-500",
      field: "_PostToTag",
      onDelete: "Implicit",
    },
  ];

  return (
    <div className="space-y-6">
      {/* دیاگرام روابط */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-6 text-base font-bold text-gray-900 dark:text-white">
          دیاگرام روابط
        </h2>

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-10">
          {/* User */}
          <div className="w-full max-w-[200px] rounded-xl border-2 border-blue-500 bg-blue-50 p-4 text-center dark:bg-blue-900/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
              <HiUser className="h-5 w-5" />
            </div>
            <div className="font-mono text-sm font-bold text-blue-700 dark:text-blue-400">
              User
            </div>
          </div>

          {/* 1-N */}
          <div className="flex flex-col items-center gap-1">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              1 - N
            </span>
            <HiArrowLeft className="h-5 w-5 text-gray-400" />
          </div>

          {/* Post */}
          <div className="w-full max-w-[200px] rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 text-center dark:bg-emerald-900/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <HiDocumentText className="h-5 w-5" />
            </div>
            <div className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
              Post
            </div>
          </div>

          {/* N-M */}
          <div className="flex flex-col items-center gap-1">
            <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              N - M
            </span>
            <HiArrowLeft className="h-5 w-5 text-gray-400" />
          </div>

          {/* Tag */}
          <div className="w-full max-w-[200px] rounded-xl border-2 border-purple-500 bg-purple-50 p-4 text-center dark:bg-purple-900/20">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 text-white">
              <HiTag className="h-5 w-5" />
            </div>
            <div className="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">
              Tag
            </div>
          </div>
        </div>
      </section>

      {/* جزئیات روابط */}
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          جزئیات روابط
        </h2>
        <div className="space-y-3">
          {relations.map((r, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                  {r.from}
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[10px] font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {r.type}
                </span>
                <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                  {r.to}
                </span>
                <span className="flex-1 text-xs text-gray-500 dark:text-gray-400">
                  {r.desc}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                <div className="rounded bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                  <span className="text-gray-500 dark:text-gray-400">فیلد: </span>
                  <span className="font-mono text-gray-700 dark:text-gray-300">
                    {r.field}
                  </span>
                </div>
                <div className="rounded bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                  <span className="text-gray-500 dark:text-gray-400">OnDelete: </span>
                  <span className="font-mono text-gray-700 dark:text-gray-300">
                    {r.onDelete}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* نمونه داده‌های مرتبط */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
            User → Posts
          </h3>
          <div className="space-y-2">
            {usersWithPosts.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {u.name}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {u._count.posts} پست
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
            Post → Tags
          </h3>
          <div className="space-y-2">
            {postsWithRelations.map((p) => (
              <div key={p.id} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                <div className="truncate text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {p.title}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.tags.length > 0 ? (
                    p.tags.map((t) => (
                      <span
                        key={t.name}
                        className="rounded bg-purple-100 px-1.5 py-0.5 text-[9px] text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      >
                        {t.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-gray-400">بدون تگ</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}