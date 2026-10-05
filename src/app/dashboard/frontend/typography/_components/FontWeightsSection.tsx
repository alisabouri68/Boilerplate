// _components/FontWeightsSection.tsx
"use client";

import { useMemo, useState } from "react";
import {
  useFontWeights,
  useFontFamilies,
  useRuntimeAPI,
} from "@/lib/runtime/react";
import { EmptyState } from "./ui/EmptyState";
import {
  HiPlus,
  HiTrash,
  HiExclamation,
  HiEye,
  HiEyeOff,
  HiSparkles,
} from "react-icons/hi";

/* =========================================================
 * Constants
 * =======================================================*/

const STANDARD_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const WEIGHT_LABELS: Record<number, string> = {
  100: "Thin",
  200: "ExtraLight",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "SemiBold",
  700: "Bold",
  800: "ExtraBold",
  900: "Black",
};

const SAMPLE_FA = "طراحی خوب دیده نمی‌شود";
const SAMPLE_EN = "The quick brown fox";

/* =========================================================
 * Component
 * =======================================================*/

export default function FontWeightsSection() {
  const fontWeights = useFontWeights();
  const fontFamilies = useFontFamilies();
  const rt = useRuntimeAPI();

  /* ---------- preview state ---------- */
  const [previewFamily, setPreviewFamily] = useState<string>("");
  const [previewSize, setPreviewSize] = useState(20);
  const [variableValue, setVariableValue] = useState(400);

  /* ---------- active fonts ---------- */
  const activeFonts = useMemo(
    () => fontFamilies.filter((f) => f.active),
    [fontFamilies]
  );

  /* ---------- preview font stack ---------- */
  const previewFont = useMemo(() => {
    if (previewFamily) {
      return activeFonts.find((f) => f.id === previewFamily);
    }
    return activeFonts[0];
  }, [previewFamily, activeFonts]);

  const previewStack = previewFont?.stack ?? "sans-serif";

  /* ---------- detect duplicates ---------- */
  const duplicates = useMemo(() => {
    const seen = new Map<number, string[]>();
    fontWeights.forEach((w) => {
      const list = seen.get(w.value) ?? [];
      list.push(w.id);
      seen.set(w.value, list);
    });
    const dupes = new Set<string>();
    seen.forEach((ids) => {
      if (ids.length > 1) ids.forEach((id) => dupes.add(id));
    });
    return dupes;
  }, [fontWeights]);

  /* ---------- variable font detection ---------- */
  const isVariableFont = previewFont?.googleFont?.includes("..") ?? false;

  /* ---------- reorder ---------- */
  const move = (id: string, dir: -1 | 1) => {
    const idx = fontWeights.findIndex((w) => w.id === id);
    if (idx < 0) return;
    const to = idx + dir;
    if (to < 0 || to >= fontWeights.length) return;
    rt.theme.reorderFontWeights(idx, to);
  };

  /* ---------- empty state ---------- */
  if (fontWeights.length === 0) {
    return (
      <section className="space-y-3">
        <Header count={0} total={0} onAdd={() => rt.theme.addFontWeight()} />
        <EmptyState
          title="هنوز وزنی نداری"
          description="وزن‌های فونت مثل Regular، Medium و Bold رو اینجا تعریف کن."
          action={{
            label: "افزودن وزن",
            onClick: () => rt.theme.addFontWeight(),
          }}
        />
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <Header
        count={fontWeights.filter((w) => w.active).length}
        total={fontWeights.length}
        onAdd={() => rt.theme.addFontWeight()}
      />

      {/* ============ Preview Controls ============ */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/50">
        <label className="inline-flex items-center gap-1.5 text-[11px]">
          <span className="text-gray-500 dark:text-gray-400">فونت:</span>
          <select
            value={previewFamily}
            onChange={(e) => setPreviewFamily(e.target.value)}
            className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          >
            <option value="">— پیش‌فرض —</option>
            {activeFonts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>

        <label className="inline-flex items-center gap-1.5 text-[11px]">
          <span className="text-gray-500 dark:text-gray-400">سایز:</span>
          <input
            type="number"
            min={10}
            max={72}
            value={previewSize}
            onChange={(e) => setPreviewSize(Number(e.target.value) || 16)}
            className="w-14 rounded border border-gray-200 px-1.5 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          <span className="text-gray-400">px</span>
        </label>

        {isVariableFont && (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            <HiSparkles className="h-3 w-3" />
            Variable Font
          </span>
        )}
      </div>

      {/* ============ Variable Slider ============ */}
      {isVariableFont && (
        <VariableSlider
          value={variableValue}
          onChange={setVariableValue}
          previewStack={previewStack}
          previewSize={previewSize}
          onSave={(value) =>
            rt.theme.addFontWeight({
              name: `custom-${value}`,
              value,
              active: true,
            })
          }
        />
      )}

      {/* ============ Weights Table ============ */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-right text-xs">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th className="px-3 py-1.5 font-medium">نام</th>
              <th className="px-3 py-1.5 font-medium">مقدار</th>
              <th className="px-3 py-1.5 font-medium">استاندارد</th>
              <th className="px-3 py-1.5 font-medium">نمونه</th>
              <th className="px-3 py-1.5" />
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {fontWeights.map((w) => {
              const isDuplicate = duplicates.has(w.id);
              const isStandard = STANDARD_WEIGHTS.includes(w.value);

              return (
                <tr
                  key={w.id}
                  className={`bg-white transition dark:bg-gray-950 ${
                    !w.active ? "opacity-50" : ""
                  }`}
                >
                  {/* Name */}
                  <td className="w-32 px-3 py-2">
                    <input
                      value={w.name}
                      onChange={(e) =>
                        rt.theme.updateFontWeight(w.id, { name: e.target.value })
                      }
                      className="w-full rounded border border-gray-200 px-2 py-0.5 font-mono text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                  </td>

                  {/* Value */}
                  <td className="w-24 px-3 py-2">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={1}
                        max={1000}
                        step={1}
                        value={w.value}
                        onChange={(e) =>
                          rt.theme.updateFontWeight(w.id, {
                            value: Number(e.target.value) || 400,
                          })
                        }
                        className="w-16 rounded border border-gray-200 px-2 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                      />
                      {isDuplicate && (
                        <span title="مقدار تکراری">
                          <HiExclamation className="h-3.5 w-3.5 text-amber-500" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Standard badge */}
                  <td className="w-24 px-3 py-2">
                    {isStandard ? (
                      <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                        {WEIGHT_LABELS[w.value] ?? "✓"}
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        Custom
                      </span>
                    )}
                  </td>

                  {/* Preview */}
                  <td className="px-3 py-2">
                    <span
                      className="block truncate text-gray-900 dark:text-white"
                      style={{
                        fontFamily: previewStack,
                        fontWeight: w.value,
                        fontSize: `${Math.min(previewSize, 24)}px`,
                      }}
                      dir="rtl"
                    >
                      {SAMPLE_FA}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-0.5">
                      <button
                        onClick={() =>
                          rt.theme.updateFontWeight(w.id, { active: !w.active })
                        }
                        className={`rounded-lg p-1.5 ${
                          w.active
                            ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        title={w.active ? "غیرفعال کن" : "فعال کن"}
                      >
                        {w.active ? (
                          <HiEye className="h-3.5 w-3.5" />
                        ) : (
                          <HiEyeOff className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => rt.theme.removeFontWeight(w.id)}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                        title="حذف"
                      >
                        <HiTrash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ============ Visual Comparison ============ */}
      {fontWeights.filter((w) => w.active).length > 1 && (
        <VisualComparison
          weights={fontWeights}
          previewStack={previewStack}
          previewSize={previewSize}
        />
      )}
    </section>
  );
}

/* =========================================================
 * Sub-components
 * =======================================================*/

function Header({
  count,
  total,
  onAdd,
}: {
  count: number;
  total: number;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
        وزن فونت
        {total > 0 && (
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            {count} فعال از {total}
          </span>
        )}
      </h3>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
      >
        <HiPlus className="h-3.5 w-3.5" /> وزن
      </button>
    </div>
  );
}

function VariableSlider({
  value,
  onChange,
  previewStack,
  previewSize,
  onSave,
}: {
  value: number;
  onChange: (v: number) => void;
  previewStack: string;
  previewSize: number;
  onSave: (value: number) => void;
}) {
  const label = WEIGHT_LABELS[value] ?? "Custom";

  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3 dark:border-purple-900 dark:bg-purple-950/20">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-purple-900 dark:text-purple-200">
          آزمایش وزن پیوسته
        </span>
        <span className="font-mono text-[11px] text-purple-700 dark:text-purple-300">
          wght = {value} · {label}
        </span>
      </div>

      <input
        type="range"
        min={100}
        max={900}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-purple-600"
      />

      <p
        className="mt-2 text-gray-900 dark:text-white"
        style={{
          fontFamily: previewStack,
          fontWeight: value,
          fontSize: `${previewSize}px`,
        }}
        dir="rtl"
      >
        {SAMPLE_FA}
      </p>

      <button
        onClick={() => onSave(value)}
        className="mt-2 rounded-lg bg-purple-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-purple-700"
      >
        ذخیره به عنوان توکن
      </button>
    </div>
  );
}

function VisualComparison({
  weights,
  previewStack,
  previewSize,
}: {
  weights: { id: string; name: string; value: number; active: boolean }[];
  previewStack: string;
  previewSize: number;
}) {
  const sorted = [...weights]
    .filter((w) => w.active)
    .sort((a, b) => a.value - b.value);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <h4 className="mb-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
        مقایسه بصری وزن‌های فعال
      </h4>
      <div className="space-y-1.5">
        {sorted.map((w) => (
          <div key={w.id} className="flex items-baseline gap-3">
            <span className="w-20 shrink-0 font-mono text-[10px] text-gray-400">
              {w.value} {w.name}
            </span>
            <span
              className="truncate text-gray-900 dark:text-white"
              style={{
                fontFamily: previewStack,
                fontWeight: w.value,
                fontSize: `${previewSize}px`,
                lineHeight: 1.4,
              }}
              dir="rtl"
            >
              {SAMPLE_FA}
            </span>
          </div>
        ))}
      </div>

      {/* Latin sample */}
      <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-800">
        <h5 className="mb-1.5 text-[10px] font-medium text-gray-400">
          Latin Sample
        </h5>
        <div className="space-y-0.5">
          {sorted.map((w) => (
            <p
              key={w.id}
              className="truncate text-xs text-gray-700 dark:text-gray-300"
              style={{
                fontFamily: previewStack,
                fontWeight: w.value,
              }}
              dir="ltr"
            >
              {SAMPLE_EN} — {w.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}