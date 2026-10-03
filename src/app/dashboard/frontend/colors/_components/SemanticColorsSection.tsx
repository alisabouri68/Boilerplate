"use client";

import { useMemo, useState } from "react";
import { useColorsStore } from "@/lib/design-system/colors-store";
import { useSemanticActions, useUI } from "@/lib/design-system/colors-hooks";
import {
  useThemeStore,
  selectActiveTheme,
} from "@/lib/design-system/theme-store";
import { useThemeTokens } from "@/lib/design-system/use-theme-tokens";
import { STORE_TO_TOKEN } from "@/lib/design-system/semantic-tokens";
import SemanticCard from "./SemanticCard";
import ConfirmDialog from "./ConfirmDialog";
import { HiRefresh } from "react-icons/hi";
import { useAllTokens } from "@/lib/design-system/use-all-tokens";

export default function SemanticColorsSection() {
  const colors = useColorsStore((s) => s.semanticColors);
  const { add, bulkToggle, bulkDelete, syncFromTheme } = useSemanticActions();
  const { selectedSemanticIds, clearSelection } = useUI();
  const [confirmBulk, setConfirmBulk] = useState(false);

  const themes = useThemeStore((s) => s.themes);
  const activeTheme = useThemeStore(selectActiveTheme);
  const setActiveTheme = useThemeStore((s) => s.setActive);

  const { storeToToken } = useAllTokens();
const { values, missing } = useThemeTokens();
  const activeCount = colors.filter((c) => c.active).length;
  const hasSelection = selectedSemanticIds.length > 0;

  const resolveTokenOf = (c: (typeof colors)[number]) => {
    // اول tokenRef صریح، بعد نگاشت پویا
    const tokenId = c.tokenRef ?? storeToToken[c.name.trim().toLowerCase()];
    if (!tokenId || !values[tokenId]) return null;
    return {
      tokenId,
      hex: values[tokenId],
      textHex: values["text-inverse"],
    };
  };

  /* ---------------- موارد قابل به‌روزرسانی ---------------- */
  const themeUpdates = useMemo(() => {
    return colors
      .map((c) => {
        const r = resolveTokenOf(c);
        if (!r) return null;
        if (
          c.hex.toLowerCase() === r.hex.toLowerCase() &&
          c.textHex.toLowerCase() === r.textHex.toLowerCase()
        ) {
          return null;
        }
        return {
          id: c.id,
          hex: r.hex,
          textHex: r.textHex,
          tokenRef: r.tokenId,
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      hex: string;
      textHex: string;
      tokenRef: string;
    }>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, values]);

  const matchedCount = colors.filter((c) => resolveTokenOf(c)).length;
  const unmappedCount = colors.length - matchedCount;

  const handleSync = () => {
    if (!themeUpdates.length) return;
    syncFromTheme(themeUpdates);
  };

  return (
    <section className="space-y-6">
      {/* ---------------- پنل تم فعال ---------------- */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              تغذیه از تم فعال
            </h3>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              رنگ‌های معنایی متصل را با توکن‌های تم فعال همگام کن.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex flex-wrap items-center rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-950">
              {themes.map((th) => {
                const isActive = th.id === activeTheme.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setActiveTheme(th.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                        : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    {th.emoji && <span className="me-1">{th.emoji}</span>}
                    {th.name}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSync}
              disabled={themeUpdates.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
              title={
                themeUpdates.length === 0
                  ? "همه رنگ‌های متصل، همگام هستند"
                  : `${themeUpdates.length} رنگ به‌روزرسانی می‌شود`
              }
            >
              <HiRefresh className="h-4 w-4" />
              همگام‌سازی
              {themeUpdates.length > 0 && (
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
                  {themeUpdates.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* وضعیت نگاشت */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            {matchedCount} از {colors.length} رنگ به توکن‌های «
            {activeTheme.name}» متصل‌اند.
          </span>
          {themeUpdates.length > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              {themeUpdates.length} مورد قابل همگام‌سازی
            </span>
          )}
          {unmappedCount > 0 && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              {unmappedCount} بدون اتصال
            </span>
          )}
          {missing.length > 0 && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-700 dark:bg-red-950 dark:text-red-400">
              {missing.length} توکن تعریف‌نشده در تم
            </span>
          )}
        </div>
      </div>

      {/* ---------------- نوار اکشن ---------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          رنگ‌های معنایی
          <span className="ms-2 text-xs font-normal text-gray-500 dark:text-gray-400">
            ({activeCount} از {colors.length} فعال)
          </span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {hasSelection && (
            <>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selectedSemanticIds.length} انتخاب شده
              </span>
              <button
                onClick={() => bulkToggle(true)}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                فعال
              </button>
              <button
                onClick={() => bulkToggle(false)}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                غیرفعال
              </button>
              <button
                onClick={() => setConfirmBulk(true)}
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                حذف
              </button>
              <button
                onClick={clearSelection}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                لغو
              </button>
            </>
          )}

          <button
            onClick={add}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + رنگ معنایی
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((c) => (
          <SemanticCard key={c.id} color={c} activeTokens={values} />
        ))}
      </div>

      <ConfirmDialog
        open={confirmBulk}
        title="حذف گروهی"
        message={`آیا از حذف ${selectedSemanticIds.length} رنگ معنایی مطمئنی؟`}
        danger
        onConfirm={() => {
          bulkDelete();
          setConfirmBulk(false);
        }}
        onCancel={() => setConfirmBulk(false)}
      />
    </section>
  );
}
