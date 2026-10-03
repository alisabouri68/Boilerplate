"use client";

import { useMemo } from "react";
import { useColorsStore } from "./colors-store";
import { useThemeStore, selectActiveTheme } from "./theme-store";
import { resolveTheme } from "./theme";
import { buildDynamicTokens } from "./semantic-tokens";

export function useThemeTokens() {
  const palettes = useColorsStore((s) => s.palettes);
  const semanticColors = useColorsStore((s) => s.semanticColors);
  const theme = useThemeStore(selectActiveTheme);

  return useMemo(() => {
    const dynamic = buildDynamicTokens(semanticColors);
    const resolved = resolveTheme(theme, palettes, dynamic);
    return {
      theme,
      values: resolved.values,
      states: resolved.states,
      missing: resolved.missing, // ← مهم
      dynamicTokens: dynamic,
    };
  }, [theme, palettes, semanticColors]);
}