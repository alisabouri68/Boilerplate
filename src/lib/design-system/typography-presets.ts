// lib/design-system/typography-presets.ts
import type { TypographySystem } from "./core/typography-types";
import { defaultTypography } from "./core/typography-default";

/* =========================================================
 * Types
 * =======================================================*/
export type TypographyPreset = {
  id: string;
  label: string;
  description: string;
  build: () => TypographySystem;
};

/* =========================================================
 * Helper — کلون امن که ارجاع‌ها رو حفظ می‌کند
 * =======================================================*/
const clone = <T>(x: T): T => structuredClone(x);

/**
 * پیدا کردن id یک آیتم بر اساس نام در یک آرایه.
 */
function findId<T extends { id: string; name: string }>(
  arr: T[],
  name: string,
): string | undefined {
  return arr.find((x) => x.name === name)?.id;
}

/* =========================================================
 * Builders
 * =======================================================*/

/* ---------- Default ---------- */
function buildDefault(): TypographySystem {
  return clone(defaultTypography);
}

/* ---------- SaaS: پایه 16px، مقیاس 1.25 (همون default) ---------- */
function buildSaas(): TypographySystem {
  const base = clone(defaultTypography);
  // تغییر جزئی برای تمایز
  base.fontSizes = base.fontSizes.map((s) => {
    if (s.name === "base") return { ...s, px: 16, rem: 1 };
    if (s.name === "lg") return { ...s, px: 18, rem: 1.125 };
    return s;
  });
  return base;
}

/* ---------- Editorial: پایه 18px، مقیاس دراماتیک ---------- */
function buildEditorial(): TypographySystem {
  const base = clone(defaultTypography);

  // مقیاس جدید — با حفظ idها
  const sizeMap: Record<string, { px: number; rem: number }> = {
    xs: { px: 12, rem: 0.75 },
    sm: { px: 14, rem: 0.875 },
    base: { px: 18, rem: 1.125 },
    lg: { px: 21, rem: 1.313 },
    xl: { px: 24, rem: 1.5 },
    "2xl": { px: 32, rem: 2 },
    "3xl": { px: 44, rem: 2.75 },
    "4xl": { px: 60, rem: 3.75 },
    "5xl": { px: 80, rem: 5 },
    "6xl": { px: 112, rem: 7 },
  };

  base.fontSizes = base.fontSizes.map((s) => {
    const m = sizeMap[s.name];
    return m ? { ...s, px: m.px, rem: m.rem } : s;
  });

  return base;
}

/* ---------- Persian Modern: بهینه برای فارسی ---------- */
function buildPersianModern(): TypographySystem {
  const base = clone(defaultTypography);

  // line-height بازتر
  base.lineHeights = base.lineHeights.map((l) => {
    if (l.name === "relaxed-fa") return { ...l, value: 1.8 };
    if (l.name === "normal") return { ...l, value: 1.65 };
    if (l.name === "relaxed") return { ...l, value: 1.7 };
    return l;
  });

  // letter-spacing کمی بازتر برای فارسی
  base.letterSpacings = base.letterSpacings.map((l) => {
    if (l.name === "normal") return { ...l, value: "0.005em" };
    if (l.name === "tight") return { ...l, value: "-0.01em" };
    return l;
  });

  return base;
}

/* ---------- Minimal: فقط 5 سایز ---------- */
function buildMinimal(): TypographySystem {
  const base = clone(defaultTypography);

  // فقط ۵ سایز رو نگه‌دار
  const KEEP = new Set(["sm", "base", "lg", "2xl", "4xl"]);
  base.fontSizes = base.fontSizes.filter((s) => KEEP.has(s.name));

  // حذف استایل‌هایی که به سایزهای حذف‌شده ارجاع می‌دن
  const sizeIds = new Set(base.fontSizes.map((s) => s.id));
  base.textStyles = base.textStyles.filter((t) => sizeIds.has(t.fontSizeId));

  return base;
}

/* =========================================================
 * Presets List
 * =======================================================*/
export const PRESETS: readonly TypographyPreset[] = [
  {
    id: "default",
    label: "پیش‌فرض",
    description: "سیستم پایه با ۱۰ سایز و ۸ وزن",
    build: buildDefault,
  },
  {
    id: "saas",
    label: "SaaS مدرن",
    description: "پایه 16px، مقیاس 1.25 — مناسب اپلیکیشن",
    build: buildSaas,
  },
  {
    id: "persian-modern",
    label: "فارسی مدرن",
    description: "line-height و letter-spacing بهینه برای فارسی",
    build: buildPersianModern,
  },
  {
    id: "editorial",
    label: "مجله‌ای (Editorial)",
    description: "پایه 18px، سرتیترهای دراماتیک — وبلاگ و مجله",
    build: buildEditorial,
  },
  {
    id: "minimal",
    label: "مینیمال",
    description: "فقط ۵ سایز — سبک و سریع",
    build: buildMinimal,
  },
] as const;
