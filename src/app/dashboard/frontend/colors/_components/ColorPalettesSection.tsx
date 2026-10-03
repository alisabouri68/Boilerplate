"use client";

import { useColorsStore, selectFilteredPalettes } from "@/lib/design-system/colors-store";
import { usePaletteActions, useUI } from "@/lib/design-system/colors-hooks";
import PaletteCard from "./PaletteCard";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

export default function ColorPalettesSection() {
  const palettes = useColorsStore(selectFilteredPalettes);
  const totalCount = useColorsStore((s) => s.palettes.length);
  const { addPalette, bulkTogglePalettes, bulkDeletePalettes } = usePaletteActions();
  const { selectedPaletteIds, clearSelection, selectAllPalettes } = useUI();
  const [confirmBulk, setConfirmBulk] = useState(false);

  const hasSelection = selectedPaletteIds.length > 0;

  return (
    <section className="space-y-6">
      {/* نوار اکشن */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          پالت رنگ‌ها
          <span className="ms-2 text-xs font-normal text-gray-500 dark:text-gray-400">
            (نمایش {palettes.length} از {totalCount})
          </span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {hasSelection && (
            <>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selectedPaletteIds.length} انتخاب شده
              </span>
              <button
                onClick={() => bulkTogglePalettes(true)}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                فعال کردن
              </button>
              <button
                onClick={() => bulkTogglePalettes(false)}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                غیرفعال کردن
              </button>
              <button
                onClick={() => setConfirmBulk(true)}
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                حذف انتخاب‌شده‌ها
              </button>
              <button
                onClick={clearSelection}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                لغو انتخاب
              </button>
            </>
          )}

          <button
            onClick={selectAllPalettes}
            className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            انتخاب همه
          </button>

          <button
            onClick={() => addPalette()}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + پالت جدید
          </button>
        </div>
      </div>

      {/* لیست */}
      {palettes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            هیچ پالتی با این فیلتر پیدا نشد.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {palettes.map((p) => (
            <PaletteCard key={p.id} palette={p} />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmBulk}
        title="حذف گروهی"
        message={`آیا از حذف ${selectedPaletteIds.length} پالت مطمئنی؟`}
        danger
        onConfirm={() => {
          bulkDeletePalettes();
          setConfirmBulk(false);
        }}
        onCancel={() => setConfirmBulk(false)}
      />
    </section>
  );
}