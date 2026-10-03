"use client";

import { useState, useMemo } from "react";
import { useThemeStore } from "@/lib/design-system/theme-store";
import { useColorsStore } from "@/lib/design-system/colors-store";
import { useAllTokens } from "@/lib/design-system/use-all-tokens";
import { resolveTheme, tokenResolutionLabel } from "@/lib/design-system/theme";
import { buildDynamicTokens, CATEGORY_LABELS, type SemanticCategory } from "@/lib/design-system/semantic-tokens";
import TokenValuePicker from "./TokenValuePicker";
import { HiPencil, HiX, HiCheck, HiPlus } from "react-icons/hi";

export default function ThemeTokenEditor({ themeId }: { themeId: string }) {
  const theme = useThemeStore((s) => s.themes.find((t) => t.id === themeId));
  const setTokenValue = useThemeStore((s) => s.setTokenValue);
  const clearToken = useThemeStore((s) => s.clearToken);
  const palettes = useColorsStore((s) => s.palettes);
  const semanticColors = useColorsStore((s) => s.semanticColors);

  const { byCategory } = useAllTokens();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!theme) return null;

  const dynamic = buildDynamicTokens(semanticColors);
  const { values, states } = resolveTheme(theme, palettes, dynamic);

  const categories = Object.keys(byCategory) as SemanticCategory[];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          ویرایش توکن‌ها
        </h3>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          {dynamic.length} توکن سفارشی + {Object.keys(theme.tokens).length} تعریف‌شده
        </span>
      </div>

      {categories.map((cat) => (
        <div
          key={cat}
          className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center justify-between bg-gray-50 px-3 py-2 text-xs font-bold text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <span>{CATEGORY_LABELS[cat]}</span>
            <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400">
              {byCategory[cat].length}
            </span>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {byCategory[cat].map((def) => {
              const tokenVal = theme.tokens[def.id];
              const isEditing = editingId === def.id;
              const state = states[def.id];
              const hex = values[def.id];
              const isDynamic = cat === "custom";

              return (
                <div
                  key={def.id}
                  className="flex flex-wrap items-center gap-3 bg-white px-3 py-2 dark:bg-gray-950"
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-md border border-black/10"
                    style={{ background: hex }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-[11px] text-gray-800 dark:text-gray-200">
                        {def.id}
                      </code>
                      {isDynamic && (
                        <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[9px] font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-400">
                          سفارشی
                        </span>
                      )}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                          state === "resolved"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : state === "fallback"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                            : state === "missing"
                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {state}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                      {def.label} — {tokenResolutionLabel(tokenVal)}
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-gray-500 dark:text-gray-400">
                    {hex}
                  </span>

                  {!isEditing ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(def.id)}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
                        title="ویرایش"
                      >
                        <HiPencil className="h-3.5 w-3.5" />
                      </button>
                      {tokenVal && (
                        <button
                          type="button"
                          onClick={() => clearToken(theme.id, def.id)}
                          className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                          title="حذف"
                        >
                          <HiX className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-lg bg-green-600 p-1.5 text-white hover:bg-green-700"
                    >
                      <HiCheck className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {isEditing && (
                    <div className="w-full pt-2">
                      <TokenValuePicker
                        value={tokenVal}
                        onChange={(v) => setTokenValue(theme.id, def.id, v)}
                        onClear={() => {
                          clearToken(theme.id, def.id);
                          setEditingId(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}