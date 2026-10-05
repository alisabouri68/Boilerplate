// src/lib/runtime/modules/theme/typography/actions.ts
import type {
  TypographySystem,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from "@/lib/design-system/core/typography-types";

/* ═══════════ Helpers ═══════════ */

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

function move<T>(arr: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return arr;
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/* ═══════════ Font Families ═══════════ */

export const fontFamilyActions = {
  add(sys: TypographySystem, patch?: Partial<FontFamily>): TypographySystem {
    return {
      ...sys,
      fontFamilies: [
        ...sys.fontFamilies,
        {
          id: uid(),
          name: "فونت جدید",
          stack: "sans-serif",
          role: "sans",
          active: true,
          ...patch,
        },
      ],
    };
  },

  update(sys: TypographySystem, id: string, patch: Partial<FontFamily>): TypographySystem {
    return {
      ...sys,
      fontFamilies: sys.fontFamilies.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    };
  },

  remove(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      fontFamilies: sys.fontFamilies.filter((f) => f.id !== id),
      textStyles: sys.textStyles.map((t) =>
        t.fontFamilyId === id ? { ...t, fontFamilyId: undefined } : t
      ),
    };
  },

  toggle(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      fontFamilies: sys.fontFamilies.map((f) =>
        f.id === id ? { ...f, active: !f.active } : f
      ),
    };
  },

  reorder(sys: TypographySystem, from: number, to: number): TypographySystem {
    return { ...sys, fontFamilies: move(sys.fontFamilies, from, to) };
  },
};

/* ═══════════ Font Sizes ═══════════ */

export const fontSizeActions = {
  add(sys: TypographySystem, patch?: Partial<FontSize>): TypographySystem {
    const px = patch?.px ?? 16;
    return {
      ...sys,
      fontSizes: [
        ...sys.fontSizes,
        {
          id: uid(),
          name: `size-${sys.fontSizes.length + 1}`,
          px,
          rem: Math.round((px / 16) * 1000) / 1000,
          active: true,
          ...patch,
        },
      ],
    };
  },

  update(sys: TypographySystem, id: string, patch: Partial<FontSize>): TypographySystem {
    return {
      ...sys,
      fontSizes: sys.fontSizes.map((f) => {
        if (f.id !== id) return f;
        const next = { ...f, ...patch };
        if (patch.px !== undefined && patch.rem === undefined) {
          next.rem = Math.round((next.px / 16) * 1000) / 1000;
        } else if (patch.rem !== undefined && patch.px === undefined) {
          next.px = Math.round(next.rem * 16);
        }
        return next;
      }),
    };
  },

  remove(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      fontSizes: sys.fontSizes.filter((f) => f.id !== id),
      textStyles: sys.textStyles.filter((t) => t.fontSizeId !== id),
    };
  },

  toggle(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      fontSizes: sys.fontSizes.map((f) =>
        f.id === id ? { ...f, active: !f.active } : f
      ),
    };
  },

  reorder(sys: TypographySystem, from: number, to: number): TypographySystem {
    return { ...sys, fontSizes: move(sys.fontSizes, from, to) };
  },
};

/* ═══════════ Font Weights ═══════════ */

export const fontWeightActions = {
  add(sys: TypographySystem, patch?: Partial<FontWeight>): TypographySystem {
    return {
      ...sys,
      fontWeights: [
        ...sys.fontWeights,
        {
          id: uid(),
          name: `weight-${sys.fontWeights.length + 1}`,
          value: 400,
          active: true,
          ...patch,
        },
      ],
    };
  },

  update(sys: TypographySystem, id: string, patch: Partial<FontWeight>): TypographySystem {
    return {
      ...sys,
      fontWeights: sys.fontWeights.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    };
  },

  remove(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      fontWeights: sys.fontWeights.filter((w) => w.id !== id),
      textStyles: sys.textStyles.filter((t) => t.fontWeightId !== id),
    };
  },

  reorder(sys: TypographySystem, from: number, to: number): TypographySystem {
    return { ...sys, fontWeights: move(sys.fontWeights, from, to) };
  },
};

/* ═══════════ Line Heights ═══════════ */

