const indexes = [
  {
    table: "User",
    field: "email",
    type: "Unique",
    reason: "جستجوی سریع هنگام Login",
    color: "from-blue-500 to-cyan-500",
  },
  {
    table: "User",
    field: "role",
    type: "Index",
    reason: "فیلتر کاربران بر اساس نقش",
    color: "from-blue-500 to-cyan-500",
  },
  {
    table: "Post",
    field: "slug",
    type: "Unique",
    reason: "دسترسی سریع به پست با URL",
    color: "from-emerald-500 to-teal-500",
  },
  {
    table: "Post",
    field: "authorId",
    type: "Index",
    reason: "واکشی پست‌های هر کاربر",
    color: "from-emerald-500 to-teal-500",
  },
  {
    table: "Post",
    field: "published",
    type: "Index",
    reason: "فیلتر پست‌های منتشر شده",
    color: "from-emerald-500 to-teal-500",
  },
  {
    table: "Tag",
    field: "name",
    type: "Unique",
    reason: "جلوگیری از تگ تکراری",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    table: "Tag",
    field: "slug",
    type: "Unique",
    reason: "URL friendly",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    table: "Setting",
    field: "key",
    type: "Unique",
    reason: "یکتایی کلید تنظیمات",
    color: "from-slate-500 to-slate-700",
  },
];

const tips = [
  "روی فیلدهایی که در WHERE زیاد استفاده می‌شن Index بساز",
  "روی Foreign Keyها حتماً Index بذار",
  "Index سرعت خواندن رو بالا می‌بره ولی نوشتن رو کندتر می‌کنه",
  "برای کوئری‌های ترکیبی از Index ترکیبی استفاده کن",
  "با EXPLAIN QUERY PLAN کارایی کوئری‌ها رو بررسی کن",
];

export default function IndexesPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "کل Indexها", value: indexes.length },
          {
            label: "Unique",
            value: indexes.filter((i) => i.type === "Unique").length,
          },
          {
            label: "معمولی",
            value: indexes.filter((i) => i.type === "Index").length,
          },
          { label: "جدول‌ها", value: new Set(indexes.map((i) => i.table)).size },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {s.value.toLocaleString("fa-IR")}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 p-5 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            لیست Indexها
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {indexes.map((idx, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-3 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <span
                className={`rounded-md bg-gradient-to-br ${idx.color} px-2.5 py-1 text-[10px] font-bold text-white`}
              >
                {idx.table}
              </span>
              <code className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                {idx.field}
              </code>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  idx.type === "Unique"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {idx.type}
              </span>
              <span className="flex-1 text-xs text-gray-500 dark:text-gray-400">
                {idx.reason}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          نکات بهینه‌سازی
        </h2>
        <ul className="space-y-2">
          {tips.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-900/20">
        <h3 className="mb-3 font-mono text-sm font-bold text-amber-800 dark:text-amber-300">
          نمونه تعریف Index در Prisma
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
          <code dir="ltr" className="block text-left">
{`model User {
  id    String @id
  email String @unique   // ← Unique Index
  role  Role

  @@index([role])        // ← Index ساده
  @@index([email, role]) // ← Index ترکیبی
}`}
          </code>
        </pre>
      </section>
    </div>
  );
}