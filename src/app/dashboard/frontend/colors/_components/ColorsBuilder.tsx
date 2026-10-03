"use client";

import { useState } from "react";
import { useIO, useSaveStatus, useShortcuts, useAutoSave } from "@/lib/design-system/colors-hooks";
import { ToastProvider } from "./Toast";
import BuilderToolbar from "./BuilderToolbar";
import BuilderStats from "./BuilderStats";
import SearchBar from "./SearchBar";
import ColorPalettesSection from "./ColorPalettesSection";
import SemanticColorsSection from "./SemanticColorsSection";
import ColorsPreviewSection from "./ColorsPreviewSection";
import ContrastChecker from "./ContrastChecker";
import ExportPanel from "./ExportPanel";

const TABS = [
  { id: "palettes",  label: "پالت رنگ‌ها" },
  { id: "semantic",  label: "رنگ‌های معنایی" },
  { id: "preview",   label: "پیش‌نمایش" },
  { id: "export",    label: "خروجی کد" },
  { id: "tools",     label: "ابزارها" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Inner() {
  const [tab, setTab] = useState<TabId>("palettes");
  const { exportSystem, importSystem } = useIO();
  const { save } = useSaveStatus();

  useAutoSave();
  useShortcuts({
    onSave: save,
    onUndo: () => useColorsStoreGet().undo(),
    onRedo: () => useColorsStoreGet().redo(),
  });

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportSystem(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `colors-${Date.now()}.json`;
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
    <div className="space-y-6">
      <BuilderToolbar onExportJson={handleExport} onImportJson={handleImport} />
      <BuilderStats />

      {tab === "palettes" && <SearchBar />}

      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                tab === t.id
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tab === "palettes"  && <ColorPalettesSection />}
        {tab === "semantic"  && <SemanticColorsSection />}
        {tab === "preview"   && <ColorsPreviewSection />}
        {tab === "export"    && <ExportPanel />}
        {tab === "tools"     && <ContrastChecker />}
      </div>
    </div>
  );
}

function useColorsStoreGet() {
  // دسترسی به store برای میان‌برها
  const { undo, redo } = require("@/lib/design-system/colors-store").useColorsStore.getState();
  return { undo, redo };
}

export default function ColorsBuilder() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}