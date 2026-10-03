"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useThemeStore } from "@/lib/design-system/theme-store";
import ThemeTokenEditor from "../../../colors/_components/ThemeTokenEditor";
import ThemeLivePreview from "../../../colors/_components/ThemeLivePreview";
import EditableThemeName from "../../../colors/_components/EditableThemeName";
import { HiArrowRight } from "react-icons/hi";

export default function ThemeEditPage() {
  const params = useParams();
  const themeId = params.themeId as string;

  const theme = useThemeStore((s) => s.themes.find((t) => t.id === themeId));
  const setActive = useThemeStore((s) => s.setActive);
  const activeId = useThemeStore((s) => s.activeThemeId);

  // بعد از همه هوک‌ها
  if (!theme) return notFound();

  const isActive = activeId === theme.id;

  return (
    <div className="space-y-4">
      {/* ---------------- هدر ---------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        {/* سمت راست: دکمه بازگشت + ایموجی + نام */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/frontend/theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
            title="بازگشت به لیست تم‌ها"
          >
            <HiArrowRight className="h-4 w-4" />
          </Link>

          <span className="text-2xl">{theme.emoji}</span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {/* نام تم — builtin قفل، سفارشی قابل ویرایش */}
              <EditableThemeName
                themeId={theme.id}
                name={theme.name}
                builtin={theme.builtin}
              />

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  theme.mode === "dark"
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                    : theme.mode === "light"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {theme.mode === "dark"
                  ? "تاریک"
                  : theme.mode === "light"
                  ? "روشن"
                  : "سفارشی"}
              </span>

              {theme.builtin && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  پیش‌فرض
                </span>
              )}
            </div>

            <p className="mt-0.5 font-mono text-[10px] text-gray-400 dark:text-gray-500">
              {theme.id}
            </p>
          </div>
        </div>

        {/* سمت چپ: دکمه فعال‌سازی */}
        <button
          type="button"
          onClick={() => setActive(theme.id)}
          disabled={isActive}
          className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
        >
          {isActive ? "تم فعال پروژه" : "فعال‌سازی برای پروژه"}
        </button>
      </div>

      {/* ---------------- چیدمان دو ستونه ---------------- */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ویرایشگر */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <ThemeTokenEditor themeId={theme.id} />
        </div>

        {/* پیش‌نمایش چسبان */}
        <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <ThemeLivePreview themeId={theme.id} />
          </div>
        </div>
      </div>
    </div>
  );
}