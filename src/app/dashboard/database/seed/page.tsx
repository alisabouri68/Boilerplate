import { prisma } from "@/lib/prisma";
import { HiRefresh, HiDatabase, HiUser, HiDocumentText, HiTag } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function SeedPage() {
  const [userCount, postCount, tagCount, settingCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.tag.count(),
    prisma.setting.count(),
  ]);

  const seedData = [
    {
      name: "کاربران",
      count: userCount,
      icon: HiUser,
      color: "from-blue-500 to-cyan-500",
      examples: ["علی رضایی (ADMIN)", "مریم احمدی (EDITOR)", "رضا کریمی (USER)"],
    },
    {
      name: "پست‌ها",
      count: postCount,
      icon: HiDocumentText,
      color: "from-emerald-500 to-teal-500",
      examples: [
        "شروع کار با Next.js 15",
        "Prisma و TypeScript",
        "React Server Components",
      ],
    },
    {
      name: "تگ‌ها",
      count: tagCount,
      icon: HiTag,
      color: "from-purple-500 to-fuchsia-500",
      examples: ["Next.js", "React", "TypeScript", "Prisma", "Tailwind"],
    },
    {
      name: "تنظیمات",
      count: settingCount,
      icon: HiDatabase,
      color: "from-slate-500 to-slate-700",
      examples: ["site_name", "site_description", "items_per_page"],
    },
  ];

  const seedCode = `// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 شروع seed...");

  // پاک کردن داده‌های قبلی
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();

  // ساخت کاربران با پسورد هش‌شده
  const password = await hash("password123", 10);
  const ali = await prisma.user.create({
    data: {
      email: "ali@example.com",
      name: "علی رضایی",
      password,
      role: "ADMIN",
    },
  });

  // ساخت تگ‌ها و پست‌ها
  // ...

  console.log("✅ Seed کامل شد");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());`;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300">
        🌱 <strong>Seed</strong> اسکریپتی است که داده‌های اولیه دیتابیس رو
        می‌سازد (کاربر ادمین، تنظیمات پیش‌فرض و ...).
      </div>

      {/* وضعیت کنونی */}
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          وضعیت داده‌های فعلی
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {seedData.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {s.count.toLocaleString("fa-IR")}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                  {s.name}
                </p>
                <ul className="mt-2 space-y-1">
                  {s.examples.map((e) => (
                    <li
                      key={e}
                      className="truncate text-[11px] text-gray-500 dark:text-gray-400"
                    >
                      • {e}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* دستورات */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          دستورات Seed
        </h2>
        <div className="space-y-2">
          {[
            { cmd: "npx prisma db seed", desc: "اجرای Seed" },
            { cmd: "npx prisma migrate reset", desc: "Reset + اجرای خودکار Seed" },
            { cmd: "npx prisma db push --force-reset", desc: "پاک کردن کامل دیتابیس" },
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

        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-xs text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
          💡 <strong>نکته:</strong> برای اجرای خودکار Seed موقع Migration،
          این بخش رو به <span className="font-mono">package.json</span> اضافه
          کن:
          <pre className="mt-2 overflow-x-auto rounded bg-gray-900 p-2 text-[10px] text-emerald-400">
{`"prisma": {
  "seed": "tsx prisma/seed.ts"
}`}
          </pre>
        </div>
      </section>

      {/* کد نمونه */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
          <HiRefresh className="h-4 w-4" />
          نمونه کد Seed
        </h2>
        <pre className="overflow-x-auto rounded-2xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {seedCode}
          </code>
        </pre>
      </section>
    </div>
  );
}