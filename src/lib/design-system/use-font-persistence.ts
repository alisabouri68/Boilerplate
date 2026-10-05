// src/lib/design-system/use-font-persistence.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  deleteFont,
  getAllFonts,
  getStorageUsage,
  injectFontFace,
  removeFontFace,
  saveFont,
  type StoredFont,
} from "./font-storage";
import { runtime } from "@/lib/runtime";
import { useFontFamilies } from "@/lib/runtime/react";

type Status = "idle" | "loading" | "ready" | "error";

export function useFontPersistence() {
  const fontFamilies = useFontFamilies();

  const [status, setStatus] = useState<Status>("idle");
  const [usage, setUsage] = useState<{
    count: number;
    formatted: string;
  } | null>(null);

  const loadedRef = useRef(false);

  /* ---------- 1. بازیابی فونت‌ها در mount ---------- */
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    (async () => {
      setStatus("loading");
      try {
        const stored = await getAllFonts();
        stored.forEach((f) => {
          injectFontFace(f.id, f.blob);
          const exists = fontFamilies.some((x) => x.name === f.id);
          if (!exists) {
            runtime.theme.addFontFamily({
              name: f.id,
              stack: `${f.id}, sans-serif`,
              role: "sans",
              active: true,
            });
          }
        });
        const u = await getStorageUsage();
        setUsage({ count: u.count, formatted: u.formatted });
        setStatus("ready");
      } catch (err) {
        console.warn("[useFontPersistence] load failed:", err);
        setStatus("error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- 2. آپلود ---------- */
  const uploadFont = useCallback(async (file: File): Promise<boolean> => {
    try {
      const id = file.name.replace(/\.[^.]+$/, "");
      const stored: StoredFont = {
        id,
        fileName: file.name,
        mime: file.type,
        blob: file,
        savedAt: Date.now(),
      };

      await saveFont(stored);
      injectFontFace(id, file);

      runtime.theme.addFontFamily({
        name: id,
        stack: `${id}, sans-serif`,
        role: "sans",
        active: true,
      });

      const u = await getStorageUsage();
      setUsage({ count: u.count, formatted: u.formatted });
      return true;
    } catch (err) {
      console.error("[useFontPersistence] upload failed:", err);
      return false;
    }
  }, []);

  /* ---------- 3. حذف ---------- */
  const deleteUploadedFont = useCallback(
    async (id: string) => {
      try {
        await deleteFont(id);
        removeFontFace(id);

        const font = runtime.theme.fontFamilies.find((f) => f.name === id);
        if (font) runtime.theme.removeFontFamily(font.id);

        const u = await getStorageUsage();
        setUsage({ count: u.count, formatted: u.formatted });
      } catch (err) {
        console.error("[useFontPersistence] delete failed:", err);
      }
    },
    []
  );

  return { status, usage, uploadFont, deleteUploadedFont };
}