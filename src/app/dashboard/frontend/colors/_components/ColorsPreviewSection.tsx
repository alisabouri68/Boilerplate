"use client";

import { useColorsStore, selectPrimary } from "@/lib/design-system/colors-store";

export default function ColorsPreviewSection() {
  const colors = useColorsStore((s) => s.semanticColors);
  const primary = useColorsStore(selectPrimary);

  const activeColors = colors.filter((c) => c.active);
  const find = (n: string) =>
    activeColors.find((c) => c.name.toLowerCase() === n.toLowerCase());

  const list = [
    find("Primary"),
    find("Success"),
    find("Warning"),
    find("Danger"),
    find("Info"),
    find("Neutral"),
  ].filter(Boolean) as typeof activeColors;

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          هیچ رنگ معنایی فعالی نیست. از تب «رنگ‌های معنایی» فعال کن.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-base font-bold text-gray-900 dark:text-white">
        پیش‌نمایش کامپوننت‌ها
        <span className="ms-2 text-xs font-normal text-gray-500 dark:text-gray-400">
          ({list.length} رنگ فعال)
        </span>
      </h2>

      {/* دکمه‌ها */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">دکمه‌ها</h3>
        <div className="flex flex-wrap gap-3">
          {list.map((c) => (
            <button
              key={c.id}
              className="rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: c.hex, color: c.textHex }}
            >
              {c.name}
            </button>
          ))}
          {primary && (
            <button
              className="rounded-lg border px-4 py-2 text-sm font-semibold"
              style={{
                color: primary.hex,
                borderColor: primary.hex + "66",
                backgroundColor: primary.hex + "10",
              }}
            >
              Outline
            </button>
          )}
        </div>
      </div>

      {/* نشان‌ها */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">نشان‌ها</h3>
        <div className="flex flex-wrap gap-2">
          {list.map((c) => (
            <span
              key={c.id}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: c.hex + "22", color: c.hex }}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* هشدارها */}
      <div className="space-y-3">
        {list.slice(1, 5).map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-3 rounded-xl border p-4 text-sm"
            style={{
              backgroundColor: c.hex + "11",
              borderColor: c.hex + "55",
              color: c.hex,
            }}
          >
            <span
              className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: c.hex }}
            />
            <div>
              <div className="font-bold">{c.name}</div>
              <div className="text-xs opacity-90">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* کارت */}
      {primary && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="h-32" style={{ backgroundColor: primary.hex }} />
          <div className="space-y-2 p-5">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">عنوان کارت</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              نمونه‌ای از کارت با استفاده از رنگ اصلی.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                className="rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: primary.hex, color: primary.textHex }}
              >
                اقدام اصلی
              </button>
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-300">
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}