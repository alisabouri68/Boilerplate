"use client";

import { useState } from "react";
import { useColorsStore } from "@/lib/design-system/colors-store";
import type { TokenValue, TokenRef, TokenHex } from "@/lib/design-system/theme";

type Props = {
  value: TokenValue | undefined;
  onChange: (v: TokenValue) => void;
  onClear?: () => void;
};

export default function TokenValuePicker({ value, onChange, onClear }: Props) {
  const palettes = useColorsStore((s) => s.palettes);

  const mode: "ref" | "hex" =
    value && "palette" in value ? "ref" : "hex";

  const refValue: TokenRef = value && "palette" in value ? value : {
    palette: palettes[0]?.name ?? "",
    shade: palettes[0]?.shades[0]?.shade ?? "500",
    fallback: "#000000",
  };

  const hexValue: TokenHex = value && "hex" in value ? value : { hex: "#000000" };

  const currentPalette = palettes.find(
    (p) => p.name.toLowerCase() === refValue.palette.toLowerCase()
  );

  return (
    <div className="space-y-2">
      {/* سوییچ حالت */}
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-[10px] dark:border-gray-800 dark:bg-gray-950">
        <button
          type="button"
          onClick={() =>
            onChange({
              palette: refValue.palette || palettes[0]?.name || "",
              shade: refValue.shade || palettes[0]?.shades[0]?.shade || "500",
              fallback: refValue.fallback,
            })
          }
          className={`rounded-md px-2 py-0.5 font-medium transition ${
            mode === "ref"
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          از پالت
        </button>
        <button
          type="button"
          onClick={() => onChange({ hex: hexValue.hex })}
          className={`rounded-md px-2 py-0.5 font-medium transition ${
            mode === "hex"
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          ثابت
        </button>
      </div>

      {mode === "ref" ? (
        <div className="flex gap-2">
          {/* انتخاب پالت */}
          <select
            value={refValue.palette}
            onChange={(e) =>
              onChange({
                ...refValue,
                palette: e.target.value,
                shade: palettes.find((p) => p.name === e.target.value)?.shades[0]?.shade ?? "500",
              })
            }
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          >
            {palettes.length === 0 && <option value="">پالتی نیست</option>}
            {palettes.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          {/* انتخاب shade */}
          <select
            value={refValue.shade}
            onChange={(e) => onChange({ ...refValue, shade: e.target.value })}
            className="w-20 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          >
            {(currentPalette?.shades ?? []).map((sh) => (
              <option key={sh.id} value={sh.shade}>
                {sh.shade}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hexValue.hex}
            onChange={(e) => onChange({ hex: e.target.value })}
            className="h-7 w-9 cursor-pointer rounded border border-gray-200 dark:border-gray-800"
          />
          <input
            type="text"
            value={hexValue.hex}
            onChange={(e) => onChange({ hex: e.target.value })}
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 py-1 font-mono text-xs dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          />
        </div>
      )}

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] text-red-600 hover:underline dark:text-red-400"
        >
          حذف مقدار
        </button>
      )}
    </div>
  );
}