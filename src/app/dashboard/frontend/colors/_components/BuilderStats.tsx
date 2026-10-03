"use client";

import { useShallow } from "zustand/react/shallow";
import { useColorsStore, selectStats } from "@/lib/design-system/colors-store";

export default function BuilderStats() {
  const s = useColorsStore(useShallow(selectStats));

  const items = [
    { label: "پالت‌ها",     value: `${s.activePalettes}/${s.totalPalettes}` },
    { label: "سایه‌ها",     value: `${s.activeShades}/${s.totalShades}` },
    { label: "رنگ معنایی", value: `${s.activeSemantic}/${s.totalSemantic}` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((i) => (
        <div
          key={i.label}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="text-[10px] text-gray-500 dark:text-gray-400">{i.label}</div>
          <div className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
            {i.value}
          </div>
        </div>
      ))}
    </div>
  );
}