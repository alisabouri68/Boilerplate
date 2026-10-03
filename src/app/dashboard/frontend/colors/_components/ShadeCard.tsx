"use client";

import { useState } from "react";
import type { ColorShade } from "@/lib/design-system/types";
import { usePaletteActions } from "@/lib/design-system/colors-hooks";
import ToggleSwitch from "./ToggleSwitch";
import { useToast } from "./Toast";
import {
  contrastRatio,
  hexToHsl,
  wcagLabel,
  hexToRgb,
} from "@/lib/design-system/colors-utils";
type Props = {
  shade: ColorShade;
  paletteId: string;
};

export default function ShadeCard({ shade, paletteId }: Props) {
  const {
    updateShade,
    removeShade,
    duplicateShade,
    toggleShade,
    togglePinShade,
  } = usePaletteActions();
  const [menu, setMenu] = useState(false);
  const toast = useToast();

  const copy = async (v: string, label: string) => {
    try {
      await navigator.clipboard.writeText(v);
      toast.push(`کپی شد: ${label}`, "success");
    } catch {
      toast.push("کپی نشد", "error");
    }
  };

  const contrastWhite = contrastRatio(shade.hex, "#ffffff");
  const wcag = wcagLabel(contrastWhite);
  const { h, s, l } = hexToHsl(shade.hex);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition ${
        shade.active
          ? "border-gray-200 dark:border-gray-800"
          : "border-dashed border-gray-300 opacity-50 dark:border-gray-700"
      }`}
    >
      {/* پیش‌نمایش رنگ */}
      <div
        className="relative h-20 cursor-pointer"
        style={{ backgroundColor: shade.hex }}
        onClick={() => copy(shade.hex, "hex")}
      >
        <div className="absolute top-1.5 end-1.5 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePinShade(paletteId, shade.id);
            }}
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
              shade.pinned
                ? "bg-amber-400 text-white"
                : "bg-black/20 text-white opacity-0 group-hover:opacity-100"
            }`}
            title={shade.pinned ? "برداشتن پین" : "پین"}
          >
            ★
          </button>
          <ToggleSwitch
            checked={shade.active}
            onChange={() => toggleShade(paletteId, shade.id)}
          />
        </div>

        <div
          className="absolute bottom-1 start-1 rounded px-1.5 py-0.5 text-[10px] font-bold"
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            color: "#fff",
          }}
          title={`کنتراست با سفید: ${contrastWhite.toFixed(2)} (${wcag.label})`}
        >
          {wcag.label}
        </div>
      </div>

      {/* کنترل‌ها */}
      <div className="space-y-1.5 bg-white p-2 dark:bg-gray-950">
        <div className="flex items-center gap-1">
          <input
            value={shade.shade}
            onChange={(e) =>
              updateShade(paletteId, shade.id, { shade: e.target.value })
            }
            className="w-11 rounded border border-gray-200 px-1.5 py-0.5 text-xs font-semibold dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          <input
            type="color"
            value={shade.hex}
            onChange={(e) =>
              updateShade(paletteId, shade.id, { hex: e.target.value })
            }
            className="h-6 w-8 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
          />
          <button
            onClick={() => setMenu((v) => !v)}
            className="ms-auto rounded px-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="گزینه‌ها"
          >
            ⋯
          </button>
        </div>

        <input
          value={shade.token}
          onChange={(e) =>
            updateShade(paletteId, shade.id, { token: e.target.value })
          }
          className="w-full rounded border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        />
        <input
          value={shade.hex}
          onChange={(e) =>
            updateShade(paletteId, shade.id, { hex: e.target.value })
          }
          className="w-full rounded border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
        />

        {/* منوی گزینه‌ها */}
        {menu && (
          <div className="absolute end-2 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white text-xs shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <button
              onClick={() => {
                copy(shade.hex, "hex");
                setMenu(false);
              }}
              className="block w-full px-3 py-1.5 text-start hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              کپی HEX
            </button>
            <button
              onClick={() => {
                const m = shade.hex.match(/[0-9a-f]{2}/gi) ?? [];
                if (m.length < 3) {
                  copy(shade.hex, "hex");
                  setMenu(false);
                  return;
                }
                const r = parseInt(m[0]!, 16);
                const g = parseInt(m[1]!, 16);
                const b = parseInt(m[2]!, 16);
                copy(`rgb(${r}, ${g}, ${b})`, "rgb");
                setMenu(false);
              }}
              className="block w-full px-3 py-1.5 text-start hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              کپی RGB
            </button>
            <button
              onClick={() => {
                copy(`hsl(${h}, ${s}%, ${l}%)`, "hsl");
                setMenu(false);
              }}
              className="block w-full px-3 py-1.5 text-start hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              کپی HSL
            </button>
            <button
              onClick={() => {
                duplicateShade(paletteId, shade.id);
                setMenu(false);
              }}
              className="block w-full px-3 py-1.5 text-start hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              کپی سایه
            </button>
            <button
              onClick={() => {
                removeShade(paletteId, shade.id);
                setMenu(false);
              }}
              className="block w-full px-3 py-1.5 text-start text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
