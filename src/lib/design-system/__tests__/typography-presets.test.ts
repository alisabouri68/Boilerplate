import { describe, it, expect } from "vitest";
import { PRESETS } from "../typography-presets";
import { resolveAllStyles, validateSystem } from "../typography-utils";

describe("PRESETS", () => {
  it("حداقل ۴ preset دارد", () => {
    expect(PRESETS.length).toBeGreaterThanOrEqual(4);
  });

  it("هر preset ساختار درست دارد", () => {
    PRESETS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.label).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(typeof p.build).toBe("function");
    });
  });

  it("هر preset یک سیستم معتبر می‌سازد", () => {
    PRESETS.forEach((p) => {
      const system = p.build();
      expect(system.fontFamilies.length).toBeGreaterThan(0);
      expect(system.fontSizes.length).toBeGreaterThan(0);
      expect(system.textStyles.length).toBeGreaterThan(0);
    });
  });

  it("هیچ preset خطای بحرانی نداره", () => {
    PRESETS.forEach((p) => {
      const issues = validateSystem(p.build());
      const errors = issues.filter((i) => i.level === "error");
      expect(errors).toHaveLength(0);
    });
  });

  it("هر preset استایل‌های قابل resolve داره", () => {
    PRESETS.forEach((p) => {
      const system = p.build();
      const resolved = resolveAllStyles(system);
      expect(resolved.length).toBeGreaterThan(0);
    });
  });

  it("build() یک instance جدید برمی‌گردونه (نه clone مشترک)", () => {
    const a = PRESETS[0].build();
    const b = PRESETS[0].build();
    expect(a).not.toBe(b);
    expect(a.fontSizes).not.toBe(b.fontSizes);
  });

  it("idها یکتا هستند", () => {
    const ids = PRESETS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});