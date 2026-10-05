// src/lib/runtime/modules/theme/types.ts
import type { TypographySystem } from "@/lib/design-system/core/typography-types";
// ↑ یا هرجایی که TypographySystem داری

export type ThemeMode = "light" | "dark" | "system";
export type Direction = "rtl" | "ltr";
export type Density = "compact" | "normal" | "spacious";

/**
 * توکن‌های طراحی.
 * typography از قبل موجوده، بقیه به‌تدریج پر می‌شن.
 */
export type ThemeTokens = {
  typography: TypographySystem;

  // فازهای بعدی:
  colors: ColorTokens;
  spacing: SpacingTokens;
  radii: RadiiTokens;
  shadows: ShadowTokens;
  borders: BorderTokens;
  transitions: TransitionTokens;
  zIndex: ZIndexTokens;
};

export type ThemeState = {
  mode: ThemeMode;
  direction: Direction;
  density: Density;
  tokens: ThemeTokens;
  dirty: boolean;
  updatedAt: string | null;
};

/* ═══════════ Placeholder tokens (فازهای بعدی) ═══════════ */

export type ColorTokens = {
  palette: Record<string, string>;
  semantic: Record<string, string>;
};

export type SpacingTokens = {
  unit: number;
  scale: Record<string, number>;
};

export type RadiiTokens = Record<string, string>;
export type ShadowTokens = Record<string, string>;
export type BorderTokens = Record<string, string>;
export type TransitionTokens = Record<string, string>;
export type ZIndexTokens = Record<string, number>;
