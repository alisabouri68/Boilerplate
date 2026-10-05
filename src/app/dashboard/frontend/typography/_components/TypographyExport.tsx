// _components/TypographyExport.tsx
"use client";

import { useMemo, useState } from "react";
import { useTypography } from "@/lib/runtime/react";  // ← تغییر
import {
  toCssBlock,
  toTailwindConfig,
  toGoogleFontsLink,
  toDesignTokensJson,
  toFigmaTokensJson,
  toTypeScriptTypes,
  toReactComponent,
} from "@/lib/design-system/typography-exporters";
import { HiDownload, HiCheck, HiClipboardCopy } from "react-icons/hi";

type Mode =
  | "css"
  | "tailwind"
  | "tokens"
  | "figma"
  | "typescript"
  | "react"
  | "google";

const MODES: { id: Mode; label: string; ext: string; lang: string }[] = [
  { id: "css", label: "CSS Variables", ext: "css", lang: "css" },
  { id: "tailwind", label: "Tailwind", ext: "ts", lang: "ts" },
  { id: "tokens", label: "Design Tokens", ext: "json", lang: "json" },
  { id: "figma", label: "Figma Tokens", ext: "json", lang: "json" },
  { id: "typescript", label: "TypeScript", ext: "ts", lang: "ts" },
  { id: "react", label: "React", ext: "tsx", lang: "tsx" },
  { id: "google", label: "Google Fonts", ext: "html", lang: "html" },
];

export default function TypographyExport() {
  const system = useTypography();
  const [mode, setMode] = useState<Mode>("css");
  const [copied, setCopied] = useState(false);

  const activeMode = MODES.find((m) => m.id === mode)!;

  const content = useMemo(() => {
    switch (mode) {
      case "css":
        return toCssBlock(system);
      case "tailwind":
        return toTailwindConfig(system);
      case "tokens":
        return toDesignTokensJson(system);
      case "figma":
        return toFigmaTokensJson(system);
      case "typescript":
        return toTypeScriptTypes(system);
      case "react":
        return toReactComponent(system);
      case "google": {
        const href = toGoogleFontsLink(system);
        if (!href) return "<!-- هیچ فونت گوگلی فعالی نداری -->";
        return `<link rel="preconnect" href="https://fonts.googleapis.com" />\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n<link href="${href}" rel="stylesheet" />`;
      }
    }
  }, [mode, system]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `typography.${activeMode.ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 p-3 dark:border-gray-800">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          خروجی کد
        </h3>
        <div className="flex flex-wrap gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
                mode === m.id
                  ? "bg-white text-gray-900 shadow dark:bg-gray-950 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="max-h-[420px] overflow-auto bg-gray-950 p-3 text-[11px] leading-relaxed text-gray-100">
          <code>{content}</code>
        </pre>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 p-3 dark:border-gray-800">
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          {copied ? (
            <>
              <HiCheck className="h-3.5 w-3.5" /> کپی شد
            </>
          ) : (
            <>
              <HiClipboardCopy className="h-3.5 w-3.5" /> کپی
            </>
          )}
        </button>
        <button
          onClick={download}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <HiDownload className="h-3.5 w-3.5" />
          دانلود .{activeMode.ext}
        </button>
        <span className="ms-auto text-[10px] text-gray-400">
          {content.split("\n").length} خط · {activeMode.lang}
        </span>
      </div>
    </div>
  );
}