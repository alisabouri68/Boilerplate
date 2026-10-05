// src/lib/runtime/use-shared-system.ts
"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { runtime } from "./runtime-manager";
import { defaultTypography } from "@/lib/design-system/core/typography-default";

/**
 * اگه URL شامل `?t=` باشه، دیکد و در runtime import می‌کنه.
 * فقط یه بار در mount اولیه اجرا می‌شه.
 */
export function useSharedSystem() {
  const params = useSearchParams();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    const encoded = params.get("t");
    if (!encoded) return;

    hasRun.current = true;

    try {
      // 1. Base64 → UTF-8 string
      const json = decodeURIComponent(escape(atob(encoded)));
      // 2. JSON parse
      const parsed = JSON.parse(json);

      // 3. اعتبارسنجی
      if (!parsed || typeof parsed !== "object") {
        throw new Error("invalid payload");
      }
      if (!Array.isArray(parsed.fontFamilies)) {
        throw new Error("missing fontFamilies");
      }

      // 4. اگه textStyles خالی بود، پیش‌فرض رو تزریق کن
      const fixed = {
        ...defaultTypography,
        ...parsed,
        textStyles:
          Array.isArray(parsed.textStyles) && parsed.textStyles.length > 0
            ? parsed.textStyles
            : regenerateTextStyles(parsed),
      };

      // 5. import در runtime
      runtime.theme.importTypography(fixed);
      runtime.clearHistory();
      runtime.theme.markClean();

      // 6. حذف پارامتر از URL (تمیزکاری)
      const url = new URL(window.location.href);
      url.searchParams.delete("t");
      window.history.replaceState({}, "", url.pathname + url.search);
    } catch (err) {
      console.warn("[useSharedSystem] payload نامعتبر:", err);
    }
  }, [params]);
}

/**
 * اگه textStyles خالی باشه، با استفاده از fontSizes/Weights/LineHeights
 * چند استایل پیش‌فرض می‌سازه.
 */
function regenerateTextStyles(payload: any) {
  const sizes = payload.fontSizes ?? [];
  const weights = payload.fontWeights ?? [];
  const lineHeights = payload.lineHeights ?? [];
  const letterSpacings = payload.letterSpacings ?? [];
  const families = payload.fontFamilies ?? [];

  const findSize = (name: string) => sizes.find((s: any) => s.name === name);
  const findWeight = (name: string) => weights.find((w: any) => w.name === name);
  const findLH = (name: string) => lineHeights.find((l: any) => l.name === name);
  const findLS = (name: string) => letterSpacings.find((l: any) => l.name === name);
  const findFamily = (role: string) => families.find((f: any) => f.role === role);

  const display = findFamily("display") ?? findFamily("sans");
  const mono = findFamily("mono");

  const uid = () =>
    Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

  const styles: any[] = [];

  // display
  if (findSize("5xl") && findWeight("bold") && findLH("tight")) {
    styles.push({
      id: uid(),
      name: "display",
      fontSizeId: findSize("5xl").id,
      fontWeightId: findWeight("bold").id,
      lineHeightId: findLH("tight").id,
      letterSpacingId: findLS("tighter")?.id,
      fontFamilyId: display?.id,
      active: true,
    });
  }

  // h1
  if (findSize("4xl") && findWeight("bold") && findLH("tight")) {
    styles.push({
      id: uid(),
      name: "h1",
      fontSizeId: findSize("4xl").id,
      fontWeightId: findWeight("bold").id,
      lineHeightId: findLH("tight").id,
      letterSpacingId: findLS("tight")?.id,
      fontFamilyId: display?.id,
      active: true,
    });
  }

  // h2
  if (findSize("3xl") && findWeight("semibold") && findLH("snug")) {
    styles.push({
      id: uid(),
      name: "h2",
      fontSizeId: findSize("3xl").id,
      fontWeightId: findWeight("semibold").id,
      lineHeightId: findLH("snug").id,
      active: true,
    });
  }

  // h3
  if (findSize("2xl") && findWeight("semibold") && findLH("snug")) {
    styles.push({
      id: uid(),
      name: "h3",
      fontSizeId: findSize("2xl").id,
      fontWeightId: findWeight("semibold").id,
      lineHeightId: findLH("snug").id,
      active: true,
    });
  }

  // body-lg
  if (findSize("lg") && findWeight("regular") && findLH("relaxed-fa")) {
    styles.push({
      id: uid(),
      name: "body-lg",
      fontSizeId: findSize("lg").id,
      fontWeightId: findWeight("regular").id,
      lineHeightId: findLH("relaxed-fa").id,
      active: true,
    });
  }

  // body
  if (findSize("base") && findWeight("regular") && findLH("relaxed-fa")) {
    styles.push({
      id: uid(),
      name: "body",
      fontSizeId: findSize("base").id,
      fontWeightId: findWeight("regular").id,
      lineHeightId: findLH("relaxed-fa").id,
      active: true,
    });
  }

  // body-sm
  if (findSize("sm") && findWeight("regular") && findLH("relaxed")) {
    styles.push({
      id: uid(),
      name: "body-sm",
      fontSizeId: findSize("sm").id,
      fontWeightId: findWeight("regular").id,
      lineHeightId: findLH("relaxed").id,
      active: true,
    });
  }

  // caption
  if (findSize("xs") && findWeight("medium") && findLH("normal")) {
    styles.push({
      id: uid(),
      name: "caption",
      fontSizeId: findSize("xs").id,
      fontWeightId: findWeight("medium").id,
      lineHeightId: findLH("normal").id,
      letterSpacingId: findLS("wide")?.id,
      active: true,
    });
  }

  // mono
  if (findSize("sm") && findWeight("regular") && findLH("normal") && mono) {
    styles.push({
      id: uid(),
      name: "mono",
      fontSizeId: findSize("sm").id,
      fontWeightId: findWeight("regular").id,
      lineHeightId: findLH("normal").id,
      fontFamilyId: mono.id,
      active: true,
    });
  }

  return styles;
}