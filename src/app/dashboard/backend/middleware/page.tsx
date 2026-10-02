const rules = [
  {
    matcher: "/dashboard/:path*",
    action: "احراز هویت",
    desc: "کاربران واردنشده به /login هدایت می‌شن",
    color: "bg-blue-600",
  },
  {
    matcher: "/api/admin/:path*",
    action: "بررسی نقش",
    desc: "فقط Admin دسترسی دارد",
    color: "bg-purple-600",
  },
  {
    matcher: "/api/:path*",
    action: "Rate Limit",
    desc: "حداکثر ۱۰۰ درخواست در دقیقه",
    color: "bg-amber-500",
  },
  {
    matcher: "/((?!api|_next).*)",
    action: "i18n",
    desc: "تنظیم زبان و Locale",
    color: "bg-emerald-600",
  },
];

const codeExample = `// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // احراز هویت
  if (pathname.startsWith("/dashboard")) {
    const session = await auth();
    if (!session) {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Rate Limiting (نمونه)
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  // ... بررسی Redis

  // هدرهای امنیتی
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};`;

export default function MiddlewarePage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          قوانین Middleware
        </h2>
        <div className="space-y-3">
          {rules.map((r) => (
            <div
              key={r.matcher}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center dark:border-gray-800 dark:bg-gray-900"
            >
              <span
                className={`inline-block w-fit rounded-md ${r.color} px-2 py-0.5 text-[10px] font-bold text-white`}
              >
                {r.action}
              </span>
              <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                {r.matcher}
              </span>
              <span className="flex-1 text-xs text-gray-500 dark:text-gray-400">
                {r.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          پیاده‌سازی
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-gray-100 dark:bg-black">
          <code dir="ltr" className="block text-left">
            {codeExample}
          </code>
        </pre>
      </section>

      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
        💡 <strong>جریان اجرا:</strong> Middleware قبل از هر Route یا API
        اجرا می‌شه. برای بررسی سریع (بدون DB) عالیه، ولی برای منطق سنگین از
        Server Component یا Route استفاده کن.
      </section>
    </div>
  );
}