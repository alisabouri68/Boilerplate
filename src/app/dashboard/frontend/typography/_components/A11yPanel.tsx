// _components/A11yPanel.tsx
"use client";

import { useA11yReport } from "@/lib/runtime/react";  // ← تغییر
import { HiCheckCircle, HiExclamation, HiXCircle } from "react-icons/hi";

export default function A11yPanel() {
  const reports = useA11yReport();

  if (reports.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
        بررسی دسترس‌پذیری
      </h3>
      <div className="space-y-2">
        {reports.map((r, i) => {
          const Icon =
            r.level === "ok"
              ? HiCheckCircle
              : r.level === "warning"
              ? HiExclamation
              : HiXCircle;
          const tone =
            r.level === "ok"
              ? "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400"
              : r.level === "warning"
              ? "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400"
              : "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";

          return (
            <div
              key={i}
              className="flex gap-2 rounded-lg border border-gray-100 p-2 dark:border-gray-800"
            >
              <div className={`rounded-lg p-1.5 ${tone}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-white">
                  {r.title}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                  {r.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}