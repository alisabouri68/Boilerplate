"use client";

import { useTypography, useTypographyActions } from "@/lib/design-system/typography-hooks";
import { HiPlus, HiTrash } from "react-icons/hi";

export default function TypeScaleSection() {
  const { fontSizes } = useTypography();
  const { addFontSize, updateFontSize, removeFontSize } = useTypographyActions();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          مقیاس سایز
        </h3>
        <button
          onClick={addFontSize}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> سایز
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-right text-xs">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">نام</th>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">px</th>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">rem</th>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">پیش‌نمایش</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {fontSizes.map((s) => (
              <tr key={s.id} className="bg-white dark:bg-gray-950">
                <td className="px-3 py-2">
                  <input
                    value={s.name}
                    onChange={(e) => updateFontSize(s.id, { name: e.target.value })}
                    className="w-20 rounded border border-gray-200 px-2 py-0.5 font-mono text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={s.px}
                    onChange={(e) =>
                      updateFontSize(s.id, { px: Number(e.target.value) || 0 })
                    }
                    className="w-16 rounded border border-gray-200 px-2 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </td>
                <td className="px-3 py-2 font-mono text-[11px] text-gray-500 dark:text-gray-400">
                  {s.rem}
                </td>
                <td className="px-3 py-2">
                  <span
                    className="text-gray-900 dark:text-white"
                    style={{ fontSize: `${s.px}px`, lineHeight: 1.4 }}
                  >
                    نمونه متن {s.name}
                  </span>
                </td>
                <td className="px-3 py-2 text-end">
                  <button
                    onClick={() => removeFontSize(s.id)}
                    className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <HiTrash className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}