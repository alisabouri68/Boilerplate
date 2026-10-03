"use client";

import { useState } from "react";
import type { ColorPalette } from "@/lib/design-system/types";
import { usePaletteActions, useUI } from "@/lib/design-system/colors-hooks";
import ToggleSwitch from "./ToggleSwitch";
import ShadeCard from "./ShadeCard";
import ConfirmDialog from "./ConfirmDialog";

type Props = { palette: ColorPalette };

export default function PaletteCard({ palette }: Props) {
  const {
    updatePalette,
    removePalette,
    duplicatePalette,
    togglePalette,
    togglePinPalette,
    toggleCollapsePalette,
    addShade,
    regenerateShades,
  } = usePaletteActions();
  const { selectedPaletteIds, toggleSelectPalette } = useUI();
  const [confirm, setConfirm] = useState(false);
  const [genHex, setGenHex] = useState("#3b82f6");
  const [showGen, setShowGen] = useState(false);

  const selected = selectedPaletteIds.includes(palette.id);
  const activeShades = palette.shades.filter((s) => s.active).length;

  return (
    <div
      className={`rounded-2xl border bg-white p-4 transition sm:p-5 dark:bg-gray-900 ${
        palette.active
          ? "border-gray-200 dark:border-gray-800"
          : "border-dashed border-gray-300 opacity-70 dark:border-gray-700"
      } ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      {/* هدر */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelectPalette(palette.id)}
          className="h-4 w-4 cursor-pointer rounded border-gray-300"
        />

        <ToggleSwitch
          checked={palette.active}
          onChange={() => togglePalette(palette.id)}
        />

        <button
          onClick={() => togglePinPalette(palette.id)}
          className={`text-sm ${palette.pinned ? "text-amber-500" : "text-gray-300 hover:text-amber-500"}`}
          title={palette.pinned ? "برداشتن پین" : "پین"}
        >
          ★
        </button>

        <button
          onClick={() => toggleCollapsePalette(palette.id)}
          className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          title={palette.collapsed ? "باز کن" : "جمع کن"}
        >
          {palette.collapsed ? "▸" : "▾"}
        </button>

        <span
          className="h-6 w-6 shrink-0 rounded-md border border-gray-200 dark:border-gray-700"
          style={{
            backgroundColor:
              palette.shades.find((s) => s.active)?.hex ??
              palette.shades[0]?.hex ??
              "#fff",
          }}
        />

        <input
          value={palette.name}
          onChange={(e) => updatePalette(palette.id, { name: e.target.value })}
          className="min-w-[100px] flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />

        <input
          value={palette.category ?? ""}
          onChange={(e) => updatePalette(palette.id, { category: e.target.value })}
          placeholder="دسته"
          className="w-24 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
        />

        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {activeShades}/{palette.shades.length}
        </span>

        <button
          onClick={() => duplicatePalette(palette.id)}
          className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          کپی
        </button>

        <button
          onClick={() => setConfirm(true)}
          className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          حذف
        </button>
      </div>

      {/* یادداشت */}
      {!palette.collapsed && (
        <input
          value={palette.note ?? ""}
          onChange={(e) => updatePalette(palette.id, { note: e.target.value })}
          placeholder="یادداشت روی پالت…"
          className="mb-3 w-full rounded-lg border border-dashed border-gray-200 bg-transparent px-3 py-1.5 text-xs text-gray-500 outline-none focus:border-blue-400 dark:border-gray-700 dark:text-gray-400"
        />
      )}

      {/* سایه‌ها */}
      {!palette.collapsed && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {palette.shades.map((s) => (
            <ShadeCard key={s.id} shade={s} paletteId={palette.id} />
          ))}

          <button
            onClick={() => addShade(palette.id)}
            className="flex min-h-[140px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:border-gray-700"
          >
            + سایه
          </button>
        </div>
      )}

      {/* تولید خودکار */}
      {!palette.collapsed && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowGen((v) => !v)}
            className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            🎨 تولید خودکار ۱۰ سایه
          </button>
          {showGen && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={genHex}
                onChange={(e) => setGenHex(e.target.value)}
                className="h-7 w-9 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
              />
              <input
                value={genHex}
                onChange={(e) => setGenHex(e.target.value)}
                className="w-24 rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
              />
              <button
                onClick={() => {
                  regenerateShades(palette.id, genHex);
                  setShowGen(false);
                }}
                className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
              >
                تولید
              </button>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={confirm}
        title="حذف پالت"
        message={`مطمئنی می‌خوای «${palette.name}» رو حذف کنی؟ این کار قابل بازگشت نیست (ولی Undo داری).`}
        danger
        onConfirm={() => { removePalette(palette.id); setConfirm(false); }}
        onCancel={() => setConfirm(false)}
      />
    </div>
  );
}