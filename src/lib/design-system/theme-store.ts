"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_THEMES } from "./theme-presets";
import { uid } from "./colors-utils";
import type { Theme, ThemeMode, TokenValue } from "./theme";

interface ThemeState {
  themes: Theme[];
  activeThemeId: string;

  setActive: (id: string) => void;
  addTheme: (theme: Omit<Theme, "id"> & { id?: string }) => string;
  updateTheme: (id: string, patch: Partial<Theme>) => void;
  removeTheme: (id: string) => void;
  duplicateTheme: (id: string) => string | null;
  resetBuiltins: () => void;
  setTokenValue: (themeId: string, tokenId: string, value: TokenValue) => void;
  clearToken: (themeId: string, tokenId: string) => void;
  renameTheme: (id: string, name: string) => boolean;
}

const BUILTIN_IDS = new Set(DEFAULT_THEMES.map((t) => t.id));

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themes: DEFAULT_THEMES,
      activeThemeId: DEFAULT_THEMES[0].id,

      setActive: (id) => {
        if (!get().themes.some((t) => t.id === id)) return;
        set({ activeThemeId: id });
      },

      addTheme: (partial) => {
        const id = partial.id ?? `theme-${uid().slice(0, 6)}`;
        const theme: Theme = {
          ...partial,
          id,
          mode: partial.mode ?? "custom",
        } as Theme;
        set((s) => ({ themes: [...s.themes, theme] }));
        return id;
      },

      updateTheme: (id, patch) =>
        set((s) => ({
          themes: s.themes.map((t) => {
            if (t.id !== id) return t;

            if (t.builtin) {
              const { name: _n, id: _i, ...safe } = patch;
              return { ...t, ...safe };
            }

            const { id: _i, ...safe } = patch;
            return { ...t, ...safe };
          }),
        })),

      removeTheme: (id) =>
        set((s) => {
          if (BUILTIN_IDS.has(id)) return s; // تم‌های پیش‌فرض پاک نمی‌شوند
          const themes = s.themes.filter((t) => t.id !== id);
          const activeThemeId =
            s.activeThemeId === id ? (themes[0]?.id ?? "") : s.activeThemeId;
          return { themes, activeThemeId };
        }),
      duplicateTheme: (id) => {
        const src = get().themes.find((t) => t.id === id);
        if (!src) return null;
        const newId = `theme-${uid().slice(0, 6)}`;
        const clone: Theme = {
          ...structuredClone(src),
          id: newId,
          name: `${src.name} کپی`,
          builtin: false,
        };
        set((s) => ({ themes: [...s.themes, clone] }));
        return newId;
      },

      resetBuiltins: () =>
        set((s) => {
          const custom = s.themes.filter((t) => !BUILTIN_IDS.has(t.id));
          return {
            themes: [...DEFAULT_THEMES, ...custom],
            activeThemeId: DEFAULT_THEMES[0].id,
          };
        }),
      // در پیاده‌سازی store:
      setTokenValue: (themeId, tokenId, value) =>
        set((s) => ({
          themes: s.themes.map((t) =>
            t.id === themeId
              ? { ...t, tokens: { ...t.tokens, [tokenId]: value } }
              : t,
          ),
        })),

      clearToken: (themeId, tokenId) =>
        set((s) => ({
          themes: s.themes.map((t) => {
            if (t.id !== themeId) return t;
            const tokens = { ...t.tokens };
            delete tokens[tokenId];
            return { ...t, tokens };
          }),
        })),
      renameTheme: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return false;

        const theme = get().themes.find((t) => t.id === id);
        if (!theme || theme.builtin) return false; // تم پیش‌فرض قابل تغییر نام نیست

        set((s) => ({
          themes: s.themes.map((t) =>
            t.id === id ? { ...t, name: trimmed } : t,
          ),
        }));
        return true;
      },
    }),
    {
      name: "design-system-themes",
      version: 1,
    },
  ),
);

/* ---------------- Selectors ---------------- */

export const selectActiveTheme = (s: ThemeState) =>
  s.themes.find((t) => t.id === s.activeThemeId) ?? s.themes[0];
