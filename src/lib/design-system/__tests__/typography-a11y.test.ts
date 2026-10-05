import { describe, it, expect } from "vitest";
import { contrastRatio, wcagLevel, auditSystem } from "../typography-a11y";
import { defaultTypography } from "../core/typography-default";

/* =========================================================
 * contrastRatio
 * =======================================================*/
describe("contrastRatio", () => {
  it("سیاه روی سفید = 21:1", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBe(21);
  });

  it("همان رنگ با خودش = 1:1", () => {
    expect(contrastRatio("#888888", "#888888")).toBe(1);
  });

  it("متقارن است (fg/bg)", () => {
    const a = contrastRatio("#111827", "#ffffff");
    const b = contrastRatio("#ffffff", "#111827");
    expect(a).toBe(b);
  });

  it("hex سه‌رقمی را می‌پذیرد", () => {
    expect(contrastRatio("#000", "#fff")).toBe(21);
  });

  it("رنگ خاکستری روی سفید ≈ 4.83", () => {
    const ratio = contrastRatio("#6b7280", "#ffffff");
    expect(ratio).toBeGreaterThan(4.5);
    expect(ratio).toBeLessThan(5.2);
  });

  it("بدون # هم کار می‌کند", () => {
    expect(contrastRatio("000000", "ffffff")).toBe(21);
  });
});

/* =========================================================
 * wcagLevel
 * =======================================================*/
describe("wcagLevel", () => {
  it("ratio بالا → AAA", () => {
    expect(wcagLevel(21, false)).toBe("AAA");
    expect(wcagLevel(8, false)).toBe("AAA");
  });

  it("ratio میانه → AA", () => {
    expect(wcagLevel(5, false)).toBe("AA");
    expect(wcagLevel(4.5, false)).toBe("AA");
  });

  it("ratio پایین → fail", () => {
    expect(wcagLevel(3, false)).toBe("fail");
    expect(wcagLevel(1, false)).toBe("fail");
  });

  it("برای متن بزرگ، آستانه پایین‌تره", () => {
    expect(wcagLevel(4, false)).toBe("fail");
    expect(wcagLevel(4, true)).toBe("AA");
    expect(wcagLevel(4.5, true)).toBe("AAA");
  });

  it("مرزها دقیق هستند", () => {
    expect(wcagLevel(7, false)).toBe("AAA");
    expect(wcagLevel(6.99, false)).toBe("AA");
    expect(wcagLevel(4.5, false)).toBe("AA");
    expect(wcagLevel(4.49, false)).toBe("fail");
  });
});

/* =========================================================
 * auditSystem
 * =======================================================*/
describe("auditSystem", () => {
  it("سیستم پیش‌فرض خطای بحرانی ندارد", () => {
    const reports = auditSystem(defaultTypography);
    const errors = reports.filter((r) => r.level === "error");
    expect(errors).toHaveLength(0);
  });

  it("سایز پایه کوچک را تشخیص می‌دهد", () => {
    const small = {
      ...defaultTypography,
      fontSizes: defaultTypography.fontSizes.map((s) =>
        s.name === "base" ? { ...s, px: 12, rem: 0.75 } : s,
      ),
    };
    const reports = auditSystem(small);
    expect(reports.some((r) => r.level === "warning")).toBe(true);
  });

  it("همیشه حداقل یک گزارش برمی‌گرداند", () => {
    const reports = auditSystem(defaultTypography);
    expect(reports.length).toBeGreaterThan(0);
  });
});
