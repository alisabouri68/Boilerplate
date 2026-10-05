import Link from "next/link";
import {
  HiColorSwatch,
  HiLightningBolt,
  HiCode,
  HiCheckCircle,
  HiArrowLeft,
  HiExternalLink,
  HiBookOpen,
  HiBeaker,
} from "react-icons/hi";

export default function TypographyDocs() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-white/20 p-3 backdrop-blur">
            <HiColorSwatch className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black">مستندات تایپوگرافی</h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-50">
              سیستم کامل تایپوگرافی برای فارسی و لاتین — از انتخاب فونت تا
              خروجی گرفتن کد.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/dashboard/design-system/typography"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow transition hover:bg-blue-50"
              >
                <HiBeaker className="h-4 w-4" />
                باز کردن ابزار زنده
                <HiExternalLink className="h-3 w-3" />
              </Link>
              <Link
                href="#quick-start"
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
              >
                <HiBookOpen className="h-4 w-4" />
                شروع مطالعه
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
          فهرست مطالب
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { href: "#what-is", label: "چیست؟" },
            { href: "#features", label: "ویژگی‌ها" },
            { href: "#quick-start", label: "شروع سریع" },
            { href: "#concepts", label: "مفاهیم پایه" },
            { href: "#api", label: "API" },
            { href: "#exporters", label: "خروجی‌ها" },
            { href: "#a11y", label: "دسترس‌پذیری" },
            { href: "#faq", label: "سوالات" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <Section id="what-is" title="تایپوگرافی چیست؟">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          ماژول تایپوگرافی، یک <strong>آزمایشگاه کامل</strong> برای طراحی،
          تست و خروجی گرفتن سیستم تایپوگرافی است.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { title: "طراحی", desc: "فونت، مقیاس، وزن، فاصله‌ها", tone: "from-blue-500 to-cyan-500" },
            { title: "پیش‌نمایش", desc: "زنده، ایزوله، چند حالته", tone: "from-violet-500 to-purple-500" },
            { title: "خروجی", desc: "۸ فرمت، آماده استفاده", tone: "from-emerald-500 to-teal-500" },
          ].map((c) => (
            <div
              key={c.title}
              className={`rounded-xl bg-gradient-to-br ${c.tone} p-4 text-white`}
            >
              <h4 className="text-sm font-bold">{c.title}</h4>
              <p className="mt-1 text-[11px] opacity-90">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="features" title="ویژگی‌ها">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              title: "مدیریت فونت",
              items: ["آپلود فونت محلی", "ذخیره در IndexedDB", "جستجوی ۵۰+ Google Font", "Variable Fonts"],
              icon: HiColorSwatch,
              tone: "from-blue-500 to-indigo-600",
            },
            {
              title: "مقیاس و توکن",
              items: ["Modular Scale", "تولید خودکار", "همگام‌سازی px ↔ rem", "Fluid Scale"],
              icon: HiLightningBolt,
              tone: "from-amber-500 to-orange-600",
            },
            {
              title: "خروجی چندگانه",
              items: ["CSS Variables", "Tailwind Config", "W3C Design Tokens", "Figma / TS / React"],
              icon: HiCode,
              tone: "from-emerald-500 to-teal-600",
            },
            {
              title: "دسترس‌پذیری",
              items: ["WCAG 2.1", "Contrast Checker", "Audit سایز", "هشدار هوشمند"],
              icon: HiCheckCircle,
              tone: "from-pink-500 to-rose-600",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${f.tone} text-white shadow`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                  {f.title}
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {f.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-[11px] text-gray-600 dark:text-gray-400"
                    >
                      <HiCheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="quick-start" title="شروع سریع">
        <div className="space-y-3">
          {[
            { n: 1, title: "فونت رو انتخاب کن", desc: "از تب «فونت‌ها»، Google Fonts رو باز کن یا آپلود کن." },
            { n: 2, title: "مقیاس سایز رو تنظیم کن", desc: "base و ratio رو انتخاب و «اعمال» بزن." },
            { n: 3, title: "استایل‌ها رو بساز", desc: "h1، body، caption رو تعریف کن." },
            { n: 4, title: "خروجی بگیر", desc: "از تب «خروجی کد»، فرمت موردنظر رو کپی کن." },
          ].map((s) => (
            <div
              key={s.n}
              className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {s.n}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {s.title}
                </h4>
                <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="concepts" title="مفاهیم پایه">
        <div className="space-y-3">
          {[
            { term: "Font Family", def: "یک فونت با stack کامل مثل Vazirmatn یا Estedad." },
            { term: "Font Size", def: "مقیاس سایز مثل xs، sm، base، lg و..." },
            { term: "Font Weight", def: "وزن فونت (۱۰۰ تا ۹۰۰) مثل regular، medium، bold." },
            { term: "Line Height", def: "ارتفاع خط. برای فارسی 1.6 تا 1.8 توصیه می‌شود." },
            { term: "Letter Spacing", def: "فاصله بین حروف." },
            { term: "Text Style", def: "ترکیب کامپوزیت از سایز + وزن + line-height + family." },
            { term: "Preset", def: "سیستم کامل ذخیره‌شده. می‌تونی چند تا داشته باشی." },
          ].map((c) => (
            <div
              key={c.term}
              className="grid grid-cols-1 gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-3 sm:grid-cols-[140px_1fr] dark:border-gray-800 dark:bg-gray-900/50"
            >
              <code className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                {c.term}
              </code>
              <p className="text-xs text-gray-700 dark:text-gray-300">{c.def}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="api" title="API Reference">
        <div className="space-y-4">
          <ApiBlock title="useTypography()" desc="دسترسی به state فعلی">
{`const { fontFamilies, fontSizes, textStyles } = useTypography();`}
          </ApiBlock>
          <ApiBlock title="useTypographyActions()" desc="همه اکشن‌ها">
{`const { addFontFamily, updateFontFamily } = useTypographyActions();`}
          </ApiBlock>
          <ApiBlock title="resolveTextStyle(style, system)" desc="حل یک استایل">
{`const resolved = resolveTextStyle(style, system);`}
          </ApiBlock>
          <ApiBlock title="resolveAllStyles(system)" desc="حل همه استایل‌ها">
{`const all = resolveAllStyles(system);`}
          </ApiBlock>
        </div>
      </Section>

      <Section id="exporters" title="خروجی‌ها">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { name: "CSS Variables", desc: "برای CSS خالص", ext: "css" },
            { name: "Tailwind Config", desc: "برای Tailwind v3/v4", ext: "ts" },
            { name: "Design Tokens", desc: "فرمت W3C", ext: "json" },
            { name: "Figma Tokens", desc: "برای Figma", ext: "json" },
            { name: "TypeScript", desc: "type-safe names", ext: "ts" },
            { name: "React Component", desc: "کامپوننت Text", ext: "tsx" },
            { name: "Google Fonts", desc: "لینک HTML", ext: "html" },
            { name: "PNG / PDF", desc: "خروجی تصویری", ext: "img" },
          ].map((e) => (
            <div
              key={e.name}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">
                  {e.name}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                  {e.desc}
                </div>
              </div>
              <code className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                .{e.ext}
              </code>
            </div>
          ))}
        </div>
      </Section>

      <Section id="a11y" title="دسترس‌پذیری">
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="text-xs leading-relaxed text-blue-900 dark:text-blue-200">
            این ابزار به‌صورت خودکار سیستم شما را با استانداردهای{" "}
            <strong>WCAG 2.1</strong> بررسی می‌کند.
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "سایز پایه کمتر از 16px → هشدار",
              "line-height کمتر از 1.5 برای body → هشدار",
              "کنتراست کمتر از 4.5:1 → خطا",
              "طول خط بیش از ۷۵ کاراکتر → پیشنهاد",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs text-blue-800 dark:text-blue-300"
              >
                <HiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="faq" title="سوالات متداول">
        <div className="space-y-3">
          {[
            { q: "چطور فونت محلی آپلود کنم؟", a: "تب «فونت‌ها» → «آپلود» → انتخاب فایل. فونت در IndexedDB ذخیره می‌شود." },
            { q: "خروجی Tailwind رو چطور استفاده کنم؟", a: "تب «خروجی کد» → Tailwind → کپی → جایگزین tailwind.config.ts کن." },
            { q: "چطور با همکارم به اشتراک بذارم؟", a: "دکمه «اشتراک لینک». URL کپی می‌شود." },
            { q: "چرا فونتم لود نمی‌شه؟", a: "مطمئن شو فونت فعاله. برای Google Fonts، اینترنت لازمه." },
            { q: "چطور preset سفارشی بسازم؟", a: "تب «Preset های من» → «ذخیره سیستم فعلی»." },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-gray-200 bg-white p-4 transition dark:border-gray-800 dark:bg-gray-900"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white">
                <span className="me-2 text-blue-600 dark:text-blue-400">؟</span>
                {f.q}
              </summary>
              <p className="mt-2 ps-6 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 dark:border-violet-900 dark:from-violet-950/30 dark:to-fuchsia-950/30">
        <h3 className="text-base font-bold text-violet-900 dark:text-violet-200">
          آماده‌ای شروع کنی؟ 🚀
        </h3>
        <p className="mt-1 text-xs text-violet-700 dark:text-violet-300">
          برو به ابزار زنده و اولین سیستم تایپوگرافیت رو بساز.
        </p>
        <Link
          href="/dashboard/design-system/typography"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-violet-700"
        >
          باز کردن ابزار
          <HiArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold text-gray-900 dark:border-gray-800 dark:text-white">
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}

function ApiBlock({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/50">
        <code className="text-xs font-bold text-gray-900 dark:text-white">
          {title}
        </code>
        <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>
      <pre className="overflow-x-auto bg-gray-950 p-3 text-[11px] leading-relaxed text-gray-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}
