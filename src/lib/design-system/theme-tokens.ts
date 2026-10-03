export type ThemeKey = "popcorn" | "nightWish";

export type ThemeTokens = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  primaryHover: string;
  primaryContrast: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export type ThemeDef = {
  name: string;
  emoji: string;
  mode: "light" | "dark";
  tokens: ThemeTokens;
};

export const themes: Record<ThemeKey, ThemeDef> = {
  popcorn: {
    name: "پاپ‌کرن",
    emoji: "🍿",
    mode: "light",
    tokens: {
      background: "#fffbf0",
      surface: "#ffffff",
      surfaceAlt: "#fff5e1",
      border: "#f0d9a8",
      textPrimary: "#3b2f1e",
      textSecondary: "#8a7355",
      primary: "#f59e0b",
      primaryHover: "#d97706",
      primaryContrast: "#ffffff",
      success: "#16a34a",
      warning: "#ea580c",
      danger: "#dc2626",
      info: "#0891b2",
    },
  },
  nightWish: {
    name: "نایت ویش",
    emoji: "🌙",
    mode: "dark",
    tokens: {
      background: "#0a0420",
      surface: "#150a35",
      surfaceAlt: "#1e1046",
      border: "#2d1b5e",
      textPrimary: "#ede9fe",
      textSecondary: "#a78bfa",
      primary: "#8b5cf6",
      primaryHover: "#7c3aed",
      primaryContrast: "#ffffff",
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#06b6d4",
    },
  },
};

/**
 * نگاشت نام رنگ معنایی به توکن‌های تم
 * کلید: نام معنایی (lowercase)
 * مقدار: توکن پس‌زمینه + توکن متن روی آن
 */
export const semanticTokenMap: Record<
  string,
  { bg: keyof ThemeTokens; fg: keyof ThemeTokens }
> = {
  primary: { bg: "primary", fg: "primaryContrast" },
  success: { bg: "success", fg: "primaryContrast" },
  warning: { bg: "warning", fg: "primaryContrast" },
  danger: { bg: "danger", fg: "primaryContrast" },
  error: { bg: "danger", fg: "primaryContrast" },
  info: { bg: "info", fg: "primaryContrast" },
  neutral: { bg: "textSecondary", fg: "background" },
};

/** پیدا کردن توکن متناسب با نام یک رنگ معنایی */
export function resolveSemantic(
  name: string,
  tokens: ThemeTokens
): { hex: string; textHex: string; tokenRef: keyof ThemeTokens } | null {
  const key = name.trim().toLowerCase();
  const map = semanticTokenMap[key];
  if (!map) return null;
  return {
    hex: tokens[map.bg],
    textHex: tokens[map.fg],
    tokenRef: map.bg,
  };
}

export const themeOrder: ThemeKey[] = ["popcorn", "nightWish"];