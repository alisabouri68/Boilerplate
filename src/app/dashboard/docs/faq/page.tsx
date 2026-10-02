"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    q: "چرا از Flowbite React استفاده کردیم؟",
    a: "Flowbite React مجموعه‌ای از کامپوننت‌های آماده، RTL-friendly و سازگار با Tailwind است که سرعت توسعه را چند برابر می‌کند.",
  },
  {
    q: "چطور یک صفحه جدید اضافه کنم؟",
    a: "کافیست در پوشه app/ یک پوشه بسازید و داخل آن page.tsx قرار دهید. Next.js App Router به‌صورت خودکار مسیر را می‌سازد.",
  },
  {
    q: "چرا از Prisma استفاده می‌کنیم؟",
    a: "Prisma type-safety کامل می‌دهد، migration خودکار دارد و کار با دیتابیس را بسیار لذت‌بخش می‌کند.",
  },
  {
    q: "چطور به PostgreSQL مهاجرت کنم؟",
    a: "در schema.prisma مقدار provider را به postgresql تغییر دهید، DATABASE_URL را آپدیت کنید و migrate dev را اجرا کنید.",
  },
  {
    q: "آیا پروژه RTL را پشتیبانی می‌کند؟",
    a: "بله، به‌طور کامل. از فونت وزیرمتن و ساختار dir=rtl استفاده شده و همه‌ی کامپوننت‌ها با آن سازگارند.",
  },
  {
    q: "چطور احراز هویت اضافه کنم؟",
    a: "پیشنهاد می‌کنیم از NextAuth.js (Auth.js) استفاده کنید. با Prisma Adapter و چند خط کد راه می‌افتد.",
  },
  {
    q: "چطور در حالت دارک تست کنم؟",
    a: "روی دکمه‌ی Theme Toggle در هدر کلیک کنید. تنظیمات در localStorage ذخیره می‌شود.",
  },
  {
    q: "چطور API جدید بسازم؟",
    a: "در پوشه‌ی app/api/ یک پوشه بسازید و فایل route.ts با توابع GET, POST, ... ایجاد کنید.",
  },
  {
    q: "چطور پروژه را روی Vercel Deploy کنم؟",
    a: "پروژه را روی GitHub push کنید، در Vercel وارد شوید، Import کنید، متغیرهای محیطی را ست کنید و Deploy بزنید.",
  },
  {
    q: "چطور به توسعه کمک کنم؟",
    a: "پروژه را fork کنید، یک branch جدید بسازید، تغییرات را با پیام clear commit کنید و Pull Request بفرستید.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-800 dark:border-indigo-900 dark:bg-indigo-900/20 dark:text-indigo-300">
        ❓ پاسخ پرتکرارترین سوالات درباره‌ی پروژه. اگر جواب سوالت نبود، در بخش
        پشتیبانی بپرس.
      </div>

      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-right transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {f.q}
              </span>
              <HiChevronDown
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:text-gray-400">
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}