// src/lib/runtime/modules/theme/slice.ts
import { createDefaultTheme } from "./defaults";

/**
 * Zustand slice برای theme.
 * فقط state رو تعریف می‌کنه؛ actions در ThemeModule هستن.
 */
export const createThemeState = () => ({
  theme: createDefaultTheme(),
});