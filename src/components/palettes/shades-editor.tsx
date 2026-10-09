"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SHADE_KEYS, type ShadeKey } from "@/lib/colors/palette-utils";

interface ShadesEditorProps {
  value: Record<ShadeKey, string>;
  onChange: (v: Record<ShadeKey, string>) => void;
  errors?: Partial<Record<ShadeKey, string>>;
}

export function ShadesEditor({ value, onChange, errors }: ShadesEditorProps) {
  function setShade(key: ShadeKey, hex: string) {
    onChange({ ...value, [key]: hex });
  }

  return (
    <div className="space-y-2">
      <Label>Shades</Label>
      <div className="rounded-lg border">
        {SHADE_KEYS.map((key, idx) => {
          const hex = value[key] ?? "#000000";
          const isLast = idx === SHADE_KEYS.length - 1;
          const error = errors?.[key];

          return (
            <div
              key={key}
              className={`flex items-center gap-3 px-3 py-2 ${
                !isLast ? "border-b" : ""
              }`}
            >
              {/* Shade label */}
              <div className="w-12 shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
                {key}
              </div>

              {/* Native color picker */}
              <label className="relative cursor-pointer">
                <input
                  type="color"
                  value={hex.length === 7 ? hex : "#000000"}
                  onChange={e => setShade(key, e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div
                  className="h-8 w-8 rounded-md border shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: hex }}
                />
              </label>

              {/* Hex text input */}
              <Input
                dir="ltr"
                value={hex}
                onChange={e => setShade(key, e.target.value)}
                placeholder="#000000"
                className="h-8 max-w-[140px] font-mono text-xs"
              />

              {/* Live preview — on top of white */}
              <div className="ml-auto flex h-8 items-center gap-2 rounded-md border bg-white px-3 text-xs font-medium text-black">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: hex }}
                />
                Sample
              </div>

              {error && (
                <span className="text-xs text-destructive">{error}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}