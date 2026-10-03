"use client";

import { useTypography, useTypographyActions } from "@/lib/design-system/typography-hooks";
import { HiPlus, HiTrash } from "react-icons/hi";

export default function LineHeightsSection() {
  const { lineHeights } = useTypography();
  const { addLineHeight, updateLineHeight, removeLineHeight } = useTypographyActions();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          ارتفاع خط
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            برای فارسی: ۱.۶ تا ۱.۸ توصیه می‌شود
          </span>
        </h3>
        <button
          onClick={addLineHeight}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> مقدار
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {lineHeights.map((l) => (
          <div
            key={l.id}
            className="space-y-2 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-2">
              <input
                value={l.name}
                onChange={(e) => updateLineHeight(l.id, { name: e.target.value })}
                className="w-24 rounded border border-gray-200 px-2 py-0.5 text-xs font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
              <input
                type="number"
                step="0.05"
                value={l.value}
                onChange={(e) =>
                  updateLineHeight(l.id, { value: Number(e.target.value) || 0 })
                }
                className="w-16 rounded border border-gray-200 px-2 py-0.5 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
              <button
                onClick={() => removeLineHeight(l.id)}
                className="ms-auto rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <HiTrash className="h-3.5 w-3.5" />
              </button>
            </div>

            <p
              className="text-xs text-gray-700 dark:text-gray-300"
              style={{ lineHeight: l.value }}
              dir="rtl"
            >
              این یک متن نمونه است تا اثر ارتفاع خط را ببینی. مقدار {l.name} برابر{" "}
              {l.value} است.
            </p>

            {l.note && (
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                {l.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}