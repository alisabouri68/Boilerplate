import { readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

type Migration = {
  name: string;
  folder: string;
  createdAt: Date | null;
  hasSql: boolean;
};

function getMigrations(): Migration[] {
  const migrationsDir = join(process.cwd(), "prisma", "migrations");

  if (!existsSync(migrationsDir)) {
    return [];
  }

  const items = readdirSync(migrationsDir).filter((item) => {
    const full = join(migrationsDir, item);
    return statSync(full).isDirectory();
  });

  return items.map((name) => {
    const folder = join(migrationsDir, name);
    const sqlPath = join(folder, "migration.sql");
    return {
      name,
      folder: `prisma/migrations/${name}`,
      createdAt: statSync(folder).birthtime,
      hasSql: existsSync(sqlPath),
    };
  });
}

export default function MigrationsPage() {
  const migrations = getMigrations();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            تعداد Migration
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {migrations.length.toLocaleString("fa-IR")}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            آخرین Migration
          </p>
          <p className="mt-1 truncate text-sm font-bold text-gray-900 dark:text-white">
            {migrations[migrations.length - 1]?.name ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            وضعیت
          </p>
          <p className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {migrations.length > 0 ? "همگام ✓" : "بدون Migration"}
          </p>
        </div>
      </div>

      {migrations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center dark:border-gray-700 dark:bg-gray-900/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            هنوز Migration ای ساخته نشده. دستور زیر رو اجرا کن:
          </p>
          <code className="mt-3 inline-block rounded bg-gray-900 px-4 py-2 font-mono text-xs text-emerald-400">
            npx prisma migrate dev --name init
          </code>
        </div>
      ) : (
        <div className="space-y-3">
          {[...migrations].reverse().map((m, i) => (
            <div
              key={m.name}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 text-xs font-bold text-white">
                {migrations.length - i}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-mono text-sm font-semibold text-gray-900 dark:text-white">
                  {m.name}
                </div>
                <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {m.folder}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {m.hasSql && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    SQL ✓
                  </span>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {m.createdAt.toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          دستورات پرکاربرد
        </h2>
        <div className="space-y-2">
          {[
            { cmd: "npx prisma migrate dev --name <name>", desc: "ساخت و اجرای Migration" },
            { cmd: "npx prisma migrate deploy", desc: "اجرای Migration در Production" },
            { cmd: "npx prisma migrate status", desc: "بررسی وضعیت Migration" },
            { cmd: "npx prisma migrate reset", desc: "پاک و از صفر شروع" },
            { cmd: "npx prisma migrate resolve", desc: "حل تعارض Migration" },
          ].map((c) => (
            <div
              key={c.cmd}
              className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 md:flex-row md:items-center dark:bg-gray-800/50"
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
    </div>
  );
}