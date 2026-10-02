export default function ContributingPage() {
  const steps = [
    {
      num: 1,
      title: "Fork کردن پروژه",
      desc: "روی دکمه Fork در GitHub کلیک کنید",
    },
    {
      num: 2,
      title: "Clone و Branch",
      desc: "پروژه را لوکال بگیرید و یک branch جدید بسازید",
    },
    {
      num: 3,
      title: "تغییرات",
      desc: "کد را با استانداردهای پروژه بنویسید",
    },
    {
      num: 4,
      title: "Commit",
      desc: "با پیام‌های واضح و معنادار commit کنید",
    },
    {
      num: 5,
      title: "Push و PR",
      desc: "به branch خود push و Pull Request باز کنید",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
        🤝 از مشارکت شما خوشحالیم! این راهنما به شما کمک می‌کند تا سریع و
        استاندارد مشارکت کنید.
      </div>

      {/* مراحل */}
      <section>
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          مراحل مشارکت
        </h2>
        <div className="space-y-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 text-sm font-black text-white">
                {s.num}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* دستورات */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          دستورات گیت
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
          <code dir="ltr" className="block text-left">
{`# 1. Fork و Clone
git clone https://github.com/YOUR_USERNAME/repo.git
cd repo

# 2. Branch جدید
git checkout -b feature/amazing-feature

# 3. تغییرات و commit
git add .
git commit -m "feat: add amazing feature"

# 4. Push
git push origin feature/amazing-feature`}
          </code>
        </pre>
      </section>

      {/* استاندارد commit */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          استاندارد پیام Commit
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          از Convention زیر استفاده می‌کنیم:
        </p>
        <div className="space-y-2">
          {[
            { type: "feat", desc: "ویژگی جدید", example: "feat: add user profile" },
            { type: "fix", desc: "رفع باگ", example: "fix: correct login redirect" },
            { type: "docs", desc: "مستندات", example: "docs: update installation guide" },
            { type: "style", desc: "فرمت‌بندی", example: "style: format components" },
            { type: "refactor", desc: "بازنویسی", example: "refactor: extract auth logic" },
            { type: "test", desc: "تست", example: "test: add user API tests" },
            { type: "chore", desc: "کارهای جانبی", example: "chore: update deps" },
          ].map((c) => (
            <div
              key={c.type}
              className="grid grid-cols-1 gap-2 rounded-lg bg-gray-50 p-3 sm:grid-cols-3 dark:bg-gray-800/50"
            >
              <code className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                {c.type}
              </code>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {c.desc}
              </span>
              <code
                dir="ltr"
                className="font-mono text-[10px] text-gray-500 dark:text-gray-400"
              >
                {c.example}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* قوانین */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
          قوانین کد
        </h2>
        <ul className="space-y-2">
          {[
            "از TypeScript strict استفاده کنید",
            "همه‌ی کامپوننت‌ها باید تایپ داشته باشند",
            "نام فایل‌ها PascalCase برای کامپوننت و kebab-case برای صفحات",
            "کامنت‌های فارسی یا انگلیسی واضح بنویسید",
            "قبل از PR، npm run build را تست کنید",
            "برای هر ویژگی، تست اضافه کنید",
            "از Prettier و ESLint پروژه تبعیت کنید",
          ].map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
                ✓
              </span>
              {r}
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-800 dark:border-cyan-900 dark:bg-cyan-900/20 dark:text-cyan-300">
        💙 <strong>ممنون از مشارکتت!</strong> هر PR توسط تیم بررسی می‌شود و
        بازخورد سازنده دریافت می‌کنی.
      </div>
    </div>
  );
}