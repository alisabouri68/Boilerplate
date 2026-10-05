// lib/typography/typography-exporters.ts
import type {
  TypographySystem,
  ResolvedTextStyle,
} from "./core/typography-types";
import { resolveAllStyles, resolveTextStyle } from "./core/typography-utils";

/* ================= CSS Variables ================= */
export function toCssVariables(system: TypographySystem): string {
  const lines: string[] = [];

  system.fontFamilies
    .filter((f) => f.active)
    .forEach((f) => lines.push(`  --font-${f.role}: ${f.stack};`));

  system.fontSizes
    .filter((s) => s.active)
    .forEach((s) =>
      lines.push(`  --text-${s.name}: ${s.rem}rem; /* ${s.px}px */`),
    );

  system.fontWeights
    .filter((w) => w.active)
    .forEach((w) => lines.push(`  --font-weight-${w.name}: ${w.value};`));

  system.lineHeights
    .filter((l) => l.active)
    .forEach((l) => lines.push(`  --leading-${l.name}: ${l.value};`));

  system.letterSpacings
    .filter((l) => l.active)
    .forEach((l) => lines.push(`  --tracking-${l.name}: ${l.value};`));

  // کامپوزیت: هر textStyle به‌صورت کلاس utility
  system.textStyles
    .filter((s) => s.active)
    .forEach((s) => {
      const r = resolveTextStyle(s, system);
      if (!r) return;
      lines.push(
        ``,
        `  /* ${s.name} */`,
        `  --style-${s.name}-size: ${r.fontSizeRem}rem;`,
        `  --style-${s.name}-weight: ${r.fontWeight};`,
        `  --style-${s.name}-leading: ${r.lineHeight};`,
        `  --style-${s.name}-tracking: ${r.letterSpacing};`,
      );
    });

  return lines.join("\n");
}

export const toCssBlock = (system: TypographySystem) =>
  `:root {\n${toCssVariables(system)}\n}\n`;

/* ================= Tailwind config ================= */
export function toTailwindConfig(system: TypographySystem): string {
  const families = system.fontFamilies
    .filter((f) => f.active)
    .map((f) => `        ${f.role}: [${JSON.stringify(f.stack)}],`)
    .join("\n");

  // اندازه‌ها با lineHeight پیش‌فرض از style هم‌نام (اگر باشد)
  const sizes = system.fontSizes
    .filter((s) => s.active)
    .map((s) => {
      const matched = system.textStyles.find((t) => t.name === s.name);
      const lh = matched
        ? resolveTextStyle(matched, system)?.lineHeight
        : undefined;
      const lhPart = lh ? `, { lineHeight: "${lh}" }` : "";
      return `        "${s.name}": ["${s.rem}rem"${lhPart}],`;
    })
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
import type { Config } from "tailwindcss";

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
} satisfies Config;
`;
}

/* ================= JSON Tokens (W3C Design Tokens) ================= */
export function toDesignTokens(system: TypographySystem) {
  const tokens: Record<string, unknown> = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    fontFamily: {} as Record<string, unknown>,
    fontSize: {} as Record<string, unknown>,
    fontWeight: {} as Record<string, unknown>,
    lineHeight: {} as Record<string, unknown>,
    letterSpacing: {} as Record<string, unknown>,
    textStyle: {} as Record<string, unknown>,
  };

  system.fontFamilies
    .filter((f) => f.active)
    .forEach((f) => {
      (tokens.fontFamily as any)[f.role] = { $value: f.stack };
    });

  system.fontSizes
    .filter((s) => s.active)
    .forEach((s) => {
      (tokens.fontSize as any)[s.name] = { $value: `${s.rem}rem` };
    });

  system.fontWeights
    .filter((w) => w.active)
    .forEach((w) => {
      (tokens.fontWeight as any)[w.name] = { $value: w.value };
    });

  system.lineHeights
    .filter((l) => l.active)
    .forEach((l) => {
      (tokens.lineHeight as any)[l.name] = { $value: l.value };
    });

  system.letterSpacings
    .filter((l) => l.active)
    .forEach((l) => {
      (tokens.letterSpacing as any)[l.name] = { $value: l.value };
    });

  resolveAllStyles(system).forEach((r) => {
    (tokens.textStyle as any)[r.name] = {
      $type: "typography",
      $value: {
        fontFamily: r.fontFamily ?? "{fontFamily.sans}",
        fontSize: `${r.fontSizeRem}rem`,
        fontWeight: r.fontWeight,
        lineHeight: r.lineHeight,
        letterSpacing: r.letterSpacing,
      },
    };
  });

  return tokens;
}

export const toDesignTokensJson = (s: TypographySystem) =>
  JSON.stringify(toDesignTokens(s), null, 2);

/* ================= TypeScript Types ================= */
export function toTypeScriptTypes(system: TypographySystem): string {
  const names = system.textStyles
    .filter((s) => s.active)
    .map((s) => `  | "${s.name}"`)
    .join("\n");

  const sizes = system.fontSizes
    .filter((s) => s.active)
    .map((s) => `  | "${s.name}"`)
    .join("\n");

  return `// typography.types.ts (auto-generated)
