"use client";

import { Alert } from "flowbite-react";
import { HiInformationCircle, HiCheckCircle, HiExclamation, HiXCircle } from "react-icons/hi";

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">انواع Alert</h2>
        <div className="space-y-3">
          <Alert color="info" icon={HiInformationCircle}>
            <span className="font-medium">اطلاع:</span> این یک پیام اطلاعاتی است.
          </Alert>
          <Alert color="success" icon={HiCheckCircle}>
            <span className="font-medium">موفق:</span> عملیات با موفقیت انجام شد.
          </Alert>
          <Alert color="warning" icon={HiExclamation}>
            <span className="font-medium">هشدار:</span> لطفاً اطلاعات را بررسی کنید.
          </Alert>
          <Alert color="failure" icon={HiXCircle}>
            <span className="font-medium">خطا:</span> مشکلی رخ داده است.
          </Alert>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">با عنوان و توضیحات</h2>
        <div className="space-y-3">
          <Alert color="info" icon={HiInformationCircle}>
            <h3 className="font-semibold">اطلاع جدید</h3>
            <p className="text-sm">نسخه جدید پنل منتشر شد. تغییرات را ببینید.</p>
          </Alert>
          <Alert color="success" icon={HiCheckCircle}>
            <h3 className="font-semibold">پرداخت موفق</h3>
            <p className="text-sm">فاکتور شما پرداخت شد و به ایمیل ارسال گردید.</p>
          </Alert>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Alert سفارشی Tailwind</h2>
        <div className="space-y-3">
          <div className="rounded-xl border-r-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="font-semibold text-blue-800 dark:text-blue-300">اطلاع</div>
            <div className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              این یک alert سفارشی با نوار رنگی است.
            </div>
          </div>
          <div className="rounded-xl border-r-4 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <div className="font-semibold text-emerald-800 dark:text-emerald-300">موفق</div>
            <div className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
              عملیات با موفقیت انجام شد.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}