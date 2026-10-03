import type { SemanticColor } from "./types";

/* ---------------- انواع ---------------- */

export type SemanticCategory =
  | "surface"
  | "border"
  | "text"
  | "interactive"
  | "feedback"
  | "focus"
  | "custom";

export type SemanticTokenDef = {
  id: string;
  label: string;
  category: SemanticCategory;
  cssVar: string;
  tailwindKey: string;
  description: string;
};

/* ---------------- کاتالوگ ثابت توکن‌ها ---------------- */

export const SEMANTIC_TOKENS: SemanticTokenDef[] = [
  /* ---------- Surfaces ---------- */
  { id: "bg-base",     label: "پس‌زمینه صفحه",   category: "surface", cssVar: "--color-bg-base",     tailwindKey: "bg-base",     description: "پس‌زمینه اصلی کل اپلیکیشن" },
  { id: "bg-surface",  label: "سطح کارت/پنل",   category: "surface", cssVar: "--color-bg-surface",  tailwindKey: "bg-surface",  description: "پس‌زمینه کارت‌ها و پنل‌ها" },
  { id: "bg-elevated", label: "سطح شناور",       category: "surface", cssVar: "--color-bg-elevated", tailwindKey: "bg-elevated", description: "مودال، دراپ‌داون، پاپ‌اور" },
  { id: "bg-subtle",   label: "سطح ملایم",       category: "surface", cssVar: "--color-bg-subtle",   tailwindKey: "bg-subtle",   description: "ردیف‌های جدول یک‌درمیان، هاور خنثی" },

  /* ---------- Borders ---------- */
  { id: "border-default", label: "مرز پیش‌فرض", category: "border", cssVar: "--color-border-default", tailwindKey: "border-default", description: "مرز کارت‌ها و ورودی‌ها" },
  { id: "border-subtle",  label: "مرز ملایم",   category: "border", cssVar: "--color-border-subtle",  tailwindKey: "border-subtle",  description: "جداکننده‌های ملایم" },
  { id: "border-strong",  label: "مرز پررنگ",   category: "border", cssVar: "--color-border-strong",  tailwindKey: "border-strong",  description: "حالت فوکوس یا هایلایت" },

  /* ---------- Text ---------- */
  { id: "text-primary",   label: "متن اصلی",   category: "text", cssVar: "--color-text-primary",   tailwindKey: "text-primary",   description: "عناوین و متن اصلی" },
  { id: "text-secondary", label: "متن ثانویه", category: "text", cssVar: "--color-text-secondary", tailwindKey: "text-secondary", description: "توضیحات و زیرعنوان" },
  { id: "text-tertiary",  label: "متن سوم",    category: "text", cssVar: "--color-text-tertiary",  tailwindKey: "text-tertiary",  description: "پلیس‌هولدر و آیکون خنثی" },
  { id: "text-inverse",   label: "متن معکوس",  category: "text", cssVar: "--color-text-inverse",   tailwindKey: "text-inverse",   description: "متن روی پس‌زمینه پررنگ" },

  /* ---------- Interactive ---------- */
  { id: "primary",          label: "اصلی",            category: "interactive", cssVar: "--color-primary",          tailwindKey: "primary",          description: "اکشن اصلی" },
  { id: "primary-hover",    label: "اصلی - هاور",     category: "interactive", cssVar: "--color-primary-hover",    tailwindKey: "primary-hover",    description: "حالت هاور" },
  { id: "primary-active",   label: "اصلی - فعال",     category: "interactive", cssVar: "--color-primary-active",   tailwindKey: "primary-active",   description: "حالت کلیک‌شده" },
  { id: "primary-focus",    label: "اصلی - فوکوس",    category: "focus",       cssVar: "--color-primary-focus",    tailwindKey: "primary-focus",    description: "حلقه فوکوس (A11y)" },
  { id: "primary-disabled", label: "اصلی - غیرفعال",  category: "interactive", cssVar: "--color-primary-disabled", tailwindKey: "primary-disabled", description: "دکمه غیرفعال" },

  /* ---------- Feedback ---------- */
  { id: "success",        label: "موفق",             category: "feedback", cssVar: "--color-success",        tailwindKey: "success",        description: "رنگ پایه موفقیت" },
  { id: "success-bg",     label: "موفق - پس‌زمینه",  category: "feedback", cssVar: "--color-success-bg",     tailwindKey: "success-bg",     description: "پس‌زمینه آلرت موفق" },
  { id: "success-border", label: "موفق - مرز",       category: "feedback", cssVar: "--color-success-border", tailwindKey: "success-border", description: "مرز آلرت موفق" },

  { id: "warning",        label: "هشدار",            category: "feedback", cssVar: "--color-warning",        tailwindKey: "warning",        description: "رنگ پایه هشدار" },
  { id: "warning-bg",     label: "هشدار - پس‌زمینه", category: "feedback", cssVar: "--color-warning-bg",     tailwindKey: "warning-bg",     description: "پس‌زمینه آلرت هشدار" },
  { id: "warning-border", label: "هشدار - مرز",      category: "feedback", cssVar: "--color-warning-border", tailwindKey: "warning-border", description: "مرز آلرت هشدار" },

  { id: "danger",        label: "خطا",               category: "feedback", cssVar: "--color-danger",        tailwindKey: "danger",        description: "رنگ پایه خطا" },
  { id: "danger-bg",     label: "خطا - پس‌زمینه",    category: "feedback", cssVar: "--color-danger-bg",     tailwindKey: "danger-bg",     description: "پس‌زمینه آلرت خطا" },
  { id: "danger-border", label: "خطا - مرز",         category: "feedback", cssVar: "--color-danger-border", tailwindKey: "danger-border", description: "مرز آلرت خطا" },

  { id: "info",        label: "اطلاع",               category: "feedback", cssVar: "--color-info",        tailwindKey: "info",        description: "رنگ پایه اطلاعات" },
  { id: "info-bg",     label: "اطلاع - پس‌زمینه",    category: "feedback", cssVar: "--color-info-bg",     tailwindKey: "info-bg",     description: "پس‌زمینه آلرت اطلاع" },
  { id: "info-border", label: "اطلاع - مرز",         category: "feedback", cssVar: "--color-info-border", tailwindKey: "info-border", description: "مرز آلرت اطلاع" },
];

