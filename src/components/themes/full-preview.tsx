"use client";

import { useMemo } from "react";
import { PreviewScope } from "./preview-scope";
import { ShowcaseFull } from "./preview/showcase";
import { buildCssVars } from "@/lib/export/build-css-vars";
import type { IColorPalette } from "@/models/ColorPalette";

interface FullPreviewProps {
  values: Record<string, string>;
  palettes: IColorPalette[];
}

export function FullPreview({ values, palettes }: FullPreviewProps) {
  const cssVars = useMemo(
    () => buildCssVars(values, palettes),
    [values, palettes]
  );

  const count = Object.keys(cssVars).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
        <div>
          <p className="text-sm font-medium">Preview Mode</p>
          <p className="text-xs text-muted-foreground">
            {count} CSS variables applied
          </p>
        </div>
      </div>

      <PreviewScope
        cssVars={cssVars}
        className="overflow-hidden rounded-lg border bg-white shadow-sm"
      >
        <ShowcaseFull />
      </PreviewScope>
    </div>
  );
}