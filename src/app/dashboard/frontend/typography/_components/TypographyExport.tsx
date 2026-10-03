"use client";

import { useState } from "react";
import { useTypography } from "@/lib/design-system/typography-hooks";
import {
  toCssBlock,
  toTailwindConfig,
  toGoogleFontsLink,
} from "@/lib/design-system/typography-utils";

type Mode = "css" | "tailwind" | "google";

export default function TypographyExport() {
  const system = useTypography();
  const [mode, setMode] = useState<Mode>("css");
  const [copied, setCopied] = useState(false);

  const content =
    mode === "css"
      ? toCssBlock(system)
      : mode === "tailwind"
      ? toTailwindConfig(system)
      : toGoogleFontsLink(system) ||
        "<!-- هیچ فونت گوگلی فعالی نداری -->";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          خروجی کد
        </h3>
        <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
          {(["css", "tailwind", "google"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1 text-[11px] font-medium transition ${
                mode === m
                  ? "bg-white text-gray-900 shadow dark:bg-gray-950 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {m === "css" ? "CSS" : m === "tailwind" ? "Tailwind" : "Google Fonts"}
            </button>
          ))}
        </div>
      </div>

      <pre className="max-h-96 overflow-auto rounded-lg bg-gray-950 p-3 text-[11px] leading-relaxed text-gray-100">
        <code>{content}</code>
      </pre>

      <button
        onClick={copy}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
      >
        {copied ? "کپی شد ✓" : "کپی"}
      </button>
    </div>
  );
}