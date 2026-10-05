import { describe, it, expect } from "vitest";
import {
  toCssBlock,
  toCssVariables,
  toPreviewCss,
  toTailwindConfig,
  toGoogleFontsLink,
  toDesignTokens,
  toDesignTokensJson,
  toFigmaTokens,
  toTypeScriptTypes,
  toReactComponent,
} from "../typography-exporters";
import { defaultTypography } from "../core/typography-default";

/* =========================================================
 * CSS
 * =======================================================*/
describe("toCssVariables", () => {
  it("متغیرهای فونت فعال را صادر می‌کند", () => {
    const css = toCssVariables(defaultTypography);
    expect(css).toContain("--font-sans:");
    expect(css).toContain("--font-display:");
    expect(css).toContain("--font-mono:");
  });

  it("متغیرهای سایز فعال را صادر می‌کند", () => {
    const css = toCssVariables(defaultTypography);
    expect(css).toContain("--text-base:");
    expect(css).toContain("--text-lg:");
  });

  it("فونت غیرفعال را نادیده می‌گیرد", () => {
    const css = toCssVariables(defaultTypography);
    expect(css).not.toContain("IRANSans");
  });

  it("خط خالی برمی‌گرداند اگر همه غیرفعال باشند", () => {
    const noActive = {
      ...defaultTypography,
      fontFamilies: [],
      fontSizes: [],
      fontWeights: [],
      lineHeights: [],
      letterSpacings: [],
      textStyles: [],
    };
    expect(toCssVariables(noActive).trim()).toBe("");
  });
});

describe("toCssBlock", () => {
  it("با :root شروع می‌شود", () => {
    const block = toCssBlock(defaultTypography);
    expect(block.trim()).toMatch(/^:root\s*\{/);
  });

  it("با } تمام می‌شود", () => {
    const block = toCssBlock(defaultTypography);
    expect(block.trim()).toMatch(/\}$/);
  });
});

describe("toPreviewCss", () => {
  it("دقیقاً معادل toCssBlock بدون newline آخر", () => {
    const preview = toPreviewCss(defaultTypography);
    const block = toCssBlock(defaultTypography).trim();
    expect(preview).toBe(block);
  });
});

/* =========================================================
 * Tailwind
 * =======================================================*/
describe("toTailwindConfig", () => {
  it("ساختار معتبر تولید می‌کند", () => {
    const config = toTailwindConfig(defaultTypography);
    expect(config).toContain("tailwind.config.ts");
    expect(config).toContain("fontFamily:");
    expect(config).toContain("fontSize:");
    expect(config).toContain("fontWeight:");
  });

  it("فونت‌های فعال را صادر می‌کند", () => {
    const config = toTailwindConfig(defaultTypography);
    expect(config).toContain("sans:");
    expect(config).toContain("mono:");
  });

  it("حداقل یک سایز در fontSize هست", () => {
    const config = toTailwindConfig(defaultTypography);
    expect(config).toContain('"base"');
  });
});

/* =========================================================
 * Google Fonts
 * =======================================================*/
describe("toGoogleFontsLink", () => {
  it("لینک معتبر برای فونت‌های گوگل می‌سازد", () => {
    const link = toGoogleFontsLink(defaultTypography);
    expect(link).toMatch(/^https:\/\/fonts\.googleapis\.com/);
    expect(link).toContain("Vazirmatn");
    expect(link).toContain("display=swap");
  });

  it("اگر هیچ فونت گوگلی فعال نباشد، خالی برمی‌گرداند", () => {
    const noGoogle = {
      ...defaultTypography,
      fontFamilies: defaultTypography.fontFamilies.map((f) => ({
        ...f,
        googleFont: undefined,
      })),
    };
    expect(toGoogleFontsLink(noGoogle)).toBe("");
  });

  it("فونت غیرفعال را حذف می‌کند", () => {
    const noActive = {
      ...defaultTypography,
      fontFamilies: defaultTypography.fontFamilies.map((f) => ({
        ...f,
        active: false,
      })),
    };
    expect(toGoogleFontsLink(noActive)).toBe("");
  });

  it("چند فونت را با & به هم وصل می‌کند", () => {
    const link = toGoogleFontsLink(defaultTypography);
    expect(link).toMatch(/family=.+&family=/);
  });
});

/* =========================================================
 * Design Tokens
 * =======================================================*/
describe("toDesignTokens", () => {
  it("ساختار W3C دارد", () => {
    const tokens = toDesignTokens(defaultTypography) as any;
    expect(tokens.$schema).toBeTruthy();
    expect(tokens.fontFamily).toBeDefined();
    expect(tokens.fontSize).toBeDefined();
    expect(tokens.textStyle).toBeDefined();
  });

  it("textStyle ها با $type درست تعریف شدن", () => {
    const tokens = toDesignTokens(defaultTypography) as any;
    const names = Object.keys(tokens.textStyle);
    expect(names.length).toBeGreaterThan(0);
    names.forEach((name) => {
      expect(tokens.textStyle[name].$type).toBe("typography");
      expect(tokens.textStyle[name].$value).toBeDefined();
    });
  });

  it("JSON قابل parse است", () => {
    const json = toDesignTokensJson(defaultTypography);
    expect(() => JSON.parse(json)).not.toThrow();
  });
});

/* =========================================================
 * Figma
 * =======================================================*/
describe("toFigmaTokens", () => {
  it("ساختار global.typography دارد", () => {
    const tokens = toFigmaTokens(defaultTypography) as any;
    expect(tokens.global.typography).toBeDefined();
    expect(tokens.global.fontFamilies).toBeDefined();
  });

  it("line-height را به درصد تبدیل می‌کند", () => {
    const tokens = toFigmaTokens(defaultTypography) as any;
    Object.values(tokens.global.typography).forEach((t: any) => {
      expect(t.lineHeight).toMatch(/%$/);
    });
  });
});

/* =========================================================
 * TypeScript Types
 * =======================================================*/
describe("toTypeScriptTypes", () => {
  it("type aliases تولید می‌کند", () => {
    const ts = toTypeScriptTypes(defaultTypography);
    expect(ts).toContain("export type TextStyleName");
    expect(ts).toContain("export type FontSizeName");
  });

  it("مقدار textStyles را تولید می‌کند", () => {
    const ts = toTypeScriptTypes(defaultTypography);
    expect(ts).toContain("export const textStyles");
    expect(ts).toContain("as const");
  });

  it("شامل نام استایل‌هاست", () => {
    const ts = toTypeScriptTypes(defaultTypography);
    expect(ts).toContain("body");
    expect(ts).toContain("h1");
  });
});

/* =========================================================
 * React Component
 * =======================================================*/
describe("toReactComponent", () => {
  it("کامپوننت Text را صادر می‌کند", () => {
    const tsx = toReactComponent(defaultTypography);
    expect(tsx).toContain("export function Text");
    expect(tsx).toContain("export const textStyleMap");
    expect(tsx).toContain("variant?: TextStyleName");
  });

  it("importهای لازم رو داره", () => {
    const tsx = toReactComponent(defaultTypography);
    expect(tsx).toContain("import type { CSSProperties");
  });
});
