import { describe, it, expect } from "vitest";
import {
  searchGoogleFonts,
  POPULAR_GOOGLE_FONTS,
  getArabicFonts,
} from "../google-fonts-catalog";

describe("POPULAR_GOOGLE_FONTS", () => {
  it("حداقل ۳۰ فونت داره", () => {
    expect(POPULAR_GOOGLE_FONTS.length).toBeGreaterThanOrEqual(30);
  });

  it("هر فونت فیلدهای لازم رو داره", () => {
    POPULAR_GOOGLE_FONTS.forEach((f) => {
      expect(f.family).toBeTruthy();
      expect(f.category).toBeTruthy();
      expect(f.googleFont).toBeTruthy();
      expect(Array.isArray(f.variants)).toBe(true);
      expect(Array.isArray(f.subsets)).toBe(true);
    });
  });

  it("نام‌ها یکتا هستند", () => {
    const names = POPULAR_GOOGLE_FONTS.map((f) => f.family);
    expect(new Set(names).size).toBe(names.length);
  });

  it("Poppins در لیست هست", () => {
    expect(
      POPULAR_GOOGLE_FONTS.some((f) => f.family === "Poppins")
    ).toBe(true);
  });

  it("Vazirmatn در لیست هست", () => {
    expect(
      POPULAR_GOOGLE_FONTS.some((f) => f.family === "Vazirmatn")
    ).toBe(true);
  });
});

describe("searchGoogleFonts", () => {
  it("بدون query همه را برمی‌گرداند", () => {
    const results = searchGoogleFonts("");
    expect(results.length).toBeGreaterThan(0);
  });

  it("جستجوی Poppins نتیجه می‌دهد", () => {
    const results = searchGoogleFonts("poppins");
    expect(results.some((f) => f.family === "Poppins")).toBe(true);
  });

  it("جستجو case-insensitive است", () => {
    const upper = searchGoogleFonts("POPPINS");
    const lower = searchGoogleFonts("poppins");
    expect(upper.length).toBe(lower.length);
  });

  it("جستجو جزئی کار می‌کند (pop → Poppins)", () => {
    const results = searchGoogleFonts("pop");
    expect(results.some((f) => f.family === "Poppins")).toBe(true);
  });

  it("فیلتر category کار می‌کند", () => {
    const serifs = searchGoogleFonts("", { category: "serif" });
    expect(serifs.length).toBeGreaterThan(0);
    serifs.forEach((f) => expect(f.category).toBe("serif"));
  });

  it("limit رعایت می‌شود", () => {
    const results = searchGoogleFonts("", { limit: 5 });
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("query نامعتبر نتیجه خالی می‌دهد", () => {
    const results = searchGoogleFonts("xyz-not-a-real-font-name");
    expect(results).toEqual([]);
  });
});

describe("getArabicFonts", () => {
  it("حداقل ۵ فونت عربی/فارسی برمی‌گرداند", () => {
    expect(getArabicFonts().length).toBeGreaterThanOrEqual(5);
  });

  it("همه دارای subset arabic هستند", () => {
    getArabicFonts().forEach((f) => {
      expect(f.subsets).toContain("arabic");
    });
  });
});