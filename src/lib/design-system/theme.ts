import type { ColorPalette } from "./types";
import {
  SEMANTIC_TOKENS,
  type SemanticTokenDef,
} from "./semantic-tokens";

/* ---------------- انواع ---------------- */

export type ThemeMode = "light" | "dark" | "custom";

export type TokenRef = {
  palette: string;
  shade: string;
  fallback?: string;
};

export type TokenHex = { hex: string };

export type TokenValue = TokenRef | TokenHex;

export type Theme = {
  id: string;
  name: string;
  emoji?: string;
  mode: ThemeMode;
  builtin?: boolean;
  /** کلید: id توکن معنایی — مثل "bg-base" یا "primary-hover" */
  tokens: Record<string, TokenValue>;
};

export type ThemeTokenState = "resolved" | "fallback" | "missing" | "static";

export type ResolvedTheme = {
  values: Record<string, string>;
  states: Record<string, ThemeTokenState>;
  missing: string[];
};

/* ---------------- تشخیص نوع ---------------- */

export const isRef = (v: TokenValue | undefined): v is TokenRef =>
  !!v && typeof v === "object" && "palette" in v;

/* ---------------- Resolver ---------------- */

function findHex(palettes: ColorPalette[], ref: TokenRef): string | null {
  const p = palettes.find(
    (x) => x.name.toLowerCase() === ref.palette.toLowerCase()
  );
  if (!p) return null;
  return p.shades.find((s) => s.shade === ref.shade)?.hex ?? null;
}

export function resolveTheme(
  theme: Theme,
  palettes: ColorPalette[],
  extraTokens: SemanticTokenDef[] = []
): ResolvedTheme {
  const values: Record<string, string> = {};
  const states: Record<string, ThemeTokenState> = {};
  const missing: string[] = [];

  // کلیدها از کاتالوگ ثابت می‌آیند، نه از theme.tokens
  // این کار تضمین می‌کند حتی اگر تم ناقص باشد، همه توکن‌ها مقدار داشته باشند
  const allDefs: SemanticTokenDef[] = [
    ...SEMANTIC_TOKENS,
    ...extraTokens.filter(
      (d) => !SEMANTIC_TOKENS.some((s) => s.id === d.id)
    ),
  ];

  for (const def of allDefs) {
    const value = theme.tokens[def.id];

    if (!value) {
      const isStatic = SEMANTIC_TOKENS.some((t) => t.id === def.id);
      if (isStatic) missing.push(def.id);
      values[def.id] = "#000000";
      states[def.id] = "missing";
      continue;
    }

    if (isRef(value)) {
      const hex = findHex(palettes, value);
      if (hex) {
        values[def.id] = hex;
        states[def.id] = "resolved";
      } else {
        values[def.id] = value.fallback ?? "#000000";
        states[def.id] = "fallback";
      }
    } else {
      values[def.id] = value.hex;
      states[def.id] = "static";
    }
  }

  return { values, states, missing };
}

/* ---------------- اعتبارسنجی ---------------- */

export function isThemeComplete(theme: Theme): boolean {
  return SEMANTIC_TOKENS.every((t) => theme.tokens[t.id] !== undefined);
}

export function missingTokens(theme: Theme): string[] {
  return SEMANTIC_TOKENS.filter((t) => !theme.tokens[t.id]).map((t) => t.id);
}

/* ---------------- خروجی CSS ---------------- */

export function toCssVariables(resolved: ResolvedTheme): string {
  return SEMANTIC_TOKENS.map(
    (def) => `  ${def.cssVar}: ${resolved.values[def.id]};`
  ).join("\n");
}

export function toCssBlock(theme: Theme, resolved: ResolvedTheme): string {
  return `[data-theme="${theme.id}"] {\n${toCssVariables(resolved)}\n}`;
}

/* ---------------- برچسب خوانا ---------------- */

export function tokenResolutionLabel(value: TokenValue | undefined): string {
  if (!value) return "تعریف‌نشده";
  if (isRef(value)) return `از پالت: ${value.palette} · ${value.shade}`;
  return `ثابت: ${value.hex}`;
}

/* ---------------- تولید تم از seed ---------------- */

export type ThemePreset = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryHover: string;
  primaryActive: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  contrast: string;
};

export function buildTheme(
  id: string,
  name: string,
  mode: ThemeMode,
  seed: ThemePreset,
  emoji?: string
): Theme {
  return {
    id,
    name,
    emoji,
    mode,
    tokens: {
      "bg-base": { hex: seed.background },
      "bg-surface": { hex: seed.surface },
      "bg-elevated": { hex: seed.surface },
      "bg-subtle": { hex: seed.surfaceAlt },

      "border-default": { hex: seed.border },
      "border-subtle": { hex: seed.border },
      "border-strong": { hex: seed.borderStrong },

      "text-primary": { hex: seed.textPrimary },
      "text-secondary": { hex: seed.textSecondary },
      "text-tertiary": { hex: seed.textTertiary },
      "text-inverse": { hex: seed.contrast },

      primary: { hex: seed.primary },
      "primary-hover": { hex: seed.primaryHover },
      "primary-active": { hex: seed.primaryActive },
      "primary-focus": { hex: seed.primary },
      "primary-disabled": { hex: seed.border },

      success: { hex: seed.success },
      "success-bg": { hex: seed.success + "1A" },
      "success-border": { hex: seed.success + "55" },

      warning: { hex: seed.warning },
      "warning-bg": { hex: seed.warning + "1A" },
      "warning-border": { hex: seed.warning + "55" },

      danger: { hex: seed.danger },
      "danger-bg": { hex: seed.danger + "1A" },
      "danger-border": { hex: seed.danger + "55" },

      info: { hex: seed.info },
      "info-bg": { hex: seed.info + "1A" },
      "info-border": { hex: seed.info + "55" },
    },
  };
}