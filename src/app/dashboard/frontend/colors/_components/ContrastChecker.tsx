"use client";

import { useState } from "react";
import { contrastRatio, wcagLabel } from "@/lib/design-system/colors-utils";

export default function ContrastChecker() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#2563eb");

  const ratio = contrastRatio(fg, bg);
  const wcag = wcagLabel(ratio);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
        بررسی کنتراست (WCAG)
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400">متن</label>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
          />
          <input
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400">پس‌زمینه</label>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
          />
          <input
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>

        <div
          className="flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold"
          style={{ backgroundColor: bg, color: fg }}
        >
          نمونه متن
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        <div>
          نسبت کنتراست:{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {ratio.toFixed(2)}:1
          </span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 font-bold text-white"
          style={{ backgroundColor: wcag.color }}
        >
          {wcag.label}
        </span>
        <div className="flex gap-3 text-gray-500 dark:text-gray-400">
          <span>AA ≥ 4.5</span>
          <span>AAA ≥ 7</span>
        </div>
      </div>
    </div>
  );
}