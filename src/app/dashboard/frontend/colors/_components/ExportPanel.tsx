"use client";

import { useState } from "react";
import { useColorsStore } from "@/lib/design-system/colors-store";
import { toCssVariables, toTailwindConfig, copyToClipboard } from "@/lib/design-system/colors-utils";
import { useToast } from "./Toast";

type Mode = "css" | "tailwind" | "json";

export default function ExportPanel() {
  const palettes = useColorsStore((s) => s.palettes);
  const semantics = useColorsStore((s) => s.semanticColors);
  const [mode, setMode] = useState<Mode>("css");
  const toast = useToast();

  const content =
    mode === "css"
      ? toCssVariables(palettes, semantics)
      : mode === "tailwind"
      ? toTailwindConfig(palettes, semantics)
      : JSON.stringify({ palettes, semanticColors: semantics }, null, 2);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          خروجی کد
        </h3>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
          {(["css", "tailwind", "json"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                mode === m
                  ? "bg-white text-gray-900 shadow dark:bg-gray-950 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {m === "css" ? "CSS Vars" : m === "tailwind" ? "Tailwind" : "JSON"}
            </button>
          ))}
        </div>
      </div>

      <pre className="max-h-96 overflow-auto rounded-lg bg-gray-950 p-4 text-[11px] leading-relaxed text-gray-100">
        {content}
      </pre>

      <button
        onClick={async () => {
          const ok = await copyToClipboard(content);
          toast.push(ok ? "کپی شد" : "کپی نشد", ok ? "success" : "error");
        }}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        کپی خروجی
      </button>
    </div>
  );
}