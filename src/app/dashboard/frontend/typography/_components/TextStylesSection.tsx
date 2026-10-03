"use client";

import { useTypography, useTypographyActions } from "@/lib/design-system/typography-hooks";
import { resolveTextStyle } from "@/lib/design-system/typography-utils";
import {
  HiPlus,
  HiTrash,
  HiDuplicate,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";

export default function TextStylesSection() {
  const system = useTypography();
  const {
    addTextStyle,
    updateTextStyle,
    removeTextStyle,
    duplicateTextStyle,
    toggleTextStyle,
  } = useTypographyActions();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          استایل‌های متنی (کامپوزیت)
        </h3>
        <button
          onClick={addTextStyle}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> استایل
        </button>
      </div>

      <div className="space-y-2">
        {system.textStyles.map((s) => {
          const r = resolveTextStyle(s, system);
          return (
            <div
              key={s.id}
              className={`rounded-xl border bg-white p-3 dark:bg-gray-900 ${
                s.active
                  ? "border-gray-200 dark:border-gray-800"
                  : "border-dashed border-gray-300 opacity-60 dark:border-gray-700"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => toggleTextStyle(s.id)}
                  className={`rounded-lg p-1.5 ${
                    s.active
                      ? "text-green-600 hover:bg-green-50 dark:text-green-400"
                      : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {s.active ? <HiEye className="h-4 w-4" /> : <HiEyeOff className="h-4 w-4" />}
                </button>

                <input
                  value={s.name}
                  onChange={(e) => updateTextStyle(s.id, { name: e.target.value })}
                  className="w-24 rounded border border-gray-200 px-2 py-1 font-mono text-xs font-semibold dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />

                <Select
                  label="سایز"
                  value={s.fontSizeId}
                  options={system.fontSizes.map((x) => ({ id: x.id, label: x.name }))}
                  onChange={(v) => updateTextStyle(s.id, { fontSizeId: v })}
                />
                <Select
                  label="وزن"
                  value={s.fontWeightId}
                  options={system.fontWeights.map((x) => ({ id: x.id, label: x.name }))}
                  onChange={(v) => updateTextStyle(s.id, { fontWeightId: v })}
                />
                <Select
                  label="line"
                  value={s.lineHeightId}
                  options={system.lineHeights.map((x) => ({ id: x.id, label: x.name }))}
                  onChange={(v) => updateTextStyle(s.id, { lineHeightId: v })}
                />
                <Select
                  label="family"
                  value={s.fontFamilyId ?? ""}
                  options={[
                    { id: "", label: "پیش‌فرض" },
                    ...system.fontFamilies.map((x) => ({ id: x.id, label: x.name })),
                  ]}
                  onChange={(v) =>
                    updateTextStyle(s.id, { fontFamilyId: v || undefined })
                  }
                />

                <div className="ms-auto flex items-center gap-0.5">
                  <button
                    onClick={() => duplicateTextStyle(s.id)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <HiDuplicate className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeTextStyle(s.id)}
                    className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* پیش‌نمایش */}
              {r && (
                <p
                  className="mt-3 text-gray-900 dark:text-white"
                  style={{
                    fontSize: `${r.fontSize}px`,
                    fontWeight: r.fontWeight,
                    lineHeight: r.lineHeight,
                    letterSpacing: r.letterSpacing,
                    fontFamily: r.fontFamily,
                  }}
                  dir="rtl"
                >
                  این نمونه‌ای از استایل {s.name} است — {r.fontSize}px ·{" "}
                  {r.fontWeight} · {r.lineHeight}
                </p>
              )}

              {r && (
                <div className="mt-2 flex flex-wrap gap-2 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                  <span>{r.fontSizeRem}rem</span>
                  <span>·</span>
                  <span>w{r.fontWeight}</span>
                  <span>·</span>
                  <span>lh {r.lineHeight}</span>
                  {r.letterSpacing !== "0" && (
                    <>
                      <span>·</span>
                      <span>ls {r.letterSpacing}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Select کوچک ---------------- */

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-0.5 text-[10px] dark:border-gray-700">
      <span className="text-gray-400 dark:text-gray-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[10px] text-gray-800 outline-none dark:text-gray-200"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}