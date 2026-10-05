// lib/design-system/google-fonts-catalog.ts

export type GoogleFontCategory = "sans-serif" | "serif" | "display" | "handwriting" | "monospace";

export type GoogleFontEntry = {
  family: string;              // "Poppins"
  category: GoogleFontCategory;
  variants: string[];          // ["regular", "500", "700", ...]
  subsets: string[];           // ["latin", "latin-ext", ...]
  /** مسیر آماده برای googleFont در FontFamily */
  googleFont: string;          // "Poppins:wght@400;500;700"
  /** آیا variable هست؟ */
  variable?: boolean;
  /** برای مرتب‌سازی بر اساس محبوبیت */
  popularity?: number;
};

/**
 * لیست محبوب‌ترین فونت‌های Google Fonts.
 * این لیست از https://fonts.google.com استخراج شده.
 */
export const POPULAR_GOOGLE_FONTS: GoogleFontEntry[] = [
  /* ---------- Sans-Serif محبوب ---------- */
  { family: "Poppins", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","devanagari"], googleFont: "Poppins:wght@100;200;300;400;500;600;700;800;900", popularity: 1 },
  { family: "Inter", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Inter:wght@100..900", variable: true, popularity: 2 },
  { family: "Roboto", category: "sans-serif", variants: ["100","300","regular","500","700","900"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Roboto:wght@100;300;400;500;700;900", popularity: 3 },
  { family: "Open Sans", category: "sans-serif", variants: ["300","regular","500","600","700","800"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Open+Sans:wght@300..800", variable: true, popularity: 4 },
  { family: "Montserrat", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Montserrat:wght@100..900", variable: true, popularity: 5 },
  { family: "Lato", category: "sans-serif", variants: ["100","300","regular","700","900"], subsets: ["latin","latin-ext"], googleFont: "Lato:wght@100;300;400;700;900", popularity: 6 },
  { family: "Nunito", category: "sans-serif", variants: ["200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Nunito:wght@200..900", variable: true, popularity: 7 },
  { family: "Raleway", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Raleway:wght@100..900", variable: true, popularity: 8 },
  { family: "Work Sans", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Work+Sans:wght@100..900", variable: true, popularity: 9 },
  { family: "DM Sans", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext"], googleFont: "DM+Sans:wght@100..900", variable: true, popularity: 10 },
  { family: "Rubik", category: "sans-serif", variants: ["300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","hebrew","arabic"], googleFont: "Rubik:wght@300..900", variable: true, popularity: 11 },
  { family: "Manrope", category: "sans-serif", variants: ["200","300","regular","500","600","700","800"], subsets: ["latin","latin-ext","cyrillic","greek"], googleFont: "Manrope:wght@200..800", variable: true, popularity: 12 },
  { family: "Plus Jakarta Sans", category: "sans-serif", variants: ["200","300","regular","500","600","700","800"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Plus+Jakarta+Sans:wght@200..800", variable: true, popularity: 13 },
  { family: "Outfit", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext"], googleFont: "Outfit:wght@100..900", variable: true, popularity: 14 },
  { family: "Space Grotesk", category: "sans-serif", variants: ["300","regular","500","600","700"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Space+Grotesk:wght@300..700", variable: true, popularity: 15 },

  /* ---------- Serif ---------- */
  { family: "Playfair Display", category: "serif", variants: ["regular","500","600","700","800","900","italic"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Playfair+Display:wght@400..900", variable: true },
  { family: "Merriweather", category: "serif", variants: ["300","regular","700","900"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Merriweather:wght@300;400;700;900" },
  { family: "Lora", category: "serif", variants: ["regular","500","600","700","italic"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Lora:wght@400..700", variable: true },
  { family: "Cormorant", category: "serif", variants: ["300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Cormorant:wght@300..700", variable: true },
  { family: "EB Garamond", category: "serif", variants: ["regular","500","600","700","800"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "EB+Garamond:wght@400..800", variable: true },
  { family: "Fraunces", category: "serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Fraunces:wght@100..900", variable: true },
  { family: "Libre Baskerville", category: "serif", variants: ["regular","700"], subsets: ["latin","latin-ext"], googleFont: "Libre+Baskerville:wght@400;700" },
  { family: "Source Serif 4", category: "serif", variants: ["200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Source+Serif+4:wght@200..900", variable: true },

  /* ---------- Display ---------- */
  { family: "Bebas Neue", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"], googleFont: "Bebas+Neue" },
  { family: "Anton", category: "display", variants: ["regular"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Anton" },
  { family: "Righteous", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"], googleFont: "Righteous" },
  { family: "Abril Fatface", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"], googleFont: "Abril+Fatface" },
  { family: "Lobster", category: "display", variants: ["regular"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Lobster" },
  { family: "Comfortaa", category: "display", variants: ["300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Comfortaa:wght@300..700", variable: true },

  /* ---------- Monospace ---------- */
  { family: "JetBrains Mono", category: "monospace", variants: ["100","200","300","regular","500","600","700","800"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "JetBrains+Mono:wght@100..800", variable: true },
  { family: "Fira Code", category: "monospace", variants: ["300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic","greek"], googleFont: "Fira+Code:wght@300..700", variable: true },
  { family: "IBM Plex Mono", category: "monospace", variants: ["100","200","300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "IBM+Plex+Mono:wght@100;200;300;400;500;600;700" },
  { family: "Source Code Pro", category: "monospace", variants: ["200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Source+Code+Pro:wght@200..900", variable: true },
  { family: "Roboto Mono", category: "monospace", variants: ["100","200","300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic","greek","vietnamese"], googleFont: "Roboto+Mono:wght@100..700", variable: true },
  { family: "Space Mono", category: "monospace", variants: ["regular","700","italic"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Space+Mono:wght@400;700" },

  /* ---------- Handwriting ---------- */
  { family: "Caveat", category: "handwriting", variants: ["regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic"], googleFont: "Caveat:wght@400..700", variable: true },
  { family: "Pacifico", category: "handwriting", variants: ["regular"], subsets: ["latin","latin-ext","cyrillic","vietnamese"], googleFont: "Pacifico" },
  { family: "Dancing Script", category: "handwriting", variants: ["regular","500","600","700"], subsets: ["latin","latin-ext","vietnamese"], googleFont: "Dancing+Script:wght@400..700", variable: true },

  /* ---------- فارسی/عربی ---------- */
  { family: "Vazirmatn", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["arabic","latin","latin-ext"], googleFont: "Vazirmatn:wght@100..900", variable: true, popularity: 100 },
  { family: "Estedad", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["arabic","latin"], googleFont: "Estedad:wght@100..900", variable: true, popularity: 101 },
  { family: "Noto Sans Arabic", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["arabic"], googleFont: "Noto+Sans+Arabic:wght@100..900", variable: true, popularity: 102 },
  { family: "IBM Plex Sans Arabic", category: "sans-serif", variants: ["100","200","300","regular","500","600","700"], subsets: ["arabic","latin"], googleFont: "IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700", popularity: 103 },
  { family: "Baloo Bhaijaan 2", category: "display", variants: ["regular","500","600","700","800"], subsets: ["arabic","latin","vietnamese"], googleFont: "Baloo+Bhaijaan+2:wght@400..800", variable: true, popularity: 104 },
  { family: "Gulzar", category: "serif", variants: ["regular"], subsets: ["arabic","latin"], googleFont: "Gulzar", popularity: 105 },
  { family: "Reem Kufi", category: "sans-serif", variants: ["regular","500","600","700"], subsets: ["arabic"], googleFont: "Reem+Kufi:wght@400..700", variable: true, popularity: 106 },
  { family: "Cairo", category: "sans-serif", variants: ["200","300","regular","500","600","700","800","900"], subsets: ["arabic","latin","latin-ext"], googleFont: "Cairo:wght@200..900", variable: true, popularity: 107 },
  { family: "Tajawal", category: "sans-serif", variants: ["200","300","regular","500","700","800","900"], subsets: ["arabic","latin"], googleFont: "Tajawal:wght@200;300;400;500;700;800;900", popularity: 108 },
  { family: "Almarai", category: "sans-serif", variants: ["300","regular","700","800"], subsets: ["arabic","latin"], googleFont: "Almarai:wght@300;400;700;800", popularity: 109 },
  { family: "Amiri", category: "serif", variants: ["regular","700","italic"], subsets: ["arabic","latin"], googleFont: "Amiri:wght@400;700", popularity: 110 },
  { family: "Lateef", category: "serif", variants: ["200","300","regular","500","600","700","800"], subsets: ["arabic","latin"], googleFont: "Lateef:wght@200..800", variable: true, popularity: 111 },
  { family: "Scheherazade New", category: "serif", variants: ["regular","500","600","700"], subsets: ["arabic","latin"], googleFont: "Scheherazade+New:wght@400..700", variable: true, popularity: 112 },
];

/**
 * جستجو در کاتالوگ.
 * جستجو روی family، category و subsets.
 */
export function searchGoogleFonts(
  query: string,
  options: {
    category?: GoogleFontCategory | "all";
    limit?: number;
  } = {}
): GoogleFontEntry[] {
  const q = query.trim().toLowerCase();
  const { category = "all", limit = 30 } = options;

  return POPULAR_GOOGLE_FONTS
    .filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (!q) return true;
      return (
        f.family.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.subsets.some((s) => s.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => (a.popularity ?? 999) - (b.popularity ?? 999))
    .slice(0, limit);
}

/** فقط فونت‌های فارسی/عربی */
export const getArabicFonts = () =>
  POPULAR_GOOGLE_FONTS.filter((f) => f.subsets.includes("arabic"));

/** همه دسته‌ها */
export const GOOGLE_FONT_CATEGORIES: { id: GoogleFontCategory | "all"; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "sans-serif", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "display", label: "Display" },
  { id: "monospace", label: "Mono" },
  { id: "handwriting", label: "دست‌نویس" },
];