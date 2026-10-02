const models = [
  {
    name: "User",
    fields: [
      { name: "id", type: "String @id" },
      { name: "email", type: "String @unique" },
      { name: "name", type: "String" },
      { name: "password", type: "String" },
      { name: "role", type: "Role @default(USER)" },
      { name: "posts", type: "Post[]" },
      { name: "createdAt", type: "DateTime @default(now())" },
    ],
  },
  {
    name: "Post",
    fields: [
      { name: "id", type: "String @id" },
      { name: "title", type: "String" },
      { name: "content", type: "String" },
      { name: "author", type: "User @relation" },
      { name: "authorId", type: "String" },
      { name: "published", type: "Boolean @default(false)" },
    ],
  },
];

const commands = [
  { cmd: "npx prisma generate", desc: "ساخت Client از Schema" },
  { cmd: "npx prisma migrate dev", desc: "اجرای Migration جدید" },
  { cmd: "npx prisma migrate deploy", desc: "اعمال در Production" },
  { cmd: "npx prisma studio", desc: "رابط وب برای مرور داده‌ها" },
  { cmd: "npx prisma db seed", desc: "اجرای Seed" },
];

export default function DatabasePage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          مدل‌های Prisma
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {models.map((m) => (
            <div
              key={m.name}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="mb-3 font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                model {m.name}
              </h3>
              <div className="space-y-1.5">
                {m.fields.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">
                      {f.name}
                    </span>
                    <span className="font-mono text-gray-500 dark:text-gray-400">
                      {f.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          دستورات Prisma
        </h2>
        <div className="space-y-2">
          {commands.map((c) => (
            <div
              key={c.cmd}
              className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 md:flex-row md:items-center dark:border-gray-800 dark:bg-gray-900"
            >
              <code
                dir="ltr"
                className="rounded bg-gray-900 px-3 py-1 font-mono text-xs text-emerald-400"
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

      <section className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
        ⚠️ <strong>هشدار:</strong> هرگز در Production از{" "}
        <span className="font-mono">migrate dev</span> استفاده نکن. همیشه{" "}
        <span className="font-mono">migrate deploy</span>.
      </section>
    </div>
  );
}