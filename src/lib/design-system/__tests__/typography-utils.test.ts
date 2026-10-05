import { describe, it, expect } from "vitest";
import {
  uid,
  pxToRem,
  remToPx,
  resolveTextStyle,
  resolveAllStyles,
  validateSystem,
} from "../typography-utils";
import { defaultTypography } from "../core/typography-default";

describe("uid", () => {
  it("یک رشته یکتا تولید می‌کند", () => {
    const a = uid();
    const b = uid();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThan(8);
  });

  it("صد بار تولید، صد مقدار متفاوت", () => {
    const set = new Set(Array.from({ length: 100 }, () => uid()));
    expect(set.size).toBe(100);
  });
});

describe("pxToRem", () => {
  it("16px → 1rem", () => {
    expect(pxToRem(16)).toBe(1);
  });

  it("24px → 1.5rem", () => {
    expect(pxToRem(24)).toBe(1.5);
  });

  it("با root سفارشی", () => {
    expect(pxToRem(20, 10)).toBe(2);
  });

  it("اعشار را تا ۳ رقم گرد می‌کند", () => {
    expect(pxToRem(15)).toBe(0.938);
  });
});

describe("remToPx", () => {
  it("1rem → 16px", () => {
    expect(remToPx(1)).toBe(16);
  });

  it("1.5rem → 24px", () => {
    expect(remToPx(1.5)).toBe(24);
  });

  it("رفت و برگشت یکسان", () => {
    [12, 16, 20, 24, 32, 48].forEach((px) => {
      expect(remToPx(pxToRem(px))).toBe(px);
    });
  });
});

describe("resolveTextStyle", () => {
  it("استایل معتبر را حل می‌کند", () => {
    const style = defaultTypography.textStyles.find((s) => s.name === "body");
    expect(style).toBeDefined();

    const resolved = resolveTextStyle(style!, defaultTypography);
    expect(resolved).not.toBeNull();
    expect(resolved!.name).toBe("body");
    expect(resolved!.fontSize).toBeGreaterThan(0);
    expect(resolved!.fontWeight).toBeGreaterThanOrEqual(100);
    expect(resolved!.fontWeight).toBeLessThanOrEqual(900);
  });

  it("ارجاع نامعتبر → null", () => {
    const invalid = {
      id: "x",
      name: "broken",
      fontSizeId: "does-not-exist",
      fontWeightId: "nope",
      lineHeightId: "nada",
      active: true,
    };
    expect(resolveTextStyle(invalid, defaultTypography)).toBeNull();
  });
});

describe("resolveAllStyles", () => {
  it("فقط استایل‌های فعال", () => {
    const resolved = resolveAllStyles(defaultTypography);
    const activeCount = defaultTypography.textStyles.filter(
      (s) => s.active,
    ).length;
    expect(resolved.length).toBe(activeCount);
  });

  it("همه برگشتی‌ها معتبرند", () => {
    const resolved = resolveAllStyles(defaultTypography);
    resolved.forEach((r) => {
      expect(r.name).toBeTruthy();
      expect(r.fontSize).toBeGreaterThan(0);
      expect(r.lineHeight).toBeGreaterThan(0);
    });
  });
});

describe("validateSystem", () => {
  it("سیستم پیش‌فرض خطای بحرانی ندارد", () => {
    const issues = validateSystem(defaultTypography);
    const errors = issues.filter((i) => i.level === "error");
    expect(errors).toHaveLength(0);
  });

  it("نبود font فعال را تشخیص می‌دهد", () => {
    const broken = {
      ...defaultTypography,
      fontFamilies: defaultTypography.fontFamilies.map((f) => ({
        ...f,
        active: false,
      })),
    };
    const issues = validateSystem(broken);
    expect(issues.some((i) => i.field === "fontFamilies")).toBe(true);
  });

  it("سایز پایه < 16px را هشدار می‌دهد", () => {
    const small = {
      ...defaultTypography,
      fontSizes: defaultTypography.fontSizes.map((s) =>
        s.name === "base" ? { ...s, px: 12, rem: 0.75 } : s,
      ),
    };
    const issues = validateSystem(small);
    expect(issues.some((i) => i.field.includes("base"))).toBe(true);
  });
});
