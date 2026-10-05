// _components/ui/EmptyState.tsx
"use client";

import type { ReactNode } from "react";
import { HiPlus } from "react-icons/hi";

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50/40 text-center dark:border-gray-700 dark:bg-gray-900/40 ${
        compact ? "p-4" : "p-8"
      }`}
    >
      {icon && (
        <div className="mb-2 rounded-full bg-white p-2 text-gray-400 shadow-sm dark:bg-gray-900 dark:text-gray-500">
          {icon}
        </div>
      )}
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-xs text-[11px] text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" />
          {action.label}
        </button>
      )}
    </div>
  );
}