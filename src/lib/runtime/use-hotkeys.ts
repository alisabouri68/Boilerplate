// src/lib/runtime/use-hotkeys.ts
"use client";

import { useEffect } from "react";
import { runtime } from "./runtime-manager";

type HotkeyOptions = {
  enabled?: boolean;
};

export function useRuntimeHotkeys(options: HotkeyOptions = {}) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (!mod) return;

      // ─── Undo: Ctrl/Cmd + Z ───
      // از e.code استفاده می‌کنیم چون مستقل از زبان کیبورده
      if (e.code === "KeyZ" && !e.shiftKey) {
        if (isEditableElement(e.target)) return;
        e.preventDefault();
        runtime.undo();
        return;
      }

      // ─── Redo: Ctrl/Cmd + Shift + Z ───
      if (e.code === "KeyZ" && e.shiftKey) {
        if (isEditableElement(e.target)) return;
        e.preventDefault();
        runtime.redo();
        return;
      }

      // ─── Redo: Ctrl/Cmd + Y (Windows) ───
      if (e.code === "KeyY") {
        if (isEditableElement(e.target)) return;
        e.preventDefault();
        runtime.redo();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  if (target.isContentEditable) return true;

  return false;
}