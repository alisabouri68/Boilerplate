import type { IColorPalette } from "@/models/ColorPalette";

/* =====================================================================
   Types
   ===================================================================== */

export interface DSTheme {
  key: string;
  name: string;
  description?: string;
  isDefault: boolean;
  values: Record<string, string>;
}

export interface DesignSystemData {
  name: string;
  description?: string;
  themes: DSTheme[];
  palettes: IColorPalette[];
}

/* =====================================================================
   Theme → CSS Selector
   ===================================================================== */

/**
 * تم پیش‌فرض → :root
 * بقیه تم‌ها → .{key}
 */
export function getSelector(theme: DSTheme): string {
  if (theme.isDefault) return ":root";
  return `.${theme.key}`;
}

/* =====================================================================
   resolveValue
   ===================================================================== */

function buildPaletteMap(palettes: IColorPalette[]) {
  const map: Record<string, IColorPalette> = {};
  for (const p of palettes) map[p.key] = p;
  return map;
}

function isShadeKey(v: string): boolean {
  return /^\d+$/.test(v);
}

function resolveValue(
  value: string,
  paletteMap: Record<string, IColorPalette>,
): string | null {
  if (!value) return null;

  if (/^#([0-9a-fA-F]{3,8})$/.test(value)) return value;

  const match = value.match(/^([a-z0-9-]+)\.(\d+)$/);
  if (match) {
    const [, paletteKey, shadeKey] = match;
    if (!isShadeKey(shadeKey)) return null;

    const palette = paletteMap[paletteKey];
    if (palette) {
      const hex = (palette.shades as unknown as Record<string, string>)[
        shadeKey
      ];
      return hex ?? null;
    }
  }

  return null;
}

/* =====================================================================
   Build resolved values for a theme
   ===================================================================== */

interface ResolvedTheme {
  key: string;
  name: string;
  selector: string;
  isDefault: boolean;
  values: Array<{ key: string; hex: string }>;
}

function resolveTheme(
  theme: DSTheme,
  paletteMap: Record<string, IColorPalette>,
): ResolvedTheme {
  const resolved: Array<{ key: string; hex: string }> = [];

  for (const [key, value] of Object.entries(theme.values ?? {})) {
    if (!value) continue;
    const hex = resolveValue(value, paletteMap);
    if (!hex) continue;
    resolved.push({ key, hex });
  }

  resolved.sort((a, b) => a.key.localeCompare(b.key));

  return {
    key: theme.key,
    name: theme.name,
    selector: getSelector(theme),
    isDefault: theme.isDefault,
    values: resolved,
  };
}

/* =====================================================================
   Export CSS
   ===================================================================== */

export function exportToCss(ds: DesignSystemData): string {
  const paletteMap = buildPaletteMap(ds.palettes);
  const lines: string[] = [];

  // Header
  lines.push(`/* ============================================`);
  lines.push(`   Design System: ${ds.name}`);
  if (ds.description) lines.push(`   ${ds.description}`);
  lines.push(`   Generated: ${new Date().toISOString()}`);
  lines.push(`   ============================================ */`);
  lines.push("");

  // Themes
  for (const theme of ds.themes) {
    const resolved = resolveTheme(theme, paletteMap);

    lines.push(
      `/* Theme: ${resolved.name} (${resolved.key})${resolved.isDefault ? " — default" : ""} */`,
    );

    if (resolved.values.length === 0) {
      lines.push(`${resolved.selector} {`);
      lines.push(`  /* no values set */`);
      lines.push(`}`);
    } else {
      lines.push(`${resolved.selector} {`);
      for (const { key, hex } of resolved.values) {
        lines.push(`  --${key}: ${hex};`);
      }
      lines.push(`}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

/* =====================================================================
   Export SCSS
   ===================================================================== */

export function exportToScss(ds: DesignSystemData): string {
  const paletteMap = buildPaletteMap(ds.palettes);
  const lines: string[] = [];

  lines.push(`// ============================================`);
  lines.push(`// Design System: ${ds.name}`);
  if (ds.description) lines.push(`// ${ds.description}`);
  lines.push(`// Generated: ${new Date().toISOString()}`);
  lines.push(`// ============================================`);
  lines.push("");

  for (const theme of ds.themes) {
    const resolved = resolveTheme(theme, paletteMap);

    lines.push(`// Theme: ${resolved.name} (${resolved.key})`);

    if (resolved.values.length === 0) {
      lines.push(`// no values set`);
    } else {
      // SCSS variables با پیشوند تم
      for (const { key, hex } of resolved.values) {
        lines.push(`$${key}: ${hex};`);
      }
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

/* =====================================================================
   Export JSON
   ===================================================================== */

export function exportToJson(ds: DesignSystemData): string {
  const paletteMap = buildPaletteMap(ds.palettes);

  const output = {
    name: ds.name,
    description: ds.description,
    generatedAt: new Date().toISOString(),
    themes: ds.themes.map((theme) => {
      const resolved = resolveTheme(theme, paletteMap);
      const values: Record<string, string> = {};
      for (const { key, hex } of resolved.values) {
        values[key] = hex;
      }
      return {
        key: theme.key,
        name: theme.name,
        selector: getSelector(theme),
        isDefault: theme.isDefault,
        values,
      };
    }),
  };

  return JSON.stringify(output, null, 2);
}

/* =====================================================================
   Export Tailwind Config (bonus)
   ===================================================================== */

export function exportToTailwind(ds: DesignSystemData): string {
  const paletteMap = buildPaletteMap(ds.palettes);

  // استفاده از تم پیش‌فرض
  const defaultTheme = ds.themes.find((t) => t.isDefault) ?? ds.themes[0];

  if (!defaultTheme) {
    return `// No theme available`;
  }

  const resolved = resolveTheme(defaultTheme, paletteMap);
  const colors: Record<string, string> = {};

  for (const { key, hex } of resolved.values) {
    colors[key] = hex;
  }

  const lines: string[] = [];
  lines.push(`/** @type {import('tailwindcss').Config} */`);
  lines.push(`export default {`);
  lines.push(`  theme: {`);
  lines.push(`    extend: {`);
  lines.push(`      colors: {`);
  lines.push(`        /* Design System: ${ds.name} */`);
  lines.push(`        /* Theme: ${defaultTheme.name} */`);
  for (const { key, hex } of resolved.values) {
    lines.push(`        "${key}": "${hex}",`);
  }
  lines.push(`      },`);
  lines.push(`    },`);
  lines.push(`  },`);
  lines.push(`};`);

  return lines.join("\n");
}
