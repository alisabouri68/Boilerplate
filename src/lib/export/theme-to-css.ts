import type { IColorPalette } from "@/models/ColorPalette";
import { buildPaletteMap, resolveValue } from "./resolve-value";

/* =====================================================================
   Types
   ===================================================================== */

export interface ExportThemeInput {
  key: string;
  name: string;
  values: Record<string, string>;
}

export interface ExportThemeOptions {
  selector: string;
  isDefault?: boolean;
}

/* =====================================================================
   Export to CSS
   ===================================================================== */

export function themeToCss(
  theme: ExportThemeInput,
  palettes: IColorPalette[],
  options: ExportThemeOptions
): string {
  const { selector, isDefault } = options;
  const paletteMap = buildPaletteMap(palettes);

  const lines: string[] = [];

  lines.push(
    `/* Theme: ${theme.name} (${theme.key})${isDefault ? " — default" : ""} */`
  );

  const validValues: Array<{ key: string; hex: string }> = [];

  for (const [key, value] of Object.entries(theme.values ?? {})) {
    if (!value) continue;
    const hex = resolveValue(value, paletteMap);
    if (!hex) continue;
    validValues.push({ key, hex });
  }

  if (validValues.length === 0) {
    lines.push(`${selector} {`);
    lines.push(`  /* no values set */`);
    lines.push(`}`);
    return lines.join("\n");
  }

  validValues.sort((a, b) => a.key.localeCompare(b.key));

  lines.push(`${selector} {`);
  for (const { key, hex } of validValues) {
    lines.push(`  --${key}: ${hex};`);
  }
  lines.push(`}`);

  return lines.join("\n");
}

/* =====================================================================
   Export multiple themes
   ===================================================================== */

export interface MultipleThemesInput {
  theme: ExportThemeInput;
  selector: string;
  isDefault?: boolean;
}

export function multipleThemesToCss(
  themes: MultipleThemesInput[],
  palettes: IColorPalette[],
  systemName?: string
): string {
  const blocks: string[] = [];

  if (systemName) {
    blocks.push(`/* ============================================`);
    blocks.push(`   Design System: ${systemName}`);
    blocks.push(`   ============================================ */`);
    blocks.push("");
  }

  for (const t of themes) {
    blocks.push(
      themeToCss(t.theme, palettes, {
        selector: t.selector,
        isDefault: t.isDefault,
      })
    );
    blocks.push("");
  }

  return blocks.join("\n").trim();
}