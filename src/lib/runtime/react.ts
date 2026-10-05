// src/lib/runtime/react.ts
"use client";

import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { runtime } from "./runtime-manager";
import type { RuntimeState } from "./types";
import type {
  ThemeState,
  ThemeMode,
  Direction,
  Density,
} from "./modules/theme/types";
import type {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from "@/lib/design-system/core/typography-types";
/* ═══════════════════════════════════════════════════════════
 * Core: Generic Runtime Selector
 * ═══════════════════════════════════════════════════════════ */

/**
 * انتخاب هر بخشی از runtime با re-render خودکار.
 *
 * @example
 * const mode = useRuntime((r) => r.theme.mode);
 * const { user, theme } = useRuntime(
 *   useShallow((r) => ({ user: r.session.user, theme: r.theme.mode }))
 * );
 */
export function useRuntime<T>(selector: (state: RuntimeState) => T): T {
  return useStore(runtime._store, useShallow(selector));
}

/* ═══════════════════════════════════════════════════════════
 * Theme
 * ═══════════════════════════════════════════════════════════ */

/**
 * State theme با selector.
 *
 * @example
 * const mode = useTheme((t) => t.mode);
 * const direction = useTheme((t) => t.direction);
 * const primary = useTheme((t) => t.tokens.colors.semantic.primary);
 */
export function useTheme<T>(selector: (theme: ThemeState) => T): T {
  return useRuntime((r) => selector(r.theme));
}

/* shortcuts — برای موارد پرکاربرد */

export const useThemeMode = () => useTheme((t) => t.mode);
export const useThemeDirection = () => useTheme((t) => t.direction);
export const useThemeDensity = () => useTheme((t) => t.density);
export const useThemeTokens = () => useTheme((t) => t.tokens);
export const useTypography = () => useTheme((t) => t.tokens.typography);
export const useColors = () => useTheme((t) => t.tokens.colors);
export const useSpacing = () => useTheme((t) => t.tokens.spacing);

/* ═══════════════════════════════════════════════════════════
 * Direct Runtime Access
 * ═══════════════════════════════════════════════════════════ */

/**
 * دسترسی مستقیم به runtime برای actionها.
 * نیازی به re-render نداره — ازش برای onClick و useEffect استفاده کن.
 *
 * @example
 * const rt = useRuntimeAPI();
 * <button onClick={() => rt.theme.toggleMode()}>
 */
export function useRuntimeAPI() {
  return runtime;
}

/* ═══════════════════════════════════════════════════════════
 * Initialize (Provider-like helper)
 * ═══════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";

/**
 * در layout اصلی اپ استفاده کن.
 * یه بار runtime رو initialize می‌کنه.
 *
 * @example
 * // در app/layout.tsx
 * function RootLayout({ children }) {
 *   useRuntimeInit();
 *   return <html>...</html>;
 * }
 */
export function useRuntimeInit(): void {
  useEffect(() => {
    if (!runtime.isInitialized) {
      void runtime.initialize();
    }
  }, []);
}

/* ═══════════════════════════════════════════════════════════
 * Undo/Redo (reactive)
 * ═══════════════════════════════════════════════════════════ */

import { useState } from "react";

/**
 * وضعیت undo/redo با re-render خودکار.
 *
 * @example
 * const { past, future, canUndo, canRedo } = useRuntimeHistory();
 * <button disabled={!canUndo} onClick={() => runtime.undo()}>↶</button>
 */
export function useRuntimeHistory() {
  const [state, setState] = useState(() => runtime.history);

  useEffect(() => {
    const temporal = (runtime._store as any).temporal;
    return temporal.subscribe((s: any) => {
      setState({
        past: s.pastStates.length,
        future: s.futureStates.length,
      });
    });
  }, []);

  return {
    ...state,
    canUndo: state.past > 0,
    canRedo: state.future > 0,
  };
}
// src/lib/runtime/react.ts (ادامه)

/* ═══════════════════════════════════════════════════════════
 * Typography
 * ═══════════════════════════════════════════════════════════ */



export const useFontFamilies = () => useTypography().fontFamilies;
export const useFontSizes    = () => useTypography().fontSizes;
export const useFontWeights  = () => useTypography().fontWeights;
export const useLineHeights  = () => useTypography().lineHeights;
export const useLetterSpacings = () => useTypography().letterSpacings;
export const useTextStyles   = () => useTypography().textStyles;

/* ═══════════════════════════════════════════════════════════
 * Subscription shortcuts (typography)
 * ═══════════════════════════════════════════════════════════ */

export function useFontFamiliesSubscription(listener: (f: FontFamily[]) => void) {
  const ref = useRef(listener);
  ref.current = listener;
  useEffect(() => runtime.theme.onTypographyChange((t) => ref.current(t.fontFamilies)), []);
}
// src/lib/runtime/react.ts — به انتهای فایل اضافه کن

/* ═══════════════════════════════════════════════════════════
 * A11y — Selectors
 * ═══════════════════════════════════════════════════════════ */

import { useMemo } from "react";
import { auditSystem } from "@/lib/design-system/typography-a11y";

/**
 * گزارش خودکار دسترس‌پذیری از typography فعلی.
 * هر بار typography عوض بشه، دوباره حساب می‌شه.
 */
export function useA11yReport() {
  const typography = useTypography();
  return useMemo(() => auditSystem(typography), [typography]);
}