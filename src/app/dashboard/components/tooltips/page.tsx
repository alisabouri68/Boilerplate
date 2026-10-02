"use client";

import { Tooltip, Button } from "flowbite-react";

export default function TooltipsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">موقعیت‌ها</h2>
        <div className="flex flex-wrap gap-4">
          {(["top", "right", "bottom", "left"] as const).map((pos) => (
            <Tooltip key={pos} content={`راهنمای ${pos}`} placement={pos}>
              <Button color="light">{pos}</Button>
            </Tooltip>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">روی متن</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          برای اطلاعات بیشتر روی{" "}
          <Tooltip content="اینجا کلیک کنید تا جزئیات را ببینید">
            <span className="cursor-help border-b border-dotted border-gray-400">
              این متن
            </span>
          </Tooltip>{" "}
          کلیک کنید.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">با استایل دلخواه</h2>
        <Tooltip
          content="این یک tooltip با استایل سفارشی است"
          style="dark"
          placement="top"
        >
          <Button color="purple">هاور کن</Button>
        </Tooltip>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">روی آیکون</h2>
        <div className="flex items-center gap-3">
          <Tooltip content="افزودن">
            <button className="rounded-full bg-blue-500 p-2 text-white">+</button>
          </Tooltip>
          <Tooltip content="ویرایش">
            <button className="rounded-full bg-amber-500 p-2 text-white">✎</button>
          </Tooltip>
          <Tooltip content="حذف">
            <button className="rounded-full bg-red-500 p-2 text-white">×</button>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}