// lib/typography/typography-a11y.ts
import type { TypographySystem } from "./core/typography-types";
import { resolveAllStyles } from "./core/typography-utils";

/* ---------- WCAG contrast ---------- */
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg: string, bg: string): number {
  const L1 = relLuminance(hexToRgb(fg));
  const L2 = relLuminance(hexToRgb(bg));
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1];
  return Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100;
}

export type WcagLevel = "AAA" | "AA" | "AA-large" | "fail";

export function wcagLevel(ratio: number, isLarge: boolean): WcagLevel {
  if (isLarge) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA";
    return "fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "fail";
}

/* ---------- Line length ---------- */
export const lineLengthAdvice = (ch: number) => {
  if (ch < 45)
    return {
      level: "warning" as const,
      msg: "خط خیلی کوتاه است (ایده‌آل: 45–75)",
    };
  if (ch > 75)
    return {
      level: "warning" as const,
      msg: "خط خیلی بلند است (ایده‌آل: 45–75)",
    };
  return { level: "ok" as const, msg: "طول خط مناسب است" };
};

/* ---------- بررسی کل سیستم ---------- */
export type A11yReport = {
  level: "error" | "warning" | "ok";
  title: string;
  detail: string;
};

export function auditSystem(system: TypographySystem): A11yReport[] {
  const reports: A11yReport[] = [];
  const resolved = resolveAllStyles(system);

  // سایز پایه
  const base = resolved.find((r) => r.name === "body");
  if (base && base.fontSize < 16) {
    reports.push({
      level: "warning",
      title: "سایز بدنه متن",
      detail: `بدنه متن ${base.fontSize}px است؛ حداقل توصیه‌شده 16px است.`,
    });
  }

  // line-height بدنه
  if (base && base.lineHeight < 1.5) {
    reports.push({
      level: "warning",
      title: "line-height بدنه متن",
      detail: `line-height برابر ${base.lineHeight} است؛ برای متن فارسی حداقل 1.6 توصیه می‌شود.`,
    });
  }

  // طول خط برای هر style بلوکی
  resolved.forEach((r) => {
    if (["body", "body-lg", "body-sm"].includes(r.name)) {
      const ch = Math.round(600 / (r.fontSize * 0.5));
      if (ch > 80) {
        reports.push({
          level: "info",
          title: `طول خط ${r.name}`,
          detail: `با فونت ${r.fontSize}px، عرض بیش از ${ch}ch توصیه نمی‌شود.`,
        });
      }
    }
  });

  // تعداد وزن‌های فعال
  const activeWeights = system.fontWeights.filter((w) => w.active).length;
  if (activeWeights > 6) {
    reports.push({
      level: "info",
      title: "تعداد وزن‌ها",
      detail: `${activeWeights} وزن فعال است؛ کمتر = بار کمتر روی فونت.`,
    });
  }

  if (reports.length === 0) {
    reports.push({
      level: "ok",
      title: "همه چیز مرتب است",
      detail: "هیچ هشدار دسترس‌پذیری یافت نشد.",
    });
  }

  return reports;
}