export const lineHeightActions = {
  add(sys: TypographySystem, patch?: Partial<LineHeight>): TypographySystem {
    return {
      ...sys,
      lineHeights: [
        ...sys.lineHeights,
        {
          id: uid(),
          name: `leading-${sys.lineHeights.length + 1}`,
          value: 1.5,
          active: true,
          ...patch,
        },
      ],
    };
  },

  update(sys: TypographySystem, id: string, patch: Partial<LineHeight>): TypographySystem {
    return {
      ...sys,
      lineHeights: sys.lineHeights.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    };
  },

  remove(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      lineHeights: sys.lineHeights.filter((l) => l.id !== id),
      textStyles: sys.textStyles.filter((t) => t.lineHeightId !== id),
    };
  },

  reorder(sys: TypographySystem, from: number, to: number): TypographySystem {
    return { ...sys, lineHeights: move(sys.lineHeights, from, to) };
  },
};

/* ═══════════ Letter Spacings ═══════════ */

export const letterSpacingActions = {
  add(sys: TypographySystem, patch?: Partial<LetterSpacing>): TypographySystem {
    return {
      ...sys,
      letterSpacings: [
        ...sys.letterSpacings,
        {
          id: uid(),
          name: `tracking-${sys.letterSpacings.length + 1}`,
          value: "0",
          active: true,
          ...patch,
        },
      ],
    };
  },

  update(sys: TypographySystem, id: string, patch: Partial<LetterSpacing>): TypographySystem {
    return {
      ...sys,
      letterSpacings: sys.letterSpacings.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    };
  },

  remove(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      letterSpacings: sys.letterSpacings.filter((l) => l.id !== id),
      textStyles: sys.textStyles.map((t) =>
        t.letterSpacingId === id ? { ...t, letterSpacingId: undefined } : t
      ),
    };
  },

  reorder(sys: TypographySystem, from: number, to: number): TypographySystem {
    return { ...sys, letterSpacings: move(sys.letterSpacings, from, to) };
  },
};

/* ═══════════ Text Styles ═══════════ */

export const textStyleActions = {
  add(sys: TypographySystem, patch?: Partial<TextStyle>): TypographySystem {
    const base = sys.fontSizes.find((s) => s.name === "base") ?? sys.fontSizes[0];
    const regular = sys.fontWeights.find((w) => w.name === "regular") ?? sys.fontWeights[0];
    const lh = sys.lineHeights.find((l) => l.name === "normal") ?? sys.lineHeights[0];
    if (!base || !regular || !lh) return sys;

    return {
      ...sys,
      textStyles: [
        ...sys.textStyles,
        {
          id: uid(),
          name: `style-${sys.textStyles.length + 1}`,
          fontSizeId: base.id,
          fontWeightId: regular.id,
          lineHeightId: lh.id,
          active: true,
          ...patch,
        },
      ],
    };
  },

  update(sys: TypographySystem, id: string, patch: Partial<TextStyle>): TypographySystem {
    return {
      ...sys,
      textStyles: sys.textStyles.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    };
  },

  remove(sys: TypographySystem, id: string): TypographySystem {
    return { ...sys, textStyles: sys.textStyles.filter((t) => t.id !== id) };
  },

  duplicate(sys: TypographySystem, id: string): TypographySystem {
    const idx = sys.textStyles.findIndex((t) => t.id === id);
    if (idx < 0) return sys;
    const source = sys.textStyles[idx];
    const clone: TextStyle = {
      ...source,
      id: uid(),
      name: `${source.name}-copy`,
    };
    const next = sys.textStyles.slice();
    next.splice(idx + 1, 0, clone);
    return { ...sys, textStyles: next };
  },

  toggle(sys: TypographySystem, id: string): TypographySystem {
    return {
      ...sys,
      textStyles: sys.textStyles.map((t) =>
        t.id === id ? { ...t, active: !t.active } : t
      ),
    };
  },

  rename(sys: TypographySystem, id: string, name: string): TypographySystem {
    return {
      ...sys,
      textStyles: sys.textStyles.map((t) => (t.id === id ? { ...t, name } : t)),
    };
  },

  reorder(sys: TypographySystem, from: number, to: number): TypographySystem {
    return { ...sys, textStyles: move(sys.textStyles, from, to) };
  },
};