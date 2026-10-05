// lib/design-system/typography-custom-presets.ts
"use client";

import type { TypographySystem } from "./core/typography-types";
import { uid } from "./core/typography-utils";

const STORAGE_KEY = "typography-custom-presets";

export type CustomPreset = {
  id: string;
  label: string;
  description: string;
  createdAt: number;
  system: TypographySystem;
};

/* ---------- CRUD ---------- */
export function loadCustomPresets(): CustomPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveCustomPreset(
  preset: Omit<CustomPreset, "id" | "createdAt">,
): CustomPreset {
  const item: CustomPreset = {
    ...preset,
    id: uid(),
    createdAt: Date.now(),
  };
  const all = loadCustomPresets();
  all.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return item;
}

export function updateCustomPreset(
  id: string,
  patch: Partial<Pick<CustomPreset, "label" | "description" | "system">>,
): void {
  const all = loadCustomPresets();
  const idx = all.findIndex((p) => p.id === id);
  if (idx < 0) return;
  all[idx] = { ...all[idx], ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteCustomPreset(id: string): void {
  const all = loadCustomPresets().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function exportCustomPresets(): string {
  return JSON.stringify(loadCustomPresets(), null, 2);
}

export function importCustomPresets(json: string): number {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error("invalid");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed.length;
  } catch {
    return 0;
  }
}
