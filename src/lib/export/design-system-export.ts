import type { IColorPalette } from "@/models/ColorPalette";
import type { IFontFamily } from "@/models/FontFamily";
import type { IFontSize } from "@/models/FontSize";
import type { IFontWeight } from "@/models/FontWeight";

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

export interface TypographyData {
  families: {
    sans?: IFontFamily;
    serif?: IFontFamily;
    mono?: IFontFamily;
    display?: IFontFamily;
    handwriting?: IFontFamily;
  };
  sizes: IFontSize[];
  weights: IFontWeight[];
}

export interface DesignSystemData {
  name: string;
  description?: string;
  themes: DSTheme[];
  palettes: IColorPalette[];
  typography?: TypographyData;
}

/* =====================================================================
   Palette resolution
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
  paletteMap: Record<string, IColorPalette>
): string | null {
  if (!value) return null;

  // hex
  if (/^#([0-9a-fA-F]{3,8})$/.test(value)) return value;

  // palette.shade → "green.500"
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
   Theme resolution
   ===================================================================== */

interface ResolvedTheme {
  key: string;
  name: string;
  selector: string;
  isDefault: boolean;
  values: Array<{ key: string; hex: string }>;
}

function getSelector(theme: DSTheme): string {
  if (theme.isDefault) return ":root";
  return `.${theme.key}`;
}

