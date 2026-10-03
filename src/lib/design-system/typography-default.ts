import type { TypographySystem } from "./typography-types";
import { uid } from "./colors-utils";

export const defaultTypography: TypographySystem = {
  version: 1,

  fontFamilies: [
    {
      id: uid(),
      name: "وزیرمتن",
      stack: "Vazirmatn, system-ui, -apple-system, sans-serif",
      role: "sans",
      active: true,
      googleFont: "Vazirmatn:wght@100..900",
    },
    {
      id: uid(),
      name: "استعداد",
      stack: "Estedad, Vazirmatn, system-ui, sans-serif",
      role: "display",
      active: true,
      googleFont: "Estedad:wght@100..900",
    },
    {
      id: uid(),
      name: "ایران‌سنس",
      stack: "IRANSans, Vazirmatn, sans-serif",
      role: "sans",
      active: false,
    },
    {
      id: uid(),
      name: "JetBrains Mono",
      stack: "JetBrains Mono, ui-monospace, monospace",
      role: "mono",
      active: true,
      googleFont: "JetBrains+Mono:wght@400;500;700",
    },
  ],

  fontSizes: [
    { id: uid(), name: "xs",   px: 12, rem: 0.75,  active: true },
    { id: uid(), name: "sm",   px: 14, rem: 0.875, active: true },
    { id: uid(), name: "base", px: 16, rem: 1,     active: true },
    { id: uid(), name: "lg",   px: 18, rem: 1.125, active: true },
    { id: uid(), name: "xl",   px: 20, rem: 1.25,  active: true },
    { id: uid(), name: "2xl",  px: 24, rem: 1.5,   active: true },
    { id: uid(), name: "3xl",  px: 30, rem: 1.875, active: true },
    { id: uid(), name: "4xl",  px: 36, rem: 2.25,  active: true },
    { id: uid(), name: "5xl",  px: 48, rem: 3,     active: true },
    { id: uid(), name: "6xl",  px: 60, rem: 3.75,  active: true },
  ],

  fontWeights: [
    { id: uid(), name: "thin",       value: 100, active: false },
    { id: uid(), name: "light",      value: 300, active: true },
    { id: uid(), name: "regular",    value: 400, active: true },
    { id: uid(), name: "medium",     value: 500, active: true },
    { id: uid(), name: "semibold",   value: 600, active: true },
    { id: uid(), name: "bold",       value: 700, active: true },
    { id: uid(), name: "extrabold",  value: 800, active: false },
    { id: uid(), name: "black",      value: 900, active: false },
  ],

  lineHeights: [
    { id: uid(), name: "none",       value: 1,    active: false },
    { id: uid(), name: "tight",      value: 1.25, active: true,  note: "برای تیترهای بزرگ" },
    { id: uid(), name: "snug",       value: 1.375, active: true },
    { id: uid(), name: "normal",     value: 1.5,  active: true,  note: "پیش‌فرض انگلیسی" },
    { id: uid(), name: "relaxed",    value: 1.625, active: true },
    { id: uid(), name: "relaxed-fa", value: 1.75, active: true,  note: "پیشنهاد برای فارسی" },
    { id: uid(), name: "loose",      value: 2,    active: false },
  ],

  letterSpacings: [
    { id: uid(), name: "tighter", value: "-0.05em", active: true },
    { id: uid(), name: "tight",   value: "-0.025em", active: true },
    { id: uid(), name: "normal",  value: "0",       active: true },
    { id: uid(), name: "wide",    value: "0.025em", active: true },
    { id: uid(), name: "wider",   value: "0.05em",  active: false },
  ],

  textStyles: [],
};

/** بعد از ساخت فایل، textStyles را با uid پر می‌کنیم */
const find = (arr: { name: string; id: string }[], name: string) =>
  arr.find((x) => x.name === name)!.id;

defaultTypography.textStyles = [
  {
    id: uid(), name: "display",
    fontSizeId: find(defaultTypography.fontSizes, "6xl"),
    fontWeightId: find(defaultTypography.fontWeights, "bold"),
    lineHeightId: find(defaultTypography.lineHeights, "tight"),
    letterSpacingId: find(defaultTypography.letterSpacings, "tighter"),
    fontFamilyId: defaultTypography.fontFamilies[1].id,
    active: true,
  },
  {
    id: uid(), name: "h1",
    fontSizeId: find(defaultTypography.fontSizes, "4xl"),
    fontWeightId: find(defaultTypography.fontWeights, "bold"),
    lineHeightId: find(defaultTypography.lineHeights, "tight"),
    letterSpacingId: find(defaultTypography.letterSpacings, "tight"),
    fontFamilyId: defaultTypography.fontFamilies[1].id,
    active: true,
  },
  {
    id: uid(), name: "h2",
    fontSizeId: find(defaultTypography.fontSizes, "3xl"),
    fontWeightId: find(defaultTypography.fontWeights, "semibold"),
    lineHeightId: find(defaultTypography.lineHeights, "snug"),
    active: true,
  },
  {
    id: uid(), name: "h3",
    fontSizeId: find(defaultTypography.fontSizes, "2xl"),
    fontWeightId: find(defaultTypography.fontWeights, "semibold"),
    lineHeightId: find(defaultTypography.lineHeights, "snug"),
    active: true,
  },
  {
    id: uid(), name: "body-lg",
    fontSizeId: find(defaultTypography.fontSizes, "lg"),
    fontWeightId: find(defaultTypography.fontWeights, "regular"),
    lineHeightId: find(defaultTypography.lineHeights, "relaxed-fa"),
    active: true,
  },
  {
    id: uid(), name: "body",
    fontSizeId: find(defaultTypography.fontSizes, "base"),
    fontWeightId: find(defaultTypography.fontWeights, "regular"),
    lineHeightId: find(defaultTypography.lineHeights, "relaxed-fa"),
    active: true,
  },
  {
    id: uid(), name: "body-sm",
    fontSizeId: find(defaultTypography.fontSizes, "sm"),
    fontWeightId: find(defaultTypography.fontWeights, "regular"),
    lineHeightId: find(defaultTypography.lineHeights, "relaxed"),
    active: true,
  },
  {
    id: uid(), name: "caption",
    fontSizeId: find(defaultTypography.fontSizes, "xs"),
    fontWeightId: find(defaultTypography.fontWeights, "medium"),
    lineHeightId: find(defaultTypography.lineHeights, "normal"),
    letterSpacingId: find(defaultTypography.letterSpacings, "wide"),
    active: true,
  },
  {
    id: uid(), name: "mono",
    fontSizeId: find(defaultTypography.fontSizes, "sm"),
    fontWeightId: find(defaultTypography.fontWeights, "regular"),
    lineHeightId: find(defaultTypography.lineHeights, "normal"),
    fontFamilyId: defaultTypography.fontFamilies[3].id,
    active: true,
    note: "برای کد و اعداد جدولی",
  },
];