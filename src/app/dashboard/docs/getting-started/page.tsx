import Link from "next/link";

export default function GettingStartedPage() {
  const steps = [
    {
      num: 1,
      title: "کلون کردن پروژه",
      desc: "مخزن را روی سیستم خود بیاورید",
      code: `git clone https://github.com/your/repo.git
cd ai-chat`,
    },
    {
      num: 2,
      title: "نصب پکیج‌ها",
      desc: "وابستگی‌ها را نصب کنید",
      code: `npm install`,
    },
    {
      num: 3,
      title: "تنظیم متغیرهای محیطی",
      desc: "فایل .env را از نمونه بسازید",
      code: `cp .env.example .env
# سپس مقادیر را ویرایش کنید`,
    },
    {
      num: 4,
      title: "راه‌اندازی دیتابیس",
      desc: "Migration و Seed را اجرا کنید",
      code: `npx prisma migrate dev
npx prisma db seed`,
    },
    {
      num: 5,
      title: "اجرای پروژه",
      desc: "سرور development را روشن کنید",
      code: `npm run dev`,
    },
    {
      num: 6,
      title: "باز کردن در مرورگر",
      desc: "آدرس زیر را باز کنید",
      code: `http://localhost:3000`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        ⚡ در کمتر از ۵ دقیقه پروژه را روی سیستم خود بالا بیاورید.
      </div>

      <div className="space-y-4">
        {steps.map((s) => (
          <div
            key={s.num}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-base font-black text-white shadow-lg">
                {s.num}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {s.desc}
                </p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-emerald-400">
                  <code dir="ltr" className="block text-left">
                    {s.code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-900/20">
        <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
          ✅ آماده‌اید!
        </h3>
        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
          پروژه روی <span className="font-mono">http://localhost:3000</span>{" "}
          اجرا شده. حالا برو به{" "}
          <Link href="/dashboard" className="underline">
            داشبورد
          </Link>
          .
        </p>
      </div>
    </div>
  );
}