function resolveTheme(
  theme: DSTheme,
  paletteMap: Record<string, IColorPalette>
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
   Typography CSS
   ===================================================================== */

function buildGoogleImport(font: IFontFamily): string | null {
  if (font.source !== "google" || !font.googleFamily) return null;

  const weights = (font.weights ?? []).sort((a, b) => a - b).join(";");
  const family = font.googleFamily.replace(/\s+/g, "+");

  return `@import url("https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap");`;
}

function buildFontFace(font: IFontFamily): string[] {
  if (font.source !== "custom" && font.source !== "local") return [];

  const lines: string[] = [];
  const files = font.files ?? [];
  if (files.length === 0) return [];

  // گروه‌بندی بر اساس weight + style
  const grouped = new Map<string, typeof files>();
  for (const f of files) {
    const key = `${f.weight}-${f.style}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(f);
  }

  for (const [, groupFiles] of grouped) {
    const first = groupFiles[0];
    lines.push(`@font-face {`);
    lines.push(`  font-family: "${font.name}";`);

    const src = groupFiles
      .map(f => `url("${f.url}") format("${f.format}")`)
      .join(",\n       ");
    lines.push(`  src: ${src};`);

    lines.push(`  font-weight: ${first.weight};`);
    lines.push(`  font-style: ${first.style};`);
    lines.push(`  font-display: swap;`);
    lines.push(`}`);
    lines.push("");
  }

  return lines;
}

export function buildTypographyCss(data: TypographyData): string {
  const lines: string[] = [];

  /* -------------------- Collect fonts -------------------- */

  const allFonts: IFontFamily[] = [];
  for (const f of [
    data.families.sans,
    data.families.serif,
    data.families.mono,
    data.families.display,
    data.families.handwriting,
  ]) {
    if (f && !allFonts.find(x => String(x._id) === String(f._id))) {
      allFonts.push(f);
    }
  }

  /* -------------------- Font faces / imports -------------------- */

  const googleImports: string[] = [];
  const fontFaces: string[] = [];

  for (const font of allFonts) {
    const imp = buildGoogleImport(font);
    if (imp) googleImports.push(imp);

    const faces = buildFontFace(font);
    fontFaces.push(...faces);
  }

  if (googleImports.length > 0) {
    lines.push(`/* Google Fonts */`);
    lines.push(...googleImports);
    lines.push("");
  }

  if (fontFaces.length > 0) {
    lines.push(`/* Custom Fonts */`);
    lines.push(...fontFaces);
  }

  /* -------------------- CSS Variables -------------------- */

  lines.push(`:root {`);

  const fallbacks: Record<string, string> = {
    sans: "ui-sans-serif, system-ui, sans-serif",
    serif: "ui-serif, Georgia, serif",
    mono: "ui-monospace, SFMono-Regular, monospace",
    display: "ui-sans-serif, system-ui, sans-serif",
    handwriting: "cursive",
  };

  // Font families
  const roles: Array<keyof typeof data.families> = [
    "sans",
    "serif",
    "mono",
    "display",
    "handwriting",
  ];

  for (const role of roles) {
    const font = data.families[role];
    if (!font) continue;
    lines.push(`  --font-${role}: "${font.name}", ${fallbacks[role]};`);
  }

  lines.push("");

  // Font sizes
  if (data.sizes.length > 0) {
    lines.push(`  /* Font sizes */`);
    const sorted = [...data.sizes].sort((a, b) => a.order - b.order);
    for (const s of sorted) {
      lines.push(`  --text-${s.key}: ${s.value};`);
      if (s.lineHeight) {
        lines.push(`  --text-${s.key}--line-height: ${s.lineHeight};`);
      }
      if (s.letterSpacing) {
        lines.push(`  --text-${s.key}--letter-spacing: ${s.letterSpacing};`);
      }
    }
    lines.push("");
  }

  // Font weights
  if (data.weights.length > 0) {
    lines.push(`  /* Font weights */`);
    const sorted = [...data.weights].sort((a, b) => a.order - b.order);
    for (const w of sorted) {
      lines.push(`  --font-${w.key}: ${w.value};`);
    }
  }

  lines.push(`}`);

  return lines.join("\n").trim();
}

/* =====================================================================
   Export to CSS
   ===================================================================== */

export function exportToCss(ds: DesignSystemData): string {
  const blocks: string[] = [];

  // Header
  blocks.push(`/* ============================================`);
  blocks.push(`   Design System: ${ds.name}`);
  if (ds.description) blocks.push(`   ${ds.description}`);
  blocks.push(`   Generated: ${new Date().toISOString()}`);
  blocks.push(`   ============================================ */`);
  blocks.push("");

  // Typography
  if (ds.typography) {
    blocks.push(`/* ==================== Typography ==================== */`);
    blocks.push(buildTypographyCss(ds.typography));
    blocks.push("");
  }

  // Themes
  const paletteMap = buildPaletteMap(ds.palettes);

  for (const theme of ds.themes) {
    const resolved = resolveTheme(theme, paletteMap);
    blocks.push(
      `/* Theme: ${resolved.name} (${resolved.key})${resolved.isDefault ? " — default" : ""} */`
    );
    if (resolved.values.length === 0) {
      blocks.push(`${resolved.selector} { /* no values set */ }`);
    } else {
      blocks.push(`${resolved.selector} {`);
      for (const { key, hex } of resolved.values) {
        blocks.push(`  --${key}: ${hex};`);
      }
      blocks.push(`}`);
    }
    blocks.push("");
  }

  return blocks.join("\n").trim();
}

/* =====================================================================
   Export to SCSS
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

  if (ds.typography) {
    lines.push(`// Typography`);
    const t = ds.typography;
    const roles: Array<keyof typeof t.families> = [
      "sans",
      "serif",
      "mono",
      "display",
      "handwriting",
    ];

    for (const role of roles) {
      const font = t.families[role];
      if (font) lines.push(`$font-${role}: "${font.name}";`);
    }

    for (const s of [...t.sizes].sort((a, b) => a.order - b.order)) {
      lines.push(`$text-${s.key}: ${s.value};`);
      if (s.lineHeight) lines.push(`$text-${s.key}--line-height: ${s.lineHeight};`);
    }

    for (const w of [...t.weights].sort((a, b) => a.order - b.order)) {
      lines.push(`$font-${w.key}: ${w.value};`);
    }
    lines.push("");
  }

  for (const theme of ds.themes) {
    const resolved = resolveTheme(theme, paletteMap);
    lines.push(`// Theme: ${resolved.name} (${resolved.key})`);

    if (resolved.values.length === 0) {
      lines.push(`// no values set`);
    } else {
      for (const { key, hex } of resolved.values) {
        lines.push(`$${key}: ${hex};`);
      }
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

/* =====================================================================
   Export to JSON
   ===================================================================== */

export function exportToJson(ds: DesignSystemData): string {
  const paletteMap = buildPaletteMap(ds.palettes);

  const output = {
    name: ds.name,
    description: ds.description,
    generatedAt: new Date().toISOString(),
    typography: ds.typography
      ? {
          families: {
            sans: ds.typography.families.sans?.name,
            serif: ds.typography.families.serif?.name,
            mono: ds.typography.families.mono?.name,
            display: ds.typography.families.display?.name,
            handwriting: ds.typography.families.handwriting?.name,
          },
          sizes: ds.typography.sizes.map(s => ({
            key: s.key,
            value: s.value,
            lineHeight: s.lineHeight,
          })),
          weights: ds.typography.weights.map(w => ({
            key: w.key,
            value: w.value,
          })),
        }
      : undefined,
    themes: ds.themes.map(theme => {
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
   Export to Tailwind
   ===================================================================== */

export function exportToTailwind(ds: DesignSystemData): string {
  const paletteMap = buildPaletteMap(ds.palettes);

  const defaultTheme =
    ds.themes.find(t => t.isDefault) ?? ds.themes[0];

  if (!defaultTheme) {
    return `// No theme available`;
  }

  const resolved = resolveTheme(defaultTheme, paletteMap);
  const lines: string[] = [];

  lines.push(`/** @type {import('tailwindcss').Config} */`);
  lines.push(`export default {`);
  lines.push(`  theme: {`);
  lines.push(`    extend: {`);

  // Colors
  lines.push(`      colors: {`);
  lines.push(`        /* Design System: ${ds.name} */`);
  for (const { key, hex } of resolved.values) {
    lines.push(`        "${key}": "${hex}",`);
  }
  lines.push(`      },`);

  // Typography
  if (ds.typography) {
    const t = ds.typography;

    lines.push(`      fontFamily: {`);
    if (t.families.sans) lines.push(`        sans: ["${t.families.sans.name}", "sans-serif"],`);
    if (t.families.serif) lines.push(`        serif: ["${t.families.serif.name}", "serif"],`);
    if (t.families.mono) lines.push(`        mono: ["${t.families.mono.name}", "monospace"],`);
    lines.push(`      },`);

    if (t.sizes.length > 0) {
      lines.push(`      fontSize: {`);
      for (const s of [...t.sizes].sort((a, b) => a.order - b.order)) {
        const parts = [`"${s.value}"`];
        if (s.lineHeight) parts.push(`"${s.lineHeight}"`);
        lines.push(`        "${s.key}": [${parts.join(", ")}],`);
      }
      lines.push(`      },`);
    }

    if (t.weights.length > 0) {
      lines.push(`      fontWeight: {`);
      for (const w of [...t.weights].sort((a, b) => a.order - b.order)) {
        lines.push(`        "${w.key}": "${w.value}",`);
      }
      lines.push(`      },`);
    }
  }

  lines.push(`    },`);
  lines.push(`  },`);
  lines.push(`};`);

  return lines.join("\n");
}