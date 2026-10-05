// _components/TypographyToolbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  useTypography,
  useRuntimeAPI,
  useRuntimeHistory,
} from "@/lib/runtime/react";
import { PRESETS } from "@/lib/design-system/typography-presets";
import ConfirmDialog from "../../colors/_components/ConfirmDialog";
import {
  HiUpload,
  HiDownload,
  HiRefresh,
  HiArrowRight,
  HiArrowLeft,
  HiShare,
  HiChevronDown,
  HiCheck,
} from "react-icons/hi";

export default function TypographyToolbar() {
  const typography = useTypography();
  const rt = useRuntimeAPI();
  const { past, future, canUndo, canRedo } = useRuntimeHistory();

  const [confirm, setConfirm] = useState(false);
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const presetsRef = useRef<HTMLDivElement>(null);

  const dirty = rt.theme.dirty;
  const updatedAt = rt.theme.updatedAt;

  /* ---------- close presets on outside click ---------- */
  useEffect(() => {
    if (!presetsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!presetsRef.current?.contains(e.target as Node)) {
        setPresetsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [presetsOpen]);

  // ⚠️ keyboard shortcuts حذف شد — چون در useRuntimeHotkeys (RuntimeInitializer) هست

  /* ---------- export ---------- */
  const handleExport = () => {
    const data = rt.theme.exportTypography();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `typography-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    rt.theme.markClean();
  };

  /* ---------- import ---------- */
  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        rt.theme.importTypography(parsed);
        rt.clearHistory();
      } catch {
        alert("فایل JSON معتبر نیست");
      }
    };
    reader.readAsText(file);
  };

  /* ---------- share ---------- */

const handleShare = async () => {
  try {
    const data = rt.theme.exportTypography();
    const json = JSON.stringify(data);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    const url = `${location.origin}${location.pathname}?t=${encoded}`;
    await navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1500);
  } catch {
    alert("خطا در کپی لینک");
  }
};

  /* ---------- preset ---------- */
  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    rt.theme.importTypography(preset.build());
    rt.clearHistory();
    setPresetsOpen(false);
  };

  /* ---------- reset ---------- */
  const handleReset = () => {
    rt.theme.resetTypography();
    rt.clearHistory();
    setConfirm(false);
  };

  return (
    <div className="space-y-3">
      {/* =================== Row 1: title + undo/redo =================== */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            تایپوگرافی
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            فونت‌ها، مقیاس سایز، وزن، ارتفاع خط و استایل‌های متنی
            {dirty && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                تغییرات ذخیره نشده
              </span>
            )}
            {updatedAt && !dirty && (
              <span className="text-[11px] text-gray-400">
                آخرین ویرایش:{" "}
                {new Date(updatedAt).toLocaleString("fa-IR")}
              </span>
            )}
          </p>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={() => rt.undo()}
            disabled={!canUndo}
            className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
            title="بازگردانی (Ctrl+Z)"
          >
            <HiArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => rt.redo()}
            disabled={!canRedo}
            className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
            title="ازنو (Ctrl+Shift+Z)"
          >
            <HiArrowLeft className="h-4 w-4" />
          </button>
          {(past > 0 || future > 0) && (
            <span className="mx-1 select-none font-mono text-[10px] text-gray-400">
              {past}/{future}
            </span>
          )}
        </div>
      </div>

      {/* =================== Row 2: actions =================== */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Presets dropdown */}
        <div className="relative" ref={presetsRef}>
          <button
            onClick={() => setPresetsOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            پیش‌تنظیم‌ها
            <HiChevronDown
              className={`h-3.5 w-3.5 transition-transform ${
                presetsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {presetsOpen && (
            <div className="absolute right-0 z-20 mt-1 w-64 rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className="flex w-full flex-col items-start rounded-lg px-3 py-2 text-right transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {p.label}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {p.description}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <HiUpload className="h-3.5 w-3.5" />
          ورود JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImport(f);
            e.target.value = "";
          }}
        />

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <HiDownload className="h-3.5 w-3.5" />
          خروجی JSON
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {shareCopied ? (
            <>
              <HiCheck className="h-3.5 w-3.5 text-green-500" />
              کپی شد
            </>
          ) : (
            <>
              <HiShare className="h-3.5 w-3.5" />
              اشتراک لینک
            </>
          )}
        </button>

        <button
          onClick={() => setConfirm(true)}
          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          <HiRefresh className="h-3.5 w-3.5" />
          بازنشانی
        </button>
      </div>

      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirm}
        title="بازنشانی تایپوگرافی"
        message="تمام تغییرات پاک می‌شود و به مقادیر پیش‌فرض برمی‌گردد."
        danger
        onConfirm={handleReset}
        onCancel={() => setConfirm(false)}
      />
    </div>
  );
}