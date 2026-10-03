"use client";

import {
  useHistory,
  useIO,
  useSaveStatus,
} from "@/lib/design-system/colors-hooks";
import { useToast } from "./Toast";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

type Props = { onExportJson: () => void; onImportJson: (f: File) => void };

export default function BuilderToolbar({ onExportJson, onImportJson }: Props) {
  const { status, dirty, autoSave, save, setAutoSave } = useSaveStatus();
  const { undo, redo, canUndo, canRedo } = useHistory();
  const { reset } = useIO();
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  const label =
    status === "saving"
      ? "در حال ذخیره…"
      : status === "saved" && !dirty
        ? "ذخیره شد ✓"
        : status === "error"
          ? "خطا"
          : "ذخیره";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          رنگ‌ها
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          پالت رنگ‌ها و توکن‌های معنایی دیزاین سیستم
          {dirty && (
            <span className="ms-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              تغییرات ذخیره نشده
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs dark:border-gray-700">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            className="h-3.5 w-3.5"
          />
          ذخیره خودکار
        </label>

        <button
          onClick={undo}
          disabled={!canUndo}
          title="واگرد (Ctrl+Z)"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ↶
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          title="ازنو (Ctrl+Shift+Z)"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ↷
        </button>

        <label className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          ورود JSON
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onImportJson(f);
              e.target.value = "";
            }}
          />
        </label>

        <button
          onClick={onExportJson}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          خروجی JSON
        </button>

        <button
          onClick={() => setConfirmReset(true)}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          بازنشانی
        </button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="بازنشانی"
        message="تمام تغییرات پاک می‌شه و به حالت پیش‌فرض برمی‌گرده. مطمئنی؟"
        danger
        onConfirm={() => {
          reset();
          setConfirmReset(false);
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
