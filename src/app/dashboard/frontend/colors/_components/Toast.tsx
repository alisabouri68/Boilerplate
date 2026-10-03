"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Toast = { id: number; message: string; type?: "info" | "success" | "error" };
type ToastCtx = { push: (msg: string, type?: Toast["type"]) => void };

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const push = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.random();
    setItems((x) => [...x, { id, message, type }]);
    setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 2200);
  }, []);

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 start-1/2 z-50 flex -translate-x-1/2 flex-col gap-2 rtl:translate-x-1/2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg ${
              t.type === "success"
                ? "bg-emerald-600"
                : t.type === "error"
                ? "bg-red-600"
                : "bg-gray-900 dark:bg-gray-700"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const c = useContext(Ctx);
  if (!c) throw new Error("ToastProvider missing");
  return c;
}