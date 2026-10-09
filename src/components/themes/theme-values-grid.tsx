"use client";

import { useMemo } from "react";
import { ThemeValuesCell } from "./theme-values-cell";
import type { IState } from "@/models/State";
import type { IToken } from "@/models/Token";
import type { IColorPalette } from "@/models/ColorPalette";

/* =====================================================================
   Types
   ===================================================================== */

interface Column {
  id: string;
  key: string;
  name: string;
}

interface ThemeValuesGridProps {
  tokens: IToken[];
  states: IState[];
  palettes: IColorPalette[];
  values: Record<string, string>;
  onChange: (patch: Record<string, string>) => void;
}

/* =====================================================================
   Helpers
   ===================================================================== */

/**
 * ساخت key از توکن و استیت:
 *   token.key = "bg", state.key = "brand"  → "bg-brand"
 *   token.key = "color-accent", no state   → "color-accent"
 */
function buildKey(tokenKey: string, stateKey?: string): string {
  return stateKey ? `${tokenKey}-${stateKey}` : tokenKey;
}

/* =====================================================================
   Component
   ===================================================================== */

export function ThemeValuesGrid({
  tokens,
  states,
  palettes,
  values,
  onChange,
}: ThemeValuesGridProps) {
  const hasStates = states.length > 0;

  const columns = useMemo<Column[]>(() => {
    if (hasStates) {
      return states.map(s => ({
        id: String(s._id ?? s.key),
        key: s.key,
        name: s.name,
      }));
    }
    return [{ id: "_single", key: "", name: "Value" }];
  }, [hasStates, states]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 min-w-40 border-b bg-card px-3 py-2 text-left text-xs font-medium text-muted-foreground">
              Token
            </th>
            {columns.map(col => (
              <th
                key={col.id}
                className="min-w-35 border-b bg-card px-2 py-2 text-center text-xs font-medium text-muted-foreground"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map(token => (
            <tr key={String(token._id ?? token.key)}>
              <td className="sticky left-0 z-10 border-b bg-card px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{token.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {token.key}
                  </span>
                </div>
              </td>

              {columns.map(col => {
                const stateKey = hasStates ? col.key : undefined;
                const key = buildKey(token.key, stateKey);
                const value = values[key] ?? "";

                return (
                  <td
                    key={`${token.key}-${col.id}`}
                    className="border-b p-1 text-center"
                  >
                    <ThemeValuesCell
                      value={value}
                      palettes={palettes}
                      onChange={newValue => onChange({ [key]: newValue })}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}