// src/components/providers/RuntimeInitializer.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useRuntimeInit } from "@/lib/runtime/react";
import { useRuntimeHotkeys } from "@/lib/runtime/use-hotkeys";
import { useSharedSystem } from "@/lib/runtime/use-shared-system";
import { exposeRuntimeToWindow, watchRuntime } from "@/lib/runtime/debug";

function SharedSystemLoader() {
  useSharedSystem();
  return null;
}

export function RuntimeInitializer() {
  useRuntimeInit();
  useRuntimeHotkeys();

  useEffect(() => {
    // پاکسازی dataهای قدیمی localStorage
    if (typeof window !== "undefined") {
      const LEGACY_KEYS = ["design-system-typography"];
      LEGACY_KEYS.forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
          console.log(`🧹 Removed legacy key: ${key}`);
        }
      });
    }

    if (process.env.NODE_ENV === "development") {
      exposeRuntimeToWindow();
      const unsub = watchRuntime();
      return unsub;
    }
  }, []);

  return (
    <Suspense fallback={null}>
      <SharedSystemLoader />
    </Suspense>
  );
}