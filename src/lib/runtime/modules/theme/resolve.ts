// src/lib/runtime/modules/theme/resolve.ts
import type { ThemeTokens } from "./types";

/**
 * "colors.primary" → مقدار واقعی
 * "typography.fontSizes.base.px" → 16
 */
export function resolveToken(
  tokens: ThemeTokens,
  path: string
): string | number | undefined {
  const parts = path.split(".");
  let current: unknown = tokens;

  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  if (current == null) return undefined;
  if (typeof current === "string" || typeof current === "number") {
    return current;
  }

  // اگه شیء با فیلد value بود
  if (typeof current === "object" && "value" in (current as object)) {
    return (current as { value: string | number }).value;
  }

  return undefined;
}

/**
 * deepSet(tokens, "colors.primary", "#3b82f6")
 * → tokens.colors.primary = "#3b82f6" (immutable)
 */
export function deepSet<T extends object>(
  obj: T,
  path: string,
  value: unknown
): T {
  const parts = path.split(".");
  const clone = structuredClone(obj);
  let current: Record<string, unknown> = clone as Record<string, unknown>;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (current[key] == null || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[parts[parts.length - 1]] = value;
  return clone;
}