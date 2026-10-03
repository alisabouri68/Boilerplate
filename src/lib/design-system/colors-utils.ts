/* ---------- ID ---------- */
export const uid = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6 && clean.length !== 3) return null;

  const expanded =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;

  const num = parseInt(expanded, 16);
  if (Number.isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
export function rgbToHex(r: number, g: number, b: number) {
  const f = (n: number) => n.toString(16).padStart(2, "0");
  return `#${f(r)}${f(g)}${f(b)}`;
}

export function hexToHsl(hex: string): {
  h: number;
  s: number;
  l: number;
} {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    // fallback امن
    return { h: 0, s: 0, l: 0 };
  }

  const { r, g, b } = rgb;
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      case bn:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
export function hslToHex(h: number, s: number, l: number) {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  );
}

export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const { r, g, b } = rgb;
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function contrastRatio(hex1: string, hex2: string) {
  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (a + 0.05) / (b + 0.05);
}

export function wcagLabel(ratio: number) {
  if (ratio >= 7) return { label: "AAA", color: "#059669" };
  if (ratio >= 4.5) return { label: "AA", color: "#10b981" };
  if (ratio >= 3) return { label: "AA Large", color: "#f59e0b" };
  return { label: "Fail", color: "#dc2626" };
}

export function bestTextColor(bg: string) {
  return contrastRatio(bg, "#ffffff") >= contrastRatio(bg, "#000000")
    ? "#ffffff"
    : "#111827";
}

/* ---------- تولید پالت از یک رنگ پایه ---------- */
const SHADE_STEPS = [
  { shade: "50", l: 97 },
  { shade: "100", l: 93 },
  { shade: "200", l: 86 },
  { shade: "300", l: 76 },
  { shade: "400", l: 64 },
  { shade: "500", l: 52 },
  { shade: "600", l: 42 },
  { shade: "700", l: 34 },
  { shade: "800", l: 26 },
  { shade: "900", l: 19 },
];

export function generateShades(baseHex: string, tokenPrefix = "new"): ColorShade[] {
  const { h, s } = hexToHsl(baseHex);
  return SHADE_STEPS.map(({ shade, l }) => {
    const hex = hslToHex(h, Math.min(s + 6, 100), l);
    return {
      id: uid(),
      shade,
      token: `${tokenPrefix}-${shade}`,
      hex,
      active: true,
    };
  });
}

/* ---------- کپی در clipboard ---------- */
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/* ---------- خروجی CSS ---------- */
export function toCssVariables(palettes: ColorPalette[], semantics: SemanticColor[]) {
  const lines: string[] = [":root {"];
  palettes
    .filter((p) => p.active)
    .forEach((p) => {
      const prefix = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      p.shades
        .filter((s) => s.active)
        .forEach((s) => lines.push(`  --${prefix}-${s.shade}: ${s.hex};`));
    });
  semantics
    .filter((c) => c.active)
    .forEach((c) => {
      const key = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      lines.push(`  --color-${key}: ${c.hex};`);
      lines.push(`  --color-${key}-text: ${c.textHex};`);
    });
  lines.push("}");
  return lines.join("\n");
}

/* ---------- خروجی Tailwind ---------- */
export function toTailwindConfig(palettes: ColorPalette[], semantics: SemanticColor[]) {
  const colors: Record<string, any> = {};
  palettes
    .filter((p) => p.active)
    .forEach((p) => {
      const key = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      colors[key] = {};
      p.shades
        .filter((s) => s.active)
        .forEach((s) => {
          colors[key][s.shade] = s.hex;
        });
    });

  const semantic: Record<string, any> = {};
  semantics
    .filter((c) => c.active)
    .forEach((c) => {
      const key = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      semantic[key] = { DEFAULT: c.hex, foreground: c.textHex };
    });

  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify({ ...colors, ...semantic }, null, 8).replace(/"/g, "'")}
    }
  }
};`;
}

import type { ColorPalette, ColorShade, SemanticColor } from "./types";
