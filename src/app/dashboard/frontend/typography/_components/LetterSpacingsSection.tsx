// _components/LetterSpacingsSection.tsx
"use client";

import { useLetterSpacings, useRuntimeAPI } from "@/lib/runtime/react";
import {
  HiPlus,
  HiTrash,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { EmptyState } from "./ui/EmptyState";

const SAMPLE_FA = "طراحی خوب دیده نمی‌شود — ۱۲۳۴۵۶۷۸۹۰";
const SAMPLE_EN = "TYPOGRAPHY & DESIGN";

/** مقادیر رایج letter-spacing */
const COMMON_VALUES = [
  { name: "tighter", value: "-0.05em", label: "خیلی نزدیک" },
  { name: "tight", value: "-0.025em", label: "نزدیک" },
  { name: "normal", value: "0", label: "معمولی" },
  { name: "wide", value: "0.025em", label: "باز" },
  { name: "wider", value: "0.05em", label: "بازتر" },
  { name: "widest", value: "0.1em", label: "خیلی باز" },
];

export default function LetterSpacingsSection() {
  const letterSpacings = useLetterSpacings();
  const rt = useRuntimeAPI();

  const hasValue = (v: string) =>
    letterSpacings.some((l) => l.value === v);

  const addCommon = (item: (typeof COMMON_VALUES)[number]) => {
    if (hasValue(item.value)) return;
    rt.theme.addLetterSpacing({
      name: item.name,
      value: item.value,
      active: true,
    });
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = letterSpacings.findIndex((l) => l.id === id);
    if (idx < 0) return;
    const to = idx + dir;
    if (to < 0 || to >= letterSpacings.length) return;
    rt.theme.reorderLetterSpacings(idx, to);
  };

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          فاصله حروف (Letter Spacing)
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            {letterSpacings.filter((l) => l.active).length} فعال
          </span>
        </h3>
        <button
          onClick={() =>
            rt.theme.addLetterSpacing({
              name: `tracking-${letterSpacings.length + 1}`,
              value: "0",
              active: true,
            })
          }
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> مقدار
        </button>
      </div>

      {/* ============ Quick add chips ============ */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-gray-200 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/50">
        <span className="self-center text-[10px] text-gray-500 dark:text-gray-400">
          افزودن سریع:
        </span>
        {COMMON_VALUES.map((item) => {
          const added = hasValue(item.value);
          return (
            <button
              key={item.value}
              onClick={() => addCommon(item)}
              disabled={added}
              className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition ${
                added
                  ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {item.name}{" "}
              <span className="font-mono text-gray-400">{item.value}</span>
            </button>
          );
        })}
      </div>

      {/* ============ Empty state / Cards ============ */}
      {letterSpacings.length === 0 ? (
        <EmptyState
          title="هنوز letter-spacing نداری"
          description="از chips بالا برای افزودن سریع مقادیر رایج استفاده کن."
          action={{
            label: "افزودن مقدار",
            onClick: () => rt.theme.addLetterSpacing(),
          }}
        />
      ) : (
        <div className="space-y-2">
          {letterSpacings.map((l) => {
            const globalIdx = letterSpacings.findIndex((x) => x.id === l.id);
            const isFirst = globalIdx === 0;
            const isLast = globalIdx === letterSpacings.length - 1;

            return (
              <div
                key={l.id}
                className={`rounded-xl border bg-white p-3 dark:bg-gray-900 ${
                  l.active
                    ? "border-gray-200 dark:border-gray-800"
                    : "border-dashed border-gray-300 opacity-60 dark:border-gray-700"
                }`}
              >
                {/* Row 1 — controls */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* reorder */}
                  <div className="flex flex-col -gap-1">
                    <button
                      onClick={() => move(l.id, -1)}
                      disabled={isFirst}
                      className="rounded p-0.5 text-gray-400 hover:bg-gray-100 disabled:opacity-20 dark:hover:bg-gray-800"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => move(l.id, 1)}
                      disabled={isLast}
                      className="rounded p-0.5 text-gray-400 hover:bg-gray-100 disabled:opacity-20 dark:hover:bg-gray-800"
                    >
                      ▼
                    </button>
                  </div>

                  {/* toggle */}
                  <button
                    onClick={() =>
                      rt.theme.updateLetterSpacing(l.id, { active: !l.active })
                    }
                    className={`rounded-lg p-1.5 ${
                      l.active
                        ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {l.active ? (
                      <HiEye className="h-4 w-4" />
                    ) : (
                      <HiEyeOff className="h-4 w-4" />
                    )}
                  </button>

                  {/* name */}
                  <input
                    value={l.name}
                    onChange={(e) =>
                      rt.theme.updateLetterSpacing(l.id, {
                        name: e.target.value,
                      })
                    }
                    className="w-28 rounded border border-gray-200 px-2 py-1 font-mono text-xs font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />

                  {/* value */}
                  <input
                    value={l.value}
                    onChange={(e) =>
                      rt.theme.updateLetterSpacing(l.id, {
                        value: e.target.value,
                      })
                    }
                    className="w-24 rounded border border-gray-200 px-2 py-1 font-mono text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    placeholder="0.025em"
                  />

                  {/* delete */}
                  <button
                    onClick={() => rt.theme.removeLetterSpacing(l.id)}
                    className="ms-auto rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>

                {/* Row 2 — previews */}
                <div className="mt-2 space-y-1">
                  <p
                    className="truncate text-sm text-gray-900 dark:text-white"
                    style={{ letterSpacing: l.value }}
                    dir="rtl"
                  >
                    {SAMPLE_FA}
                  </p>
                  <p
                    className="truncate text-xs text-gray-600 dark:text-gray-400"
                    style={{ letterSpacing: l.value }}
                    dir="ltr"
                  >
                    {SAMPLE_EN}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============ Visual comparison ============ */}
      {letterSpacings.filter((l) => l.active).length > 1 && (
        <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="mb-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
            مقایسه بصری
          </h4>
          <div className="space-y-1.5">
            {letterSpacings
              .filter((l) => l.active)
              .map((l) => (
                <div key={l.id} className="flex items-baseline gap-3">
                  <span className="w-24 shrink-0 font-mono text-[10px] text-gray-400">
                    {l.name} · {l.value}
                  </span>
                  <span
                    className="truncate text-sm text-gray-900 dark:text-white"
                    style={{ letterSpacing: l.value }}
                    dir="ltr"
                  >
                    TYPOGRAPHY — DESIGN
                  </span>
                  <span
                    className="truncate text-sm text-gray-700 dark:text-gray-300"
                    style={{ letterSpacing: l.value }}
                    dir="rtl"
                  >
                    تایپوگرافی
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}