"use client";

import { useTypography, useTypographyActions } from "@/lib/design-system/typography-hooks";
import { HiPlus, HiTrash, HiEye, HiEyeOff } from "react-icons/hi";

export default function FontsSection() {
  const { fontFamilies } = useTypography();
  const { addFontFamily, updateFontFamily, removeFontFamily, toggleFontFamily } =
    useTypographyActions();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          خانواده فونت‌ها
        </h3>
        <button
          onClick={addFontFamily}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> فونت
        </button>
      </div>

      <div className="space-y-2">
        {fontFamilies.map((f) => (
          <div
            key={f.id}
            className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white p-2.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <button
              onClick={() => toggleFontFamily(f.id)}
              className={`rounded-lg p-1.5 ${
                f.active
                  ? "text-green-600 hover:bg-green-50 dark:text-green-400"
                  : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {f.active ? <HiEye className="h-4 w-4" /> : <HiEyeOff className="h-4 w-4" />}
            </button>

            <input
              value={f.name}
              onChange={(e) => updateFontFamily(f.id, { name: e.target.value })}
              className="w-24 rounded border border-gray-200 px-2 py-1 text-xs font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />

            <select
              value={f.role}
              onChange={(e) =>
                updateFontFamily(f.id, { role: e.target.value as typeof f.role })
              }
              className="rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              <option value="sans">sans</option>
              <option value="serif">serif</option>
              <option value="mono">mono</option>
              <option value="display">display</option>
            </select>

            <input
              value={f.stack}
              onChange={(e) => updateFontFamily(f.id, { stack: e.target.value })}
              className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1 font-mono text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
              placeholder="Vazirmatn, sans-serif"
            />

            <button
              onClick={() => removeFontFamily(f.id)}
              className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <HiTrash className="h-4 w-4" />
            </button>

            {/* پیش‌نمایش */}
            <p
              className="w-full text-sm text-gray-700 dark:text-gray-300"
              style={{ fontFamily: f.stack }}
              dir="rtl"
            >
              نمونه متن فارسی برای {f.name} — ۱۲۳۴۵۶۷۸۹۰ ABC abc
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}