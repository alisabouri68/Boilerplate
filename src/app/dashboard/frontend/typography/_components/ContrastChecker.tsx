"use client";

import { useMemo, useState } from "react";
import { useTypography } from "@/lib/runtime/react";
import { resolveAllStyles } from "@/lib/design-system/core/typography-utils"
import {
  contrastRatio,
  wcagLevel,
  type WcagLevel,
} from "@/lib/design-system/typography-a11y";
import {
  HiCheckCircle,
  HiExclamation,
  HiXCircle,
  HiRefresh,
} from "react-icons/hi";

/* =========================================================
 * Constants
 * =======================================================*/
const PRESETS = [
  { name: "روشن",    fg: "#111827", bg: "#ffffff" },
  { name: "تیره",    fg: "#f4f4f5", bg: "#0b0b0c" },
  { name: "خاکستری", fg: "#4b5563", bg: "#f9fafb" },
  { name: "آبی",     fg: "#1e40af", bg: "#dbeafe" },
  { name: "سبز",     fg: "#065f46", bg: "#d1fae5" },
  { name: "قرمز",    fg: "#991b1b", bg: "#fee2e2" },
  { name: "زرد",     fg: "#78350f", bg: "#fef3c7" },
];

const SAMPLE_FA =
  "طراحی خوب، وقتی اتفاق می‌افتد که خواننده متوجه آن نشود.";
const SAMPLE_EN = "The quick brown fox jumps over the lazy dog.";

/* =========================================================
 * Component
 * =======================================================*/
export default function ContrastChecker() {
  const system = useTypography();
  const [fg, setFg] = useState("#111827");
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(16);
  const [bold, setBold] = useState(false);

  const styles = useMemo(() => resolveAllStyles(system as any), [system]);

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

  const isLarge = size >= 24 || (size >= 18.66 && bold);
  const level = wcagLevel(ratio, isLarge);

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          بررسی کنتراست
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            WCAG 2.1
          </span>
        </h3>
        <button
          onClick={swap}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <HiRefresh className="h-3.5 w-3.5" /> جابجایی رنگ‌ها
        </button>
      </div>

      {/* ============ Color pickers ============ */}
      <div className="grid grid-cols-2 gap-3">
        <ColorField label="رنگ متن" value={fg} onChange={setFg} />
        <ColorField label="رنگ پس‌زمینه" value={bg} onChange={setBg} />
      </div>

      {/* ============ Presets ============ */}
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => {
              setFg(p.fg);
              setBg(p.bg);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <span
              className="h-3 w-3 rounded-full border border-gray-300"
              style={{
                background: `linear-gradient(135deg, ${p.fg} 50%, ${p.bg} 50%)`,
              }}
            />
            {p.name}
          </button>
        ))}
      </div>

      {/* ============ Size controls ============ */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/50">
        <label className="inline-flex items-center gap-1.5 text-[11px]">
          <span className="text-gray-500 dark:text-gray-400">سایز:</span>
          <input
            type="number"
            min={8}
            max={72}
            value={size}
            onChange={(e) => setSize(Number(e.target.value) || 16)}
            className="w-14 rounded border border-gray-200 px-1.5 py-0.5 text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          <span className="text-gray-400">px</span>
        </label>

        <label className="inline-flex items-center gap-1.5 text-[11px]">
          <input
            type="checkbox"
            checked={bold}
            onChange={(e) => setBold(e.target.checked)}
            className="h-3 w-3 accent-blue-600"
          />
          <span className="text-gray-500 dark:text-gray-400">Bold</span>
        </label>

        <span className="text-[10px] text-gray-400">
          {isLarge ? "متن بزرگ" : "متن معمولی"}
        </span>
      </div>

      {/* ============ Preview card ============ */}
      <div
        className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
        style={{ background: bg, color: fg }}
      >
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-mono text-xs opacity-70">
            {fg} روی {bg}
          </span>
          <span className="font-mono text-2xl font-bold">
            {ratio.toFixed(2)}:1
          </span>
        </div>

        <p
          className="mb-2"
          style={{ fontSize: `${size}px`, fontWeight: bold ? 700 : 400 }}
          dir="rtl"
        >
          {SAMPLE_FA}
        </p>
        <p
          style={{ fontSize: `${size}px`, fontWeight: bold ? 700 : 400 }}
          dir="ltr"
        >
          {SAMPLE_EN}
        </p>
      </div>

      {/* ============ WCAG verdict ============ */}
      <LevelBadge level={level} ratio={ratio} isLarge={isLarge} />

      {/* ============ Per-style audit ============ */}
      {styles.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <h4 className="mb-2 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
            بررسی همه استایل‌ها با این کنتراست
          </h4>
          <div className="space-y-1">
            {styles.map((s) => {
              const sLarge =
                s.fontSize >= 24 ||
                (s.fontSize >= 18.66 && s.fontWeight >= 700);
              const sLevel = wcagLevel(ratio, sLarge);
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <LevelDot level={sLevel} />
                  <span className="w-24 shrink-0 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                    {s.name}
                  </span>
                  <span className="w-14 shrink-0 text-[10px] text-gray-400">
                    {s.fontSize}px
                  </span>
                  <span
                    className="flex-1 truncate text-xs"
                    style={{ color: fg }}
                  >
                    نمونه متن
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-semibold ${
                      sLevel === "AAA"
                        ? "text-green-600 dark:text-green-400"
                        : sLevel === "AA" || sLevel === "AA-large"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {sLevel === "fail" ? "رد" : sLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================
 * Sub-components
 * =======================================================*/

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-900">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-[11px] uppercase outline-none dark:text-white"
          placeholder="#000000"
        />
      </div>
    </label>
  );
}

function LevelBadge({
  level,
  ratio,
  isLarge,
}: {
  level: WcagLevel;
  ratio: number;
  isLarge: boolean;
}) {
  const map: Record<
    WcagLevel,
    { tone: string; icon: React.ReactNode; text: string; hint: string }
  > = {
    AAA: {
      tone: "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
      icon: <HiCheckCircle className="h-5 w-5" />,
      text: "AAA — عالی",
      hint: `نسبت ${ratio.toFixed(2)}:1 — بالاتر از 7:1`,
    },
    AA: {
      tone: "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
      icon: <HiCheckCircle className="h-5 w-5" />,
      text: "AA — قابل قبول",
      hint: `نسبت ${ratio.toFixed(2)}:1 — بالاتر از 4.5:1`,
    },
    "AA-large": {
      tone: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
      icon: <HiExclamation className="h-5 w-5" />,
      text: "AA فقط برای متن بزرگ",
      hint: `نسبت ${ratio.toFixed(2)}:1 — برای متن معمولی کافی نیست`,
    },
    fail: {
      tone: "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
      icon: <HiXCircle className="h-5 w-5" />,
      text: "رد شد",
      hint: `نسبت ${ratio.toFixed(2)}:1 — کمتر از حداقل 4.5:1`,
    },
  };

  const m = map[level];

  return (
    <div className={`flex items-start gap-2 rounded-xl border p-3 ${m.tone}`}>
      <div className="shrink-0">{m.icon}</div>
      <div>
        <p className="text-xs font-bold">{m.text}</p>
        <p className="mt-0.5 text-[11px] opacity-80">{m.hint}</p>
      </div>
    </div>
  );
}

function LevelDot({ level }: { level: WcagLevel }) {
  const color =
    level === "AAA"
      ? "bg-green-500"
      : level === "AA" || level === "AA-large"
      ? "bg-amber-500"
      : "bg-red-500";
  return <span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />;
}