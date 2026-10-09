"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { SHADE_KEYS, type ShadeKey } from "@/lib/colors/palette-utils";
import type { IColorPalette } from "@/models/ColorPalette";

/* =====================================================================
   Helpers
   ===================================================================== */

function isShadeKey(v: string): v is ShadeKey {
  return (SHADE_KEYS as readonly string[]).includes(v);
}

function parseColor(
  value: string,
  palettes: IColorPalette[]
): string | null {
  if (!value) return null;

  // hex
  if (/^#([0-9a-fA-F]{3,8})$/.test(value)) return value;

  // palette.shade → "red.500"
  const match = value.match(/^([a-z0-9-]+)\.(\d+)$/);
  if (match) {
    const [, paletteKey, shadeKey] = match;
    if (!isShadeKey(shadeKey)) return null;

    const palette = palettes.find(p => p.key === paletteKey);
    if (palette) {
      return palette.shades[shadeKey] ?? null;
    }
  }

  return null;
}

/* =====================================================================
   Component
   ===================================================================== */

interface ThemeValuesCellProps {
  value: string;
  palettes: IColorPalette[];
  onChange: (value: string) => void;
}

export function ThemeValuesCell({
  value,
  palettes,
  onChange,
}: ThemeValuesCellProps) {
  const [open, setOpen] = useState(false);

  const hasValue = Boolean(value);
  const previewColor = parseColor(value, palettes);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-center gap-2 rounded-md border bg-background p-1.5 transition-colors hover:bg-accent"
        >
          <div
            className="h-6 w-6 shrink-0 rounded border"
            style={{
              backgroundColor: previewColor || "transparent",
              backgroundImage: previewColor
                ? undefined
                : "linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%)",
              backgroundSize: previewColor ? undefined : "8px 8px",
              backgroundPosition: previewColor
                ? undefined
                : "0 0, 4px 4px",
            }}
          />
          <span className="truncate text-xs font-mono text-left">
            {value || "—"}
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex flex-col gap-3">
          {/* Value input + native color picker */}
          <div className="flex items-center gap-2">
            <label className="relative cursor-pointer">
              <input
                type="color"
                value={previewColor || "#000000"}
                onChange={e => onChange(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div
                className="h-9 w-9 rounded-md border shadow-sm"
                style={{ backgroundColor: previewColor || "#000000" }}
              />
            </label>

            <Input
              dir="ltr"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="#000000 or palette-name"
              className="h-9 flex-1 font-mono text-xs"
            />

            {hasValue && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive"
                title="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Palettes */}
          {palettes.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                Palettes
              </p>
              <div className="max-h-72 overflow-y-auto pr-1">
                {palettes.map(palette => (
                  <div
                    key={palette._id?.toString() ?? palette.key}
                    className="mb-3"
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px]"
                      >
                        {palette.key}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {SHADE_KEYS.map(shadeKey => {
                        const hex = palette.shades?.[shadeKey];
                        if (!hex) return null;
                        const paletteValue = `${palette.key}.${shadeKey}`;
                        const isActive = value === paletteValue;

                        return (
                          <button
                            key={shadeKey}
                            type="button"
                            onClick={() => {
                              onChange(paletteValue);
                              setOpen(false);
                            }}
                            className={`relative h-6 w-6 rounded border transition-transform hover:scale-110 ${
                              isActive
                                ? "ring-2 ring-primary ring-offset-1"
                                : ""
                            }`}
                            style={{ backgroundColor: hex }}
                            title={`${paletteValue} (${hex})`}
                          >
                            <span className="sr-only">{paletteValue}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Helper */}
          <div className="rounded-md bg-muted p-2 text-[11px] text-muted-foreground">
            <p className="font-medium">Formats supported:</p>
            <ul className="mt-1 space-y-0.5 font-mono">
              <li>#22c55e — hex</li>
              <li>red.500 — palette reference</li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}