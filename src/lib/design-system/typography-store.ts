"use client";

import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type {
  TypographySystem,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from "./typography-types";
import { defaultTypography } from "./typography-default";
import { uid } from "./typography-utils";

interface TypographyState extends TypographySystem {
  dirty: boolean;

  /* font families */
  addFontFamily: () => void;
  updateFontFamily: (id: string, patch: Partial<FontFamily>) => void;
  removeFontFamily: (id: string) => void;
  toggleFontFamily: (id: string) => void;

  /* font sizes */
  addFontSize: () => void;
  updateFontSize: (id: string, patch: Partial<FontSize>) => void;
  removeFontSize: (id: string) => void;
  toggleFontSize: (id: string) => void;

  /* font weights */
  addFontWeight: () => void;
  updateFontWeight: (id: string, patch: Partial<FontWeight>) => void;
  removeFontWeight: (id: string) => void;

  /* line heights */
  addLineHeight: () => void;
  updateLineHeight: (id: string, patch: Partial<LineHeight>) => void;
  removeLineHeight: (id: string) => void;

  /* letter spacings */
  addLetterSpacing: () => void;
  updateLetterSpacing: (id: string, patch: Partial<LetterSpacing>) => void;
  removeLetterSpacing: (id: string) => void;

  /* text styles */
  addTextStyle: () => void;
  updateTextStyle: (id: string, patch: Partial<TextStyle>) => void;
  removeTextStyle: (id: string) => void;
  duplicateTextStyle: (id: string) => void;
  toggleTextStyle: (id: string) => void;

  /* io */
  reset: () => void;
  importSystem: (ds: TypographySystem) => void;
  exportSystem: () => TypographySystem;
}

export const useTypographyStore = create<TypographyState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...defaultTypography,
        dirty: false,

        /* ---------- Families ---------- */
        addFontFamily: () =>
          set((s) => ({
            dirty: true,
            fontFamilies: [
              ...s.fontFamilies,
              {
                id: uid(),
                name: "فونت جدید",
                stack: "sans-serif",
                role: "sans",
                active: true,
              },
            ],
          })),

        updateFontFamily: (id, patch) =>
          set((s) => ({
            dirty: true,
            fontFamilies: s.fontFamilies.map((f) =>
              f.id === id ? { ...f, ...patch } : f
            ),
          })),

        removeFontFamily: (id) =>
          set((s) => ({
            dirty: true,
            fontFamilies: s.fontFamilies.filter((f) => f.id !== id),
          })),

        toggleFontFamily: (id) =>
          set((s) => ({
            dirty: true,
            fontFamilies: s.fontFamilies.map((f) =>
              f.id === id ? { ...f, active: !f.active } : f
            ),
          })),

        /* ---------- Sizes ---------- */
        addFontSize: () =>
          set((s) => ({
            dirty: true,
            fontSizes: [
              ...s.fontSizes,
              {
                id: uid(),
                name: `size-${s.fontSizes.length + 1}`,
                px: 16,
                rem: 1,
                active: true,
              },
            ],
          })),

        updateFontSize: (id, patch) =>
          set((s) => ({
            dirty: true,
            fontSizes: s.fontSizes.map((f) => {
              if (f.id !== id) return f;
              const next = { ...f, ...patch };
              // همگام‌سازی px ↔ rem
              if (patch.px !== undefined && patch.rem === undefined) {
                next.rem = Math.round((patch.px / 16) * 1000) / 1000;
              } else if (patch.rem !== undefined && patch.px === undefined) {
                next.px = Math.round(patch.rem * 16);
              }
              return next;
            }),
          })),

        removeFontSize: (id) =>
          set((s) => ({
            dirty: true,
            fontSizes: s.fontSizes.filter((f) => f.id !== id),
          })),

        toggleFontSize: (id) =>
          set((s) => ({
            dirty: true,
            fontSizes: s.fontSizes.map((f) =>
              f.id === id ? { ...f, active: !f.active } : f
            ),
          })),

        /* ---------- Weights ---------- */
        addFontWeight: () =>
          set((s) => ({
            dirty: true,
            fontWeights: [
              ...s.fontWeights,
              { id: uid(), name: "new", value: 400, active: true },
            ],
          })),

        updateFontWeight: (id, patch) =>
          set((s) => ({
            dirty: true,
            fontWeights: s.fontWeights.map((f) =>
              f.id === id ? { ...f, ...patch } : f
            ),
          })),

        removeFontWeight: (id) =>
          set((s) => ({
            dirty: true,
            fontWeights: s.fontWeights.filter((f) => f.id !== id),
          })),

        /* ---------- Line heights ---------- */
        addLineHeight: () =>
          set((s) => ({
            dirty: true,
            lineHeights: [
              ...s.lineHeights,
              { id: uid(), name: "new", value: 1.5, active: true },
            ],
          })),

        updateLineHeight: (id, patch) =>
          set((s) => ({
            dirty: true,
            lineHeights: s.lineHeights.map((l) =>
              l.id === id ? { ...l, ...patch } : l
            ),
          })),

        removeLineHeight: (id) =>
          set((s) => ({
            dirty: true,
            lineHeights: s.lineHeights.filter((l) => l.id !== id),
          })),

        /* ---------- Letter spacings ---------- */
        addLetterSpacing: () =>
          set((s) => ({
            dirty: true,
            letterSpacings: [
              ...s.letterSpacings,
              { id: uid(), name: "new", value: "0", active: true },
            ],
          })),

        updateLetterSpacing: (id, patch) =>
          set((s) => ({
            dirty: true,
            letterSpacings: s.letterSpacings.map((l) =>
              l.id === id ? { ...l, ...patch } : l
            ),
          })),

        removeLetterSpacing: (id) =>
          set((s) => ({
            dirty: true,
            letterSpacings: s.letterSpacings.filter((l) => l.id !== id),
          })),

        /* ---------- Text styles ---------- */
        addTextStyle: () =>
          set((s) => {
            const base = s.fontSizes.find((f) => f.name === "base") ?? s.fontSizes[0];
            const regular =
              s.fontWeights.find((f) => f.name === "regular") ?? s.fontWeights[0];
            const lh =
              s.lineHeights.find((l) => l.name === "normal") ?? s.lineHeights[0];

            return {
              dirty: true,
              textStyles: [
                ...s.textStyles,
                {
                  id: uid(),
                  name: `style-${s.textStyles.length + 1}`,
                  fontSizeId: base.id,
                  fontWeightId: regular.id,
                  lineHeightId: lh.id,
                  active: true,
                },
              ],
            };
          }),

        updateTextStyle: (id, patch) =>
          set((s) => ({
            dirty: true,
            textStyles: s.textStyles.map((t) =>
              t.id === id ? { ...t, ...patch } : t
            ),
          })),

        removeTextStyle: (id) =>
          set((s) => ({
            dirty: true,
            textStyles: s.textStyles.filter((t) => t.id !== id),
          })),

        duplicateTextStyle: (id) =>
          set((s) => {
            const idx = s.textStyles.findIndex((t) => t.id === id);
            if (idx < 0) return s;
            const clone: TextStyle = {
              ...structuredClone(s.textStyles[idx]),
              id: uid(),
              name: `${s.textStyles[idx].name}-copy`,
            };
            const next = s.textStyles.slice();
            next.splice(idx + 1, 0, clone);
            return { dirty: true, textStyles: next };
          }),

        toggleTextStyle: (id) =>
          set((s) => ({
            dirty: true,
            textStyles: s.textStyles.map((t) =>
              t.id === id ? { ...t, active: !t.active } : t
            ),
          })),

        /* ---------- IO ---------- */
        reset: () => set(() => ({ ...defaultTypography, dirty: false })),

        importSystem: (ds) =>
          set(() => ({
            ...ds,
            dirty: true,
          })),

        exportSystem: () => {
          const s = get();
          return {
            id: s.id,
            version: s.version,
            fontFamilies: s.fontFamilies,
            fontSizes: s.fontSizes,
            fontWeights: s.fontWeights,
            lineHeights: s.lineHeights,
            letterSpacings: s.letterSpacings,
            textStyles: s.textStyles,
            updatedAt: s.updatedAt,
          };
        },
      }),
      {
        name: "design-system-typography",
        version: 1,
      }
    )
  )
);