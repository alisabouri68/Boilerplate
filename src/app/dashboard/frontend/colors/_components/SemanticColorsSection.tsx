"use client";

import { useState } from "react";
import { useColorsStore } from "@/lib/design-system/colors-store";
import { useSemanticActions, useUI } from "@/lib/design-system/colors-hooks";
import SemanticCard from "./SemanticCard";
import ConfirmDialog from "./ConfirmDialog";

export default function SemanticColorsSection() {
  const colors = useColorsStore((s) => s.semanticColors);
  const { add, bulkToggle, bulkDelete } = useSemanticActions();
  const { selectedSemanticIds, clearSelection } = useUI();
  const [confirmBulk, setConfirmBulk] = useState(false);

  const activeCount = colors.filter((c) => c.active).length;
  const hasSelection = selectedSemanticIds.length > 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          رنگ‌های معنایی
          <span className="ms-2 text-xs font-normal text-gray-500 dark:text-gray-400">
            ({activeCount} از {colors.length} فعال)
          </span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {hasSelection && (
            <>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selectedSemanticIds.length} انتخاب شده
              </span>
              <button
                onClick={() => bulkToggle(true)}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                فعال
              </button>
              <button
                onClick={() => bulkToggle(false)}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                غیرفعال
              </button>
              <button
                onClick={() => setConfirmBulk(true)}
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                حذف
              </button>
              <button
                onClick={clearSelection}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                لغو
              </button>
            </>
          )}

          <button
            onClick={add}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + رنگ معنایی
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((c) => (
          <SemanticCard key={c.id} color={c} />
        ))}
      </div>

      <ConfirmDialog
        open={confirmBulk}
        title="حذف گروهی"
        message={`آیا از حذف ${selectedSemanticIds.length} رنگ معنایی مطمئنی؟`}
        danger
        onConfirm={() => {
          bulkDelete();
          setConfirmBulk(false);
        }}
        onCancel={() => setConfirmBulk(false)}
      />
    </section>
  );
}