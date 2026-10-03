"use client";

import { useTypography, useTypographyActions } from "@/lib/design-system/typography-hooks";
import { HiPlus, HiTrash } from "react-icons/hi";

export default function FontWeightsSection() {
  const { fontWeights } = useTypography();
  const { addFontWeight, updateFontWeight, removeFontWeight } = useTypographyActions();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          وزن فونت
        </h3>
        <button
          onClick={addFontWeight}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> وزن
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-right text-xs">
          <tbody className="divide-y dark:divide-gray-800">
            {fontWeights.map((w) => (
              <tr key={w.id} className="bg-white dark:bg-gray-950">
                <td className="px-3 py-2 w-32">
                  <input
                    value={w.name}
                    onChange={(e) => updateFontWeight(w.id, { name: e.target.value })}
                    className="w-full rounded border border-gray-200 px-2 py-0.5 font-mono text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </td>
                <td className="px-3 py-2 w-20">
                  <input
                    type="number"
                    value={w.value}
                    onChange={(e) =>
                      updateFontWeight(w.id, { value: Number(e.target.value) || 0 })
                    }
                    className="w-full rounded border border-gray-200 px-2 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </td>
                <td className="px-3 py-2">
                  <span
                    className="text-gray-900 dark:text-white"
                    style={{ fontWeight: w.value, fontSize: 16 }}
                  >
                    نمونه متن فارسی {w.name}
                  </span>
                </td>
                <td className="px-3 py-2 text-end">
                  <button
                    onClick={() => removeFontWeight(w.id)}
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