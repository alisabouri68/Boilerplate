// _components/LineHeightsSection.tsx
"use client";

import { useMemo } from "react";
import { useLineHeights, useRuntimeAPI } from "@/lib/runtime/react";
import {
  HiPlus,
  HiTrash,
  HiEye,
  HiEyeOff,
  HiExclamation,
  HiCheckCircle,
} from "react-icons/hi";
import { EmptyState } from "./ui/EmptyState";

/* ---------------------------------------------
 * Reference values — پیشنهادهای استاندارد
 * -------------------------------------------*/
const REFERENCE_HEIGHTS = {
  heading: { min: 1.1, max: 1.35, label: "تیتر" },
  body: { min: 1.6, max: 1.8, label: "بدنه (فارسی)" },
  bodyEn: { min: 1.4, max: 1.6, label: "بدنه (لاتین)" },
  caption: { min: 1.3, max: 1.5, label: "کپشن" },
};

type Advice = { level: "ok" | "warn" | "info"; msg: string };

function advise(value: number): Advice {
  if (value <= 0) return { level: "warn", msg: "مقدار نامعتبر" };
  if (value < 1) return { level: "info", msg: "کمتر از ۱ — برای موارد خاص" };
  if (value <= 1.35) return { level: "ok", msg: "مناسب تیتر" };
  if (value <= 1.6) return { level: "ok", msg: "مناسب لاتین" };
  if (value <= 1.8) return { level: "ok", msg: "مناسب بدنه فارسی" };
  if (value <= 2) return { level: "info", msg: "باز — برای خوانایی بالا" };
  return { level: "warn", msg: "خیلی باز — ممکنه نامتعادل بشه" };
}

const SAMPLE_LONG =
  "طراحی خوب، وقتی اتفاق می‌افتد که خواننده متوجه آن نشود. تایپوگرافی، اولین لایه ارتباط میان محتوا و مخاطب است. اگر فاصله خطوط درست تنظیم شود، چشم بدون تلاش از خطی به خط دیگر می‌لغزد و معنا بی‌واسطه منتقل می‌شود. این یک پاراگراف بلندتر است تا اثر واقعی ارتفاع خط را در خواندن متن ببینی.";

export default function LineHeightsSection() {
  const lineHeights = useLineHeights();
  const rt = useRuntimeAPI();

  const sorted = useMemo(
    () => [...lineHeights].sort((a, b) => a.value - b.value),
    [lineHeights]
  );

  const move = (id: string, dir: -1 | 1) => {
    const idx = lineHeights.findIndex((l) => l.id === id);
    if (idx < 0) return;
    const to = idx + dir;
    if (to < 0 || to >= lineHeights.length) return;
    rt.theme.reorderLineHeights(idx, to);
  };

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          ارتفاع خط
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            {lineHeights.filter((l) => l.active).length} فعال
          </span>
        </h3>
        <button
          onClick={() => rt.theme.addLineHeight()}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <HiPlus className="h-3.5 w-3.5" /> مقدار
        </button>
      </div>

      {/* ============ Reference legend ============ */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-gray-200 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/50">
        {Object.entries(REFERENCE_HEIGHTS).map(([key, ref]) => (
          <span
            key={key}
            className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[10px] dark:bg-gray-900"
          >
            <span className="text-gray-500 dark:text-gray-400">{ref.label}:</span>
            <span className="font-mono text-gray-800 dark:text-gray-200">
              {ref.min}–{ref.max}
            </span>
          </span>
        ))}
      </div>

      {/* ============ Cards ============ */}
      {lineHeights.length === 0 ? (
        <EmptyState
          title="هنوز ارتفاع خطی نداری"
          description="مقادیر استاندارد مثل tight, normal و relaxed-fa رو تعریف کن."
          action={{
            label: "افزودن مقدار",
            onClick: () => rt.theme.addLineHeight(),
          }}
        />
      ) : (
        <div className="space-y-3">
          {lineHeights.map((l) => {
            const advice = advise(l.value);
            const globalIdx = lineHeights.findIndex((x) => x.id === l.id);
            const isFirst = globalIdx === 0;
            const isLast = globalIdx === lineHeights.length - 1;

            const AdviceIcon =
              advice.level === "ok"
                ? HiCheckCircle
                : advice.level === "warn"
                ? HiExclamation
                : HiExclamation;

            const adviceTone =
              advice.level === "ok"
                ? "text-green-600 dark:text-green-400"
                : advice.level === "warn"
                ? "text-amber-600 dark:text-amber-400"
                : "text-gray-500 dark:text-gray-400";

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
                      rt.theme.updateLineHeight(l.id, { active: !l.active })
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
                      rt.theme.updateLineHeight(l.id, { name: e.target.value })
                    }
                    className="w-28 rounded border border-gray-200 px-2 py-1 font-mono text-xs font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />

                  {/* value */}
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0.8}
                      max={3}
                      step={0.05}
                      value={l.value}
                      onChange={(e) =>
                        rt.theme.updateLineHeight(l.id, {
                          value: Number(e.target.value) || 1,
                        })
                      }
                      className="w-20 rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                    {/* slider */}
                    <input
                      type="range"
                      min={0.8}
                      max={2.5}
                      step={0.05}
                      value={l.value}
                      onChange={(e) =>
                        rt.theme.updateLineHeight(l.id, {
                          value: Number(e.target.value),
                        })
                      }
                      className="w-24 accent-blue-600"
                    />
                  </div>

                  {/* advice */}
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] ${adviceTone}`}
                  >
                    <AdviceIcon className="h-3.5 w-3.5" />
                    {advice.msg}
                  </span>

                  {/* delete */}
                  <button
                    onClick={() => rt.theme.removeLineHeight(l.id)}
                    className="ms-auto rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>

                {/* Row 2 — preview */}
                <p
                  className="mt-2 text-xs text-gray-700 dark:text-gray-300"
                  style={{ lineHeight: l.value }}
                  dir="rtl"
                >
                  {SAMPLE_LONG}
                </p>

                {/* note */}
                {l.note && (
                  <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
                    💡 {l.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============ Visual comparison ============ */}
      {lineHeights.filter((l) => l.active).length > 1 && (
        <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="mb-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
            مقایسه بصری — خطوط راهنما نشان‌دهنده فاصله خطوط
          </h4>
          <div className="space-y-2">
            {sorted
              .filter((l) => l.active)
              .map((l) => (
                <div key={l.id} className="flex items-baseline gap-3">
                  <span className="w-24 shrink-0 font-mono text-[10px] text-gray-400">
                    {l.value} · {l.name}
                  </span>
                  <p
                    className="flex-1 truncate text-xs text-gray-900 dark:text-white"
                    style={{
                      lineHeight: l.value,
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent, transparent calc(1em * " +
                        l.value +
                        " - 1px), rgba(59,130,246,0.15) calc(1em * " +
                        l.value +
                        " - 1px), rgba(59,130,246,0.15) calc(1em * " +
                        l.value +
                        "))",
                    }}
                  >
                    نمونه متن فارسی — The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}