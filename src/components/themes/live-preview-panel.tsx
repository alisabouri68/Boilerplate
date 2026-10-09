"use client";

import { useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreviewScope } from "./preview-scope";
import { ShowcaseFull } from "./preview/showcase";
import { buildCssVars } from "@/lib/export/build-css-vars";
import type { IColorPalette } from "@/models/ColorPalette";

interface LivePreviewPanelProps {
  values: Record<string, string>;
  palettes: IColorPalette[];
  onClose: () => void;
}

export function LivePreviewPanel({
  values,
  palettes,
  onClose,
}: LivePreviewPanelProps) {
  const cssVars = useMemo(
    () => buildCssVars(values, palettes),
    [values, palettes]
  );

  return (
    <div className="flex h-full w-full flex-col border-l bg-background">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">Live Preview</h3>
          <p className="text-xs text-muted-foreground">
            {Object.keys(cssVars).length} variables applied
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto bg-muted/30">
        <PreviewScope cssVars={cssVars}>
          <ShowcaseFull />
        </PreviewScope>
      </div>
    </div>
  );
}