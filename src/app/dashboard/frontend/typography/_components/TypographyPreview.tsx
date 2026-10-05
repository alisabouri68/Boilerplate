// _components/TypographyPreview.tsx
"use client";

import { useMemo, useState } from "react";
import { useTypography } from "@/lib/runtime/react";
import {
  toGoogleFontsLink,
  toPreviewCss,
} from "@/lib/design-system/typography-exporters";
import { resolveAllStyles } from "@/lib/design-system/core/typography-utils";
import PreviewControls, {
  type PreviewConfig,
} from "./preview/PreviewControls";
import { buildPreviewHtml } from "./preview/build-preview-html";

export default function TypographyPreview() {
  const system = useTypography();

  const [config, setConfig] = useState<PreviewConfig>({
    sample: "article",
    theme: "light",
    direction: "rtl",
    density: "comfortable",
    width: "auto",
    showGuides: false,
    showLabels: true,
  });

  const resolved = useMemo(
    () => resolveAllStyles(system as any),
    [system]
  );

  const html = useMemo(
    () =>
      buildPreviewHtml({
        system,
        resolved,
        config,
        css: toPreviewCss(system as any),
        googleFontsHref: toGoogleFontsLink(system as any),
      }),
    [system, resolved, config]
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          پیش‌نمایش زنده
        </h3>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          {resolved.length} استایل فعال
        </span>
      </div>

      {/* Controls */}
      <PreviewControls config={config} onChange={setConfig} />

      {/* Frame */}
      <div className="relative">
        <div
          className={`mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-800 dark:bg-gray-950 ${
            config.width === "mobile" ? "max-w-[390px]" : ""
          } ${config.width === "tablet" ? "max-w-[768px]" : ""}`}
        >
          <iframe
            title="پیش‌نمایش تایپوگرافی"
            srcDoc={html}
            className="h-[560px] w-full border-0"
            sandbox="allow-same-origin"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}