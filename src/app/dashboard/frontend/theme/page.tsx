"use client";

import Link from "next/link";
import { useThemeStore, selectActiveTheme } from "@/lib/design-system/theme-store";
import { useThemeTokens } from "@/lib/design-system/use-theme-tokens";
import ThemeLivePreview from "../colors/_components/ThemeLivePreview";
import { HiPencil, HiCheckCircle, HiPlus } from "react-icons/hi";

export default function ThemePage() {
  const themes = useThemeStore((s) => s.themes);
  const active = useThemeStore(selectActiveTheme);
  const setActive = useThemeStore((s) => s.setActive);
  const addTheme = useThemeStore((s) => s.addTheme);
  const { values } = useThemeTokens();

  const handleAddBlank = () => {
    const id = addTheme({
      name: `تم ${themes.length + 1}`,
      mode: "custom",
      emoji: "🎨",
      tokens: active.tokens,
    });
    setActive(id);
  };

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            تم‌های پروژه
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            این تم‌ها برای پروژه‌هایی هستند که با دیزاین‌سیستم می‌سازی. هر تم
            مجموعه‌ای از مقادیر توکن‌های معنایی را تعریف می‌کند.
          </p>
        </div>
        <button
          onClick={handleAddBlank}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <HiPlus className="h-4 w-4" />
          تم جدید
        </button>
      </div>

      {/* لیست تم‌ها */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => {
          const isActive = t.id === active.id;
          // پیش‌نمایش مینیاتوری از رنگ‌های توکن‌های حل‌شده همان تم
          const isThisActive = isActive;

          return (
            <div
              key={t.id}
              className={`overflow-hidden rounded-2xl border bg-white transition dark:bg-gray-900 ${
                isActive
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
              }`}
            >
              {/* نوار رنگ‌ها */}
              <div
                className="flex h-16 items-stretch"
                style={{ background: t.tokens["bg-base"] && "hex" in t.tokens["bg-base"] ? t.tokens["bg-base"].hex : "#fff" }}
              >
                {/* این نوار فقط تزئینی است؛ مقادیر واقعی با useThemeTokens حل می‌شوند */}
              </div>

              <div className="space-y-3 p-4">
                {/* نام تم — قفل */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl">{t.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-bold text-gray-900 dark:text-white">
                          {t.name}
                        </span>
                        {t.builtin && (
                          <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            پیش‌فرض
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">
                        {t.id}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      <HiCheckCircle className="h-3 w-3" />
                      فعال
                    </span>
                  )}
                </div>

                {/* وضعیت */}
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {t.mode === "dark"
                      ? "تاریک"
                      : t.mode === "light"
                      ? "روشن"
                      : "سفارشی"}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {Object.keys(t.tokens).length} توکن تعریف‌شده
                  </span>
                </div>

                {/* اکشن‌ها */}
                <div className="flex items-center gap-2 pt-1">
                  {!isActive && (
                    <button
                      onClick={() => setActive(t.id)}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      فعال‌سازی
                    </button>
                  )}
                  <Link
                    href={`/dashboard/frontend/theme/${t.id}/edit`}
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  >
                    <HiPencil className="h-3.5 w-3.5" />
                    ویرایش توکن‌ها
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* پیش‌نمایش تم فعال */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <ThemeLivePreview />
      </div>
    </div>
  );
}