import type {
  TypographySystem,
  TextStyle,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  FontFamily,
} from "./typography-types";

/* ---------- تبدیل واحد ---------- */

export const pxToRem = (px: number, root = 16) =>
  Math.round((px / root) * 1000) / 1000;

export const remToPx = (rem: number, root = 16) =>
  Math.round(rem * root);

/* ---------- حل یک TextStyle ---------- */

export type ResolvedTextStyle = {
  id: string;
  name: string;
  fontSize: number;       // px
  fontSizeRem: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
  fontFamily?: string;    // stack
  note?: string;
};

export function resolveTextStyle(
  style: TextStyle,
  system: TypographySystem
): ResolvedTextStyle | null {
  const size = system.fontSizes.find((s) => s.id === style.fontSizeId);
  const weight = system.fontWeights.find((w) => w.id === style.fontWeightId);
  const lh = system.lineHeights.find((l) => l.id === style.lineHeightId);
  const ls = style.letterSpacingId
    ? system.letterSpacings.find((l) => l.id === style.letterSpacingId)
    : undefined;
  const ff = style.fontFamilyId
    ? system.fontFamilies.find((f) => f.id === style.fontFamilyId)
    : undefined;

  if (!size || !weight || !lh) return null;

  return {
    id: style.id,
    name: style.name,
    fontSize: size.px,
    fontSizeRem: size.rem,
    fontWeight: weight.value,
    lineHeight: lh.value,
    letterSpacing: ls?.value ?? "0",
    fontFamily: ff?.stack,
    note: style.note,
  };
}

/* ---------- خروجی CSS ---------- */

export function toCssVariables(system: TypographySystem): string {
  const lines: string[] = [];

  // فونت‌ها
  system.fontFamilies
    .filter((f) => f.active)
    .forEach((f) => {
      lines.push(`  --font-${f.role}: ${f.stack};`);
    });

  // سایزها
  system.fontSizes
    .filter((s) => s.active)
    .forEach((s) => {
      lines.push(`  --text-${s.name}: ${s.rem}rem; /* ${s.px}px */`);
    });

  // وزن‌ها
  system.fontWeights
    .filter((w) => w.active)
    .forEach((w) => {
      lines.push(`  --font-weight-${w.name}: ${w.value};`);
    });

  // line-height ها
  system.lineHeights
    .filter((l) => l.active)
    .forEach((l) => {
      lines.push(`  --leading-${l.name}: ${l.value};`);
    });

  // letter-spacing ها
  system.letterSpacings
    .filter((l) => l.active)
    .forEach((l) => {
      lines.push(`  --tracking-${l.name}: ${l.value};`);
    });

  // text styles (کامپوزیت)
  system.textStyles
    .filter((s) => s.active)
    .forEach((s) => {
      const r = resolveTextStyle(s, system);
      if (!r) return;
      lines.push(
        `  /* ${s.name} */`,
        `  --style-${s.name}-size: ${r.fontSizeRem}rem;`,
        `  --style-${s.name}-weight: ${r.fontWeight};`,
        `  --style-${s.name}-leading: ${r.lineHeight};`
      );
      if (r.letterSpacing !== "0") {
        lines.push(`  --style-${s.name}-tracking: ${r.letterSpacing};`);
      }
    });

  return lines.join("\n");
}

export function toCssBlock(system: TypographySystem): string {
  return `:root {\n${toCssVariables(system)}\n}`;
}

/* ---------- خروجی Tailwind ---------- */

export function toTailwindConfig(system: TypographySystem): string {
  const families = system.fontFamilies
    .filter((f) => f.active)
    .map((f) => `        ${f.role}: [${JSON.stringify(f.stack)}],`)
    .join("\n");

  const sizes = system.fontSizes
    .filter((s) => s.active)
    .map(
      (s) =>
        `        "${s.name}": ["${s.rem}rem", { lineHeight: "1.75" }],`
    )
    .join("\n");

  const weights = system.fontWeights
    .filter((w) => w.active)
    .map((w) => `        "${w.name}": "${w.value}",`)
    .join("\n");

  const lineHeights = system.lineHeights
    .filter((l) => l.active)
    .map((l) => `        "${l.name}": "${l.value}",`)
    .join("\n");

  const letterSpacings = system.letterSpacings
    .filter((l) => l.active)
    .map((l) => `        "${l.name}": "${l.value}",`)
    .join("\n");

  return `// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
${families}
      },
      fontSize: {
${sizes}
      },
      fontWeight: {
${weights}
      },
      lineHeight: {
${lineHeights}
      },
      letterSpacing: {
${letterSpacings}
      },
    },
  },
};`;
}

/* ---------- خروجی Google Fonts ---------- */

export function toGoogleFontsLink(system: TypographySystem): string {
  const families = system.fontFamilies
    .filter((f) => f.active && f.googleFont)
    .map((f) => `family=${f.googleFont}`)
    .join("&");

  if (!families) return "";
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export const uid = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);