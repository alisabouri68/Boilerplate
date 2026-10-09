import type { IColorPalette } from "@/models/ColorPalette";
import { buildPaletteMap, resolveValue } from "./resolve-value";
import type { ExportThemeInput } from "./theme-to-css";

/* =====================================================================
   JSON — برای یک تم
   ===================================================================== */

export function themeToJson(
  theme: ExportThemeInput,
  palettes: IColorPalette[]
): Record<string, string> {
  const paletteMap = buildPaletteMap(palettes);
  const result: Record<string, string> = {};

  const keys = Object.keys(theme.values ?? {}).sort();

  for (const key of keys) {
    const value = theme.values[key];
    if (!value) continue;
    const hex = resolveValue(value, paletteMap);
    if (!hex) continue;
    result[key] = hex;
  }

  return result;
}

/* =====================================================================
   JSON — برای چند تم
   ===================================================================== */

export interface MultiThemeJsonInput {
  key: string;
  name: string;
  selector: string;
  isDefault?: boolean;
  values: Record<string, string>;
}

export function multipleThemesToJson(
  themes: MultiThemeJsonInput[],
  palettes: IColorPalette[],
  systemName?: string
): string {
  const output = {
    name: systemName,
    themes: themes.map(t => ({
      key: t.key,
      name: t.name,
      selector: t.selector,
      isDefault: t.isDefault ?? false,
      values: themeToJson(
        { key: t.key, name: t.name, values: t.values },
        palettes
      ),
    })),
  };

  return JSON.stringify(output, null, 2);
}