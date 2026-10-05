// src/lib/runtime/modules/theme/defaults.ts
import { defaultTypography } from "@/lib/design-system/core/typography-default";
import type { ThemeState } from "./types";

/**
 * مقادیر پیش‌فرض Theme.
 *
 * typography از store فعلی import می‌شه.
 * بقیه tokens placeholder هستن تا فازهای بعدی.
 */
export function createDefaultTheme(): ThemeState {
  return {
    mode: "system",
    direction: "rtl",
    density: "normal",

    tokens: {
      typography: structuredClone(defaultTypography),

      // فازهای بعدی:
      colors: { palette: {}, semantic: {} },
      spacing: { unit: 4, scale: {} },
      radii: {},
      shadows: {},
      borders: {},
      transitions: {},
      zIndex: {},
    },

    dirty: false,
    updatedAt: null,
  };
}