// _components/TabList.tsx
"use client";
import { useRef } from "react";
import type { TabDef, TabId } from "../_config/tabs";

export function TabList({
  tabs,
  active,
  onChange,
}: {
  tabs: readonly TabDef[];
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;      // RTL
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[next].id);
    (listRef.current?.children[next] as HTMLElement)?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="بخش‌های تنظیمات تایپوگرافی"
      onKeyDown={onKeyDown}
      className="flex gap-1 overflow-x-auto"
    >
      {tabs.map((t) => {
        const selected = t.id === active;
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={`relative whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
              selected
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            {t.label}
            <span
              aria-hidden
              className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-transform ${
                selected
                  ? "scale-x-100 bg-blue-600 dark:bg-blue-400"
                  : "scale-x-0 bg-transparent"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}