export type TextStyleName =
${names || "  never"};

export type FontSizeName =
${sizes || "  never"};

export const textStyles = {
${system.textStyles
  .filter((s) => s.active)
  .map((s) => {
    const r = resolveTextStyle(s, system);
    if (!r) return "";
    return `  ${JSON.stringify(s.name)}: {
    fontSize: "${r.fontSizeRem}rem",
    fontWeight: ${r.fontWeight},
    lineHeight: ${r.lineHeight},
    letterSpacing: "${r.letterSpacing}",
    ${r.fontFamily ? `fontFamily: ${JSON.stringify(r.fontFamily)},` : ""}
  },`;
  })
  .filter(Boolean)
  .join("\n")}
} as const;
`;
}

/* ================= Google Fonts Link ================= */
export function toGoogleFontsLink(system: TypographySystem): string {
  const families = system.fontFamilies
    .filter((f) => f.active && f.googleFont)
    .map((f) => `family=${f.googleFont}`)
    .join("&");

  if (!families) return "";
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/* ================= Figma Tokens ================= */
export function toFigmaTokens(system: TypographySystem) {
  const typography: Record<string, unknown> = {};

  resolveAllStyles(system).forEach((r) => {
    typography[r.name] = {
      fontFamily: r.fontFamily ?? "sans-serif",
      fontWeight: String(r.fontWeight),
      fontSize: `${r.fontSizeRem}rem`,
      lineHeight: `${Math.round(r.lineHeight * 100)}%`,
      letterSpacing: r.letterSpacing,
    };
  });

  return {
    global: {
      fontFamilies: Object.fromEntries(
        system.fontFamilies
          .filter((f) => f.active)
          .map((f) => [f.role, { value: f.stack }]),
      ),
      fontWeights: Object.fromEntries(
        system.fontWeights
          .filter((w) => w.active)
          .map((w) => [w.name, { value: String(w.value) }]),
      ),
      fontSizes: Object.fromEntries(
        system.fontSizes
          .filter((s) => s.active)
          .map((s) => [s.name, { value: `${s.rem}rem` }]),
      ),
      lineHeights: Object.fromEntries(
        system.lineHeights
          .filter((l) => l.active)
          .map((l) => [l.name, { value: `${Math.round(l.value * 100)}%` }]),
      ),
      letterSpacing: Object.fromEntries(
        system.letterSpacings
          .filter((l) => l.active)
          .map((l) => [l.name, { value: l.value }]),
      ),
      typography,
    },
  };
}

export const toFigmaTokensJson = (s: TypographySystem) =>
  JSON.stringify(toFigmaTokens(s), null, 2);

/* ================= React Component ================= */
export function toReactComponent(system: TypographySystem): string {
  const entries = resolveAllStyles(system)
    .map(
      (r) => `  ${JSON.stringify(r.name)}: {
    fontSize: "${r.fontSizeRem}rem",
    fontWeight: ${r.fontWeight},
    lineHeight: ${r.lineHeight},
    letterSpacing: "${r.letterSpacing}",
    ${r.fontFamily ? `fontFamily: ${JSON.stringify(r.fontFamily)},` : ""}
  },`,
    )
    .join("\n");

  return `import type { CSSProperties, ReactNode } from "react";

export const textStyleMap = {
${entries}
} as const satisfies Record<string, CSSProperties>;

export type TextStyleName = keyof typeof textStyleMap;

export function Text({
  variant = "body",
  as: Tag = "p",
  children,
  style,
  ...rest
}: {
  variant?: TextStyleName;
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  style?: CSSProperties;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag style={{ ...textStyleMap[variant], ...style }} {...rest}>
      {children}
    </Tag>
  );
}
`;
}

export function toPreviewCss(system: TypographySystem): string {
  return `:root {\n${toCssVariables(system)}\n}`;
}
