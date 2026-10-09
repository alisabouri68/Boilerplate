import type { IColorPalette } from "@/models/ColorPalette";
import { buildPaletteMap, resolveValue } from "./resolve-value";
import type { ExportThemeInput } from "./theme-to-css";

export function themeToScss(
  theme: ExportThemeInput,
  palettes: IColorPalette[]
): string {
  const paletteMap = buildPaletteMap(palettes);
  const lines: string[] = [];

  lines.push(`// Theme: ${theme.name} (${theme.key})`);

  const validValues: Array<{ key: string; hex: string }> = [];

  for (const [key, value] of Object.entries(theme.values ?? {})) {
    if (!value) continue;
    const hex = resolveValue(value, paletteMap);
    if (!hex) continue;
    validValues.push({ key, hex });
  }

  if (validValues.length === 0) {
    lines.push(`// no values set`);
    return lines.join("\n");
  }

  validValues.sort((a, b) => a.key.localeCompare(b.key));

  for (const { key, hex } of validValues) {
    lines.push(`$${key}: ${hex};`);
  }

  return lines.join("\n");
}

export function multipleThemesToScss(
  themes: ExportThemeInput[],
  palettes: IColorPalette[]
): string {
  const blocks: string[] = [];

  for (const theme of themes) {
    blocks.push(themeToScss(theme, palettes));
    blocks.push("");
  }

  return blocks.join("\n").trim();
}