/* ---------------- ایندکس‌ها ---------------- */

export const SEMANTIC_BY_ID: Record<string, SemanticTokenDef> =
  Object.fromEntries(SEMANTIC_TOKENS.map((t) => [t.id, t]));

export const SEMANTIC_BY_CATEGORY = SEMANTIC_TOKENS.reduce(
  (acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  },
  {} as Record<SemanticCategory, SemanticTokenDef[]>
);

export const CATEGORY_LABELS: Record<SemanticCategory, string> = {
  surface: "سطوح و پس‌زمینه‌ها",
  border: "مرزها و جداکننده‌ها",
  text: "متن و محتوا",
  interactive: "حالت‌های تعاملی",
  feedback: "بازخورد وضعیت",
  focus: "دسترسی‌پذیری و فوکوس",
  custom: "توکن‌های سفارشی",
};

/* ---------------- نگاشت معنایی استور ---------------- */

/** نگاشت نام رنگ معنایی → توکن (ثابت) */
export const STORE_TO_TOKEN: Record<string, string> = {
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "danger",
  error: "danger",
  info: "info",
  neutral: "text-secondary",
};

/* ---------------- توکن‌های پویا ---------------- */

/** slug پایدار از نام — "Custom Blue" → "custom-blue" */
export function tokenIdFromName(name: string): string {
  const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

  // اگر حروف غیرلاتین دارد (فارسی/عربی)، hash بساز
  if (/[^\x00-\x7F]/.test(slug)) {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = (hash << 5) - hash + slug.charCodeAt(i);
      hash |= 0;
    }
    return `custom-${Math.abs(hash).toString(36)}`;
  }

  return slug.replace(/[^a-z0-9-]/g, "");
}

export function buildDynamicTokens(
  semanticColors: SemanticColor[]
): SemanticTokenDef[] {
  const staticIds = new Set(SEMANTIC_TOKENS.map((t) => t.id));
  const seen = new Set<string>();
  const result: SemanticTokenDef[] = [];

  for (const c of semanticColors) {
    const baseId = tokenIdFromName(c.name);
    if (!baseId) continue;
    if (staticIds.has(baseId)) continue;
    if (seen.has(baseId)) continue;
    seen.add(baseId);

    // توکن پایه
    result.push({
      id: baseId,
      label: c.name,
      category: "custom",
      cssVar: `--color-${baseId}`,
      tailwindKey: baseId,
      description: `${c.name} (پایه)`,
    });

    // پس‌زمینه ملایم
    result.push({
      id: `${baseId}-bg`,
      label: `${c.name} - پس‌زمینه`,
      category: "custom",
      cssVar: `--color-${baseId}-bg`,
      tailwindKey: `${baseId}-bg`,
      description: `${c.name} - پس‌زمینه ملایم`,
    });

    // مرز
    result.push({
      id: `${baseId}-border`,
      label: `${c.name} - مرز`,
      category: "custom",
      cssVar: `--color-${baseId}-border`,
      tailwindKey: `${baseId}-border`,
      description: `${c.name} - مرز`,
    });
  }

  return result;
}
/** نگاشت نام → توکن (ثابت + پویا) */
export function buildStoreToTokenMap(
  dynamicTokens: SemanticTokenDef[]
): Record<string, string> {
  const map: Record<string, string> = { ...STORE_TO_TOKEN };
  for (const t of dynamicTokens) {
    map[t.id] = t.id;
  }
  return map;
}