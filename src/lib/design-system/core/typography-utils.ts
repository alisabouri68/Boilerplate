// lib/typography/typography-utils.ts
import type {
  TypographySystem,
  TextStyle,
  ResolvedTextStyle,
} from "./typography-types";

/* ---------- uid واحد برای همه جای پروژه ---------- */
export const uid = (): string =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/* ---------- تبدیل واحد ---------- */
export const pxToRem = (px: number, root = 16) =>
  Math.round((px / root) * 1000) / 1000;

export const remToPx = (rem: number, root = 16) => Math.round(rem * root);

/* ---------- حل یک TextStyle ---------- */
export function resolveTextStyle(
  style: TextStyle,
  system: TypographySystem,
): ResolvedTextStyle | null {
  const size = system.fontSizes.find((s) => s.id === style.fontSizeId);
  const weight = system.fontWeights.find((w) => w.id === style.fontWeightId);
  const lh = system.lineHeights.find((l) => l.id === style.lineHeightId);
  const ls = style.letterSpacingId
    ? system.letterSpacings.find((l) => l.id === style.letterSpacingId)
    : undefined;
  const ff = style.fontFamilyId
    ? system.fontFamilies.find((f) => f.id === style.fontFamilyId)
    : undefined;

  if (!size || !weight || !lh) return null;

  return {
    id: style.id,
    name: style.name,
    fontSize: size.px,
    fontSizeRem: size.rem,
    fontWeight: weight.value,
    lineHeight: lh.value,
    letterSpacing: ls?.value ?? "0",
    fontFamily: ff?.stack,
    note: style.note,
  };
}

export function resolveAllStyles(
  system: TypographySystem,
): ResolvedTextStyle[] {
  return system.textStyles
    .filter((s) => s.active)
    .map((s) => resolveTextStyle(s, system))
    .filter((s): s is ResolvedTextStyle => s !== null);
}

/* ---------- اعتبارسنجی ---------- */
export type ValidationIssue = {
  level: "error" | "warning" | "info";
  field: string;
  message: string;
};

export function validateSystem(system: TypographySystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!system.fontFamilies.some((f) => f.active)) {
    issues.push({
      level: "error",
      field: "fontFamilies",
      message: "حداقل یک فونت باید فعال باشد",
    });
  }
  if (!system.fontSizes.some((s) => s.name === "base")) {
    issues.push({
      level: "warning",
      field: "fontSizes",
      message: "سایز پایه (base) تعریف نشده",
    });
  }
  const base = system.fontSizes.find((s) => s.name === "base");
  if (base && base.px < 16) {
    issues.push({
      level: "warning",
      field: "fontSizes.base",
      message: "سایز پایه کمتر از 16px برای دسترس‌پذیری توصیه نمی‌شود",
    });
  }

  system.textStyles.forEach((st) => {
    if (!system.fontSizes.find((s) => s.id === st.fontSizeId))
      issues.push({
        level: "error",
        field: `textStyles.${st.name}`,
        message: `سایز مرجع پیدا نشد`,
      });
    if (st.name === "body") {
      const lh = system.lineHeights.find((l) => l.id === st.lineHeightId);
      if (lh && lh.value < 1.5)
        issues.push({
          level: "warning",
          field: `textStyles.${st.name}.lineHeight`,
          message: "line-height برای بدنه متن باید حداقل 1.5 باشد",
        });
    }
  });

  return issues;
}
