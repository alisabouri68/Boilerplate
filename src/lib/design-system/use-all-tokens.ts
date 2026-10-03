"use client";

import { useMemo } from "react";
import { useColorsStore } from "./colors-store";
import {
  SEMANTIC_TOKENS,
  buildDynamicTokens,
  buildStoreToTokenMap,
  SEMANTIC_BY_CATEGORY,
  type SemanticCategory,
  type SemanticTokenDef,
} from "./semantic-tokens";

export function useAllTokens() {
  const semanticColors = useColorsStore((s) => s.semanticColors);

  return useMemo(() => {
    const dynamic = buildDynamicTokens(semanticColors);
    const all: SemanticTokenDef[] = [...SEMANTIC_TOKENS, ...dynamic];
    const storeToToken = buildStoreToTokenMap(dynamic);

    // گروه‌بندی بر اساس دسته (شامل custom)
    const byCategory = all.reduce(
      (acc, t) => {
        (acc[t.category] ||= []).push(t);
        return acc;
      },
      {} as Record<SemanticCategory, SemanticTokenDef[]>
    );

    return { all, dynamic, byCategory, storeToToken };
  }, [semanticColors]);
}