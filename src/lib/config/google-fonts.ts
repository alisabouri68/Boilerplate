import type { FontCategory } from "@/models/FontFamily";

export interface GoogleFontPreset {
  /** نام دقیق در Google Fonts */
  family: string;
  /** key برای دیتابیس (خودکار از family ساخته می‌شه اگه نباشه) */
  key?: string;
  category: FontCategory;
  /** وزن‌های موجود در Google Fonts */
  weights: number[];
  /** استایل‌ها */
  styles: ("normal" | "italic")[];
  /** زیرمجموعه‌ها */
  subsets: string[];
}

export const GOOGLE_FONTS_PRESETS: GoogleFontPreset[] = [
  /* ==================== English - Sans ==================== */
  {
    family: "Inter",
    key: "inter",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Roboto",
    key: "roboto",
    category: "sans",
    weights: [100, 300, 400, 500, 700, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Open Sans",
    key: "open-sans",
    category: "sans",
    weights: [300, 400, 500, 600, 700, 800],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Poppins",
    key: "poppins",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Montserrat",
    key: "montserrat",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Lato",
    key: "lato",
    category: "sans",
    weights: [100, 300, 400, 700, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Nunito",
    key: "nunito",
    category: "sans",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Raleway",
    key: "raleway",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Work Sans",
    key: "work-sans",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "DM Sans",
    key: "dm-sans",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Manrope",
    key: "manrope",
    category: "sans",
    weights: [200, 300, 400, 500, 600, 700, 800],
    styles: ["normal"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Outfit",
    key: "outfit",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Plus Jakarta Sans",
    key: "plus-jakarta-sans",
    category: "sans",
    weights: [200, 300, 400, 500, 600, 700, 800],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Figtree",
    key: "figtree",
    category: "sans",
    weights: [300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Sora",
    key: "sora",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    styles: ["normal"],
    subsets: ["latin", "latin-ext"],
  },

  /* ==================== English - Serif ==================== */
  {
    family: "Playfair Display",
    key: "playfair-display",
    category: "serif",
    weights: [400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Merriweather",
    key: "merriweather",
    category: "serif",
    weights: [300, 400, 700, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Lora",
    key: "lora",
    category: "serif",
    weights: [400, 500, 600, 700],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Source Serif 4",
    key: "source-serif-4",
    category: "serif",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Noto Serif",
    key: "noto-serif",
    category: "serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },

  /* ==================== English - Mono ==================== */
  {
    family: "JetBrains Mono",
    key: "jetbrains-mono",
    category: "mono",
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Fira Code",
    key: "fira-code",
    category: "mono",
    weights: [300, 400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "IBM Plex Mono",
    key: "ibm-plex-mono",
    category: "mono",
    weights: [100, 200, 300, 400, 500, 600, 700],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Space Mono",
    key: "space-mono",
    category: "mono",
    weights: [400, 700],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Source Code Pro",
    key: "source-code-pro",
    category: "mono",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
  },

  /* ==================== Display ==================== */
  {
    family: "Bebas Neue",
    key: "bebas-neue",
    category: "display",
    weights: [400],
    styles: ["normal"],
    subsets: ["latin"],
  },
  {
    family: "Anton",
    key: "anton",
    category: "display",
    weights: [400],
    styles: ["normal"],
    subsets: ["latin"],
  },
  {
    family: "Righteous",
    key: "righteous",
    category: "display",
    weights: [400],
    styles: ["normal"],
    subsets: ["latin"],
  },

  /* ==================== Handwriting ==================== */
  {
    family: "Dancing Script",
    key: "dancing-script",
    category: "handwriting",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["latin", "latin-ext"],
  },
  {
    family: "Pacifico",
    key: "pacifico",
    category: "handwriting",
    weights: [400],
    styles: ["normal"],
    subsets: ["latin"],
  },
  {
    family: "Caveat",
    key: "caveat",
    category: "handwriting",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["latin", "latin-ext"],
  },

  /* ==================== Persian / Arabic ==================== */
  {
    family: "Vazirmatn",
    key: "vazirmatn",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    subsets: ["arabic", "latin", "latin-ext"],
  },
  {
    family: "Noto Sans Arabic",
    key: "noto-sans-arabic",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Noto Naskh Arabic",
    key: "noto-naskh-arabic",
    category: "serif",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Noto Kufi Arabic",
    key: "noto-kufi-arabic",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Cairo",
    key: "cairo",
    category: "sans",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    subsets: ["arabic", "latin", "latin-ext"],
  },
  {
    family: "Tajawal",
    key: "tajawal",
    category: "sans",
    weights: [200, 300, 400, 500, 700, 800, 900],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Almarai",
    key: "almarai",
    category: "sans",
    weights: [300, 400, 700, 800],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "IBM Plex Sans Arabic",
    key: "ibm-plex-sans-arabic",
    category: "sans",
    weights: [100, 200, 300, 400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Readex Pro",
    key: "readex-pro",
    category: "sans",
    weights: [200, 300, 400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin", "latin-ext"],
  },
  {
    family: "Rubik",
    key: "rubik",
    category: "sans",
    weights: [300, 400, 500, 600, 700, 800, 900],
    styles: ["normal", "italic"],
    subsets: ["arabic", "latin", "latin-ext"],
  },
  {
    family: "El Messiri",
    key: "el-messiri",
    category: "sans",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Lalezar",
    key: "lalezar",
    category: "display",
    weights: [400],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Markazi Text",
    key: "markazi-text",
    category: "serif",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Amiri",
    key: "amiri",
    category: "serif",
    weights: [400, 700],
    styles: ["normal", "italic"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Aref Ruqaa",
    key: "aref-ruqaa",
    category: "display",
    weights: [400, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Harmattan",
    key: "harmattan",
    category: "sans",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Mada",
    key: "mada",
    category: "sans",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Scheherazade New",
    key: "scheherazade-new",
    category: "serif",
    weights: [400, 500, 600, 700],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
  {
    family: "Lateef",
    key: "lateef",
    category: "serif",
    weights: [200, 300, 400, 500, 600, 700, 800],
    styles: ["normal"],
    subsets: ["arabic", "latin"],
  },
];

/**
 * ساخت key از family name
 */
export function slugifyFamily(family: string): string {
  return family
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * ساخت URL Google Fonts
 */
export function buildGoogleFontsUrl(preset: GoogleFontPreset): string {
  const weightsParam = preset.weights.join(";");
  const familyParam = preset.family.replace(/\s+/g, "+");
  return `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weightsParam}&display=swap`;
}

/** تعداد کل preset ها */
export const GOOGLE_FONTS_COUNT = GOOGLE_FONTS_PRESETS.length;