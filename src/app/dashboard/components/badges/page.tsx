"use client";
import { Badge } from "flowbite-react";
import { HiCheck, HiX, HiClock } from "react-icons/hi";

export default function BadgesPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">رنگ‌ها</h2>
        <div className="flex flex-wrap gap-2">
          {(["info", "success", "warning", "failure", "gray", "blue", "green", "red", "yellow", "indigo", "purple", "pink"] as const).map((c) => (
            <Badge key={c} color={c}>{c}</Badge>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">سایزها</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">با آیکون</h2>
        <div className="flex flex-wrap gap-2">
          <Badge color="success" icon={HiCheck}>فعال</Badge>
          <Badge color="failure" icon={HiX}>غیرفعال</Badge>
          <Badge color="warning" icon={HiClock}>در انتظار</Badge>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Badge سفارشی</h2>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-blue-500 to-indigo-500 px-3 py-1 text-xs font-semibold text-white">
            Premium
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            آنلاین
          </span>
          <span className="relative inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            پیام
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              ۹
            </span>
          </span>
        </div>
      </section>
    </div>
  );
}