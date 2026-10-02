import { Progress, Spinner } from "flowbite-react";

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">رنگ‌ها</h2>
        <div className="space-y-4">
          {(["blue", "gray", "dark", "red", "green", "yellow", "indigo", "purple", "pink", "cyan", "teal", "lime"] as const).map((c) => (
            <div key={c}>
              <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">{c}</div>
              <Progress progress={65} color={c} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">سایزها</h2>
        <div className="space-y-4">
          {(["sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s}>
              <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">{s}</div>
              <Progress progress={70} size={s} color="blue" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Spinner</h2>
        <div className="flex flex-wrap items-center gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <div key={s} className="text-center">
              <Spinner size={s} />
              <div className="mt-2 text-xs text-gray-500">{s}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Spinner color="info" />
          <Spinner color="success" />
          <Spinner color="warning" />
          <Spinner color="failure" />
          <Spinner color="purple" />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Progress سفارشی</h2>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>۷۸٪ تکمیل</span>
          <span>۲۲٪ باقی‌مانده</span>
        </div>
      </section>
    </div>
  );
}