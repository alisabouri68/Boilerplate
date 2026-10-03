"use client";

import { useState } from "react";
import type { SemanticColor } from "@/lib/design-system/types";
import { useSemanticActions, useUI } from "@/lib/design-system/colors-hooks";
import { bestTextColor, contrastRatio, wcagLabel } from "@/lib/design-system/colors-utils";
import ToggleSwitch from "./ToggleSwitch";
import { useToast } from "./Toast";

type Props = { color: SemanticColor };

export default function SemanticCard({ color }: Props) {
  const { update, remove, duplicate, toggle } = useSemanticActions();
  const { selectedSemanticIds, toggleSelectSemantic } = useUI();
  const toast = useToast();

  const ratio = contrastRatio(color.hex, color.textHex);
  const wcag = wcagLabel(ratio);
  const selected = selectedSemanticIds.includes(color.id);

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition dark:bg-gray-900 ${
        color.active
          ? "border-gray-200 dark:border-gray-800"
          : "border-dashed border-gray-300 opacity-60 dark:border-gray-700"
      } ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      {/* پیش‌نمایش */}
      <div
        className="relative flex flex-col gap-1 p-5"
        style={{ backgroundColor: color.hex, color: color.textHex }}
      >
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => toggleSelectSemantic(color.id)}
            className="mt-1 h-4 w-4 cursor-pointer rounded border-white/40 bg-white/30"
          />
          <div className="flex-1">
            <div className="text-base font-bold">{color.name || "—"}</div>
            <div className="text-[11px] opacity-85">{color.desc || "—"}</div>
          </div>
        </div>

        <div className="absolute top-3 end-3">
          <ToggleSwitch checked={color.active} onChange={() => toggle(color.id)} />
        </div>

        <div
          className="mt-2 self-start rounded px-1.5 py-0.5 text-[10px] font-bold"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "#fff" }}
          title={`کنتراست: ${ratio.toFixed(2)}`}
        >
          {wcag.label} • {ratio.toFixed(2)}
        </div>
      </div>

      {/* کنترل‌ها */}
      <div className="space-y-2 p-3">
        <div className="grid grid-cols-2 gap-2">
          <input
            value={color.name}
            onChange={(e) => update(color.id, { name: e.target.value })}
            placeholder="نام"
            className="rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          <input
            value={color.desc}
            onChange={(e) => update(color.id, { desc: e.target.value })}
            placeholder="توضیح"
            className="rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1">
            <input
              type="color"
              value={color.hex}
              onChange={(e) => update(color.id, { hex: e.target.value })}
              className="h-6 w-8 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
            />
            <input
              value={color.hex}
              onChange={(e) => update(color.id, { hex: e.target.value })}
              className="w-full rounded border border-gray-200 px-1.5 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
            />
          </div>
          <div className="flex items-center gap-1">
            <input
              type="color"
              value={color.textHex}
              onChange={(e) => update(color.id, { textHex: e.target.value })}
              className="h-6 w-8 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
            />
            <input
              value={color.textHex}
              onChange={(e) => update(color.id, { textHex: e.target.value })}
              className="w-full rounded border border-gray-200 px-1.5 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
            />
          </div>
        </div>

        <button
          onClick={() => {
            const best = bestTextColor(color.hex);
            update(color.id, { textHex: best });
            toast.push("بهترین رنگ متن اعمال شد", "success");
          }}
          className="w-full rounded-lg border border-gray-200 py-1 text-[11px] hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          پیشنهاد خودکار رنگ متن
        </button>

        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              color.active
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {color.active ? "فعال" : "غیرفعال"}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => duplicate(color.id)}
              className="rounded-lg border border-gray-200 px-2 py-0.5 text-[11px] dark:border-gray-700"
            >
              کپی
            </button>
            <button
              onClick={() => remove(color.id)}
              className="rounded-lg border border-red-200 px-2 py-0.5 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}