import { SHADE_KEYS, type ShadeKey } from "@/lib/colors/palette-utils";
import type { IColorPalette } from "@/models/ColorPalette";

/* =====================================================================
   Types
   ===================================================================== */

export interface PaletteMap {
  [key: string]: IColorPalette;
}

/* =====================================================================
   Build Palette Map
   ===================================================================== */

export function buildPaletteMap(palettes: IColorPalette[]): PaletteMap {
  const map: PaletteMap = {};
  for (const p of palettes) {
    map[p.key] = p;
  }
  return map;
}

/* =====================================================================
   Resolve one value
   ===================================================================== */

/**
 * تبدیل مقدار ذخیره‌شده به hex
 *
 *   "#22c55e"   → "#22c55e"
 *   "green.500" → "؟" (از palette map)
 *   "var(...)"  → "؟" (خالی، چون نمی‌تونیم resolve کنیم)
 *   "anything"  → "؟" (خالی)
 */
export function resolveValue(
  value: string,
  palettes: PaletteMap
): string | null {
  if (!value) return null;

  // hex
  if (/^#([0-9a-fA-F]{3,8})$/.test(value)) return value;

  // palette.shade
  const match = value.match(/^([a-z0-9-]+)\.(\d+)$/);
  if (match) {
    const [, paletteKey, shadeKey] = match;
    if (!isShadeKey(shadeKey)) return null;

    const palette = palettes[paletteKey];
    if (palette && shadeKey in palette.shades) {
      const hex = palette.shades[shadeKey as ShadeKey];
      return hex ?? null;
    }
  }

  return null;
}

/* =====================================================================
   Helpers
   ===================================================================== */

function isShadeKey(v: string): v is ShadeKey {
  return (SHADE_KEYS as readonly string[]).includes(v);
}

/** تبدیل شید کامل به hex — برای Export دقیق */
export function shadeToHex(
  palette: IColorPalette,
  shade: string
): string | null {
  if (!isShadeKey(shade)) return null;
  return palette.shades[shade] ?? null;
}