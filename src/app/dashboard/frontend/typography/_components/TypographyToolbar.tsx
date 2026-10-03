"use client";

import { useState } from "react";
import { useTypography, useTypographyActions } from "@/lib/design-system/typography-hooks";
import ConfirmDialog from "../../colors/_components/ConfirmDialog";
export default function TypographyToolbar() {
  const { dirty } = useTypography();
  const { reset, exportSystem, importSystem } = useTypographyActions();
  const [confirm, setConfirm] = useState(false);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportSystem(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `typography-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        importSystem(JSON.parse(e.target?.result as string));
      } catch {
        alert("فایل JSON معتبر نیست");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          تایپوگرافی
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          فونت‌ها، مقیاس سایز، وزن، ارتفاع خط و استایل‌های متنی
          {dirty && (
            <span className="ms-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              تغییرات ذخیره نشده
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          ورود JSON
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = "";
            }}
          />
        </label>

        <button
          onClick={handleExport}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          خروجی JSON
        </button>

        <button
          onClick={() => setConfirm(true)}
          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          بازنشانی
        </button>
      </div>

      <ConfirmDialog
        open={confirm}
        title="بازنشانی تایپوگرافی"
        message="تمام تغییرات پاک می‌شود و به مقادیر پیش‌فرض برمی‌گردد."
        danger
        onConfirm={() => {
          reset();
          setConfirm(false);
        }}
        onCancel={() => setConfirm(false)}
      />
    </div>
  );
}