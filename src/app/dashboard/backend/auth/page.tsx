const authMethods = [
  {
    title: "Credentials",
    desc: "ورود با ایمیل و رمز عبور",
    icon: "📧",
    features: ["Hash با bcrypt", "Session امن", "Rate Limiting"],
  },
  {
    title: "OAuth",
    desc: "ورود با Google، GitHub و...",
    icon: "🔑",
    features: ["Google", "GitHub", "Discord"],
  },
  {
    title: "Magic Link",
    desc: "ورود بدون رمز عبور",
    icon: "✨",
    features: ["ارسال ایمیل", "انقضای کوتاه", "تک‌بارمصرف"],
  },
];

const sessions = [
  { label: "مدت اعتبار Session", value: "۷ روز" },
  { label: "استراتژی", value: "JWT + Database" },
  { label: "ذخیره‌سازی", value: "HttpOnly Cookie" },
  { label: "رمزنگاری", value: "AES-256" },
];

const codeExample = `// src/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const ok = await compare(credentials.password, user.password);
        return ok ? user : null;
      },
    }),
  ],
});`;

export default function AuthPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          روش‌های احراز هویت
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {authMethods.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-3xl">{m.icon}</div>
              <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white">
                {m.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {m.desc}
              </p>
              <ul className="mt-3 space-y-1">
                {m.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          پیکربندی Session
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {sessions.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {s.label}
              </span>
              <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                {s.value}
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

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
        ⚠️ <strong>هشدار امنیتی:</strong> همیشه رمزها رو با{" "}
        <span className="font-mono">bcrypt</span> یا{" "}
        <span className="font-mono">argon2</span> hash کن. هرگز متن ساده
        ذخیره نکن.
      </section>
    </div>
  );
}