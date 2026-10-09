import type { IColorPalette } from "@/models/ColorPalette";
import { buildPaletteMap, resolveValue } from "./resolve-value";

/**
 * از values تم، یک آبجکت { "--bg-brand": "#f0fdf4" } می‌سازه.
 * فقط مقادیری که قابل resolve هستن (hex یا palette.shade) میان.
 */
export function buildCssVars(
  values: Record<string, string>,
  palettes: IColorPalette[]
): Record<string, string> {
  const paletteMap = buildPaletteMap(palettes);
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(values ?? {})) {
    if (!value) continue;
    const hex = resolveValue(value, paletteMap);
    if (!hex) continue;
    result[`--${key}`] = hex;
  }

  return result;
}