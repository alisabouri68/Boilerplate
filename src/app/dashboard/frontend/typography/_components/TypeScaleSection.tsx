// _components/TypeScaleSection.tsx
"use client";

import { useState } from "react";
import {
  useFontSizes,
  useTypography,
  useRuntimeAPI,
} from "@/lib/runtime/react";
import { uid, pxToRem } from "@/lib/design-system/core/typography-utils";
import { HiPlus, HiTrash, HiSparkles } from "react-icons/hi";
import type { FontSize } from "@/lib/design-system/core/typography-types";

const RATIOS = [
  { name: "Minor Second", value: 1.067 },
  { name: "Major Second", value: 1.125 },
  { name: "Minor Third", value: 1.2 },
  { name: "Major Third", value: 1.25 },
  { name: "Perfect Fourth", value: 1.333 },
  { name: "Aug. Fourth", value: 1.414 },
  { name: "Perfect Fifth", value: 1.5 },
  { name: "Golden Ratio", value: 1.618 },
];

const STEP_NAMES = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
];

export default function TypeScaleSection() {
  const fontSizes = useFontSizes();
  const system = useTypography();
  const rt = useRuntimeAPI();

  const [base, setBase] = useState(16);
  const [ratio, setRatio] = useState(1.25);
  const [steps, setSteps] = useState(8);

  const generateScale = () => {
    // ایندکس مرکز = base
    const generated: FontSize[] = [];
    const centerIdx = Math.floor(steps / 2);

    for (let i = 0; i < steps; i++) {
      const power = i - centerIdx;
      const px = Math.round(base * Math.pow(ratio, power));
      const name = STEP_NAMES[i] ?? `size-${i}`;
      generated.push({
        id: uid(),
        name,
        px,
        rem: pxToRem(px),
        active: true,
      });
    }

    // فقط fontSizes رو جایگزین کن
    rt.theme.importTypography({ ...system, fontSizes: generated } as any);
  };

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          مقیاس سایز
        </h3>
        <button
          onClick={() => rt.theme.addFontSize()}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> سایز
        </button>
      </div>

      {/* Generator */}
      <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3 dark:border-purple-900 dark:bg-purple-950/20">
        <div className="mb-2 flex items-center gap-1.5">
          <HiSparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-xs font-semibold text-purple-900 dark:text-purple-200">
            تولید خودکار مقیاس
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <label className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">پایه</span>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(Number(e.target.value) || 16)}
              className="w-14 rounded border border-gray-200 px-1.5 py-0.5 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
            <span className="text-gray-400">px</span>
          </label>
          <label className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">نسبت</span>
            <select
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="rounded border border-gray-200 px-1.5 py-0.5 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              {RATIOS.map((r) => (
                <option key={r.name} value={r.value}>
                  {r.name} ({r.value})
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">تعداد</span>
            <input
              type="number"
              value={steps}
              min={3}
              max={12}
              onChange={(e) => setSteps(Number(e.target.value) || 8)}
              className="w-12 rounded border border-gray-200 px-1.5 py-0.5 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
          </label>
          <button
            onClick={generateScale}
            className="rounded-lg bg-purple-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-purple-700"
          >
            اعمال
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-right text-xs">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">
                نام
              </th>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">
                px
              </th>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">
                rem
              </th>
              <th className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">
                پیش‌نمایش
              </th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {fontSizes.map((s) => (
              <tr key={s.id} className="bg-white dark:bg-gray-950">
                <td className="px-3 py-2">
                  <input
                    value={s.name}
                    onChange={(e) =>
                      rt.theme.updateFontSize(s.id, { name: e.target.value })
                    }
                    className="w-20 rounded border border-gray-200 px-2 py-0.5 font-mono text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={s.px}
                    onChange={(e) =>
                      rt.theme.updateFontSize(s.id, {
                        px: Number(e.target.value) || 0,
                      })
                    }
                    className="w-16 rounded border border-gray-200 px-2 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </td>
                <td className="px-3 py-2 font-mono text-[11px] text-gray-500 dark:text-gray-400">
                  {s.rem}
                </td>
                <td className="px-3 py-2">
                  <span
                    className="truncate text-gray-900 dark:text-white"
                    style={{
                      fontSize: `${Math.min(s.px, 32)}px`,
                      lineHeight: 1.4,
                    }}
                  >
                    نمونه {s.name}
                  </span>
                </td>
                <td className="px-3 py-2 text-end">
                  <button
                    onClick={() => rt.theme.removeFontSize(s.id)}
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