/** ترتیب شیدها — از روشن به تیره */
export const SHADE_KEYS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

export type ShadeKey = (typeof SHADE_KEYS)[number];

/** تایپ shades */
export type PaletteShades = Record<ShadeKey, string>;

/** مقادیر پیش‌فرض خالی */
export const EMPTY_SHADES: PaletteShades = {
  50: "#ffffff",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
};

/** یک پالت آماده از Tailwind — red */
export const PRESET_RED: PaletteShades = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
  950: "#450a0a",
};

/** بررسی معتبر بودن HEX */
export function isValidHex(v: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);
}

/** نرمال‌سازی — همیشه #rrggbb lowercase */
export function normalizeHex(v: string): string {
  let s = v.trim().toLowerCase();
  if (!s.startsWith("#")) s = "#" + s;
  // تبدیل #abc به #aabbcc
  if (/^#[0-9a-f]{3}$/.test(s)) {
    s = "#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
  }
  return s;
}