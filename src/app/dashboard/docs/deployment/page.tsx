const platforms = [
  {
    name: "Vercel",
    desc: "سریع‌ترین راه برای Next.js",
    icon: "▲",
    color: "from-black to-gray-700",
    steps: [
      "پروژه را روی GitHub push کن",
      "به vercel.com برو و Import کن",
      "متغیرهای محیطی را ست کن",
      "Deploy بزن — تمام!",
    ],
  },
  {
    name: "Docker",
    desc: "استقرار روی هر سروری",
    icon: "🐳",
    color: "from-blue-600 to-cyan-600",
    steps: [
      "Dockerfile بنویس",
      "docker build -t my-app .",
      "docker run -p 3000:3000 my-app",
      "پشت Nginx قرار بده",
    ],
  },
  {
    name: "VPS (Ubuntu)",
    desc: "کنترل کامل روی سرور",
    icon: "🖥️",
    color: "from-orange-600 to-red-600",
    steps: [
      "Node.js و PM2 نصب کن",
      "کلون و build کن",
      "pm2 start npm -- start",
      "Nginx به‌عنوان Reverse Proxy",
    ],
  },
];

export default function DeploymentPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-pink-200 bg-pink-50 p-4 text-sm text-pink-800 dark:border-pink-900 dark:bg-pink-900/20 dark:text-pink-300">
        🚀 سه راه اصلی برای استقرار پروژه، بر اساس نیاز و مقیاس.
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {platforms.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-2xl text-white shadow-lg`}
            >
              {p.icon}
            </div>
            <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
              {p.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {p.desc}
            </p>
            <ul className="mt-4 space-y-2">
              {p.steps.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[9px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dockerfile نمونه */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 font-mono text-base font-bold text-gray-900 dark:text-white">
          Dockerfile نمونه
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
          <code dir="ltr" className="block text-left">
{`FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]`}
          </code>
        </pre>
      </section>

      {/* Docker Compose */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 font-mono text-base font-bold text-gray-900 dark:text-white">
          docker-compose.yml
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
          <code dir="ltr" className="block text-left">
{`version: "3.9"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}
          </code>
        </pre>
      </section>

      {/* چک‌لیست */}
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-900/20">
        <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
          ✅ چک‌لیست قبل از Deploy
        </h3>
        <ul className="mt-3 space-y-2 text-xs text-emerald-700 dark:text-emerald-400">
          {[
            "متغیرهای محیطی Production تنظیم شده",
            "Migration روی دیتابیس اجرا شده (npx prisma migrate deploy)",
            "NEXTAUTH_SECRET جدید تولید شده",
            "دیتابیس بکاپ گرفته شده",
            "npm run build بدون خطا اجرا می‌شود",
            "تست‌های E2E اجرا شده",
          ].map((i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {i}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}