// _components/TextStylesSection.tsx
"use client";

import { useMemo, useState } from "react";
import { useTypography, useRuntimeAPI } from "@/lib/runtime/react";
import { resolveTextStyle } from "@/lib/design-system/core/typography-utils";
import { EmptyState } from "./ui/EmptyState";
import {
  HiPlus,
  HiTrash,
  HiDuplicate,
  HiEye,
  HiEyeOff,
  HiSearch,
  HiClipboardCopy,
  HiCheck,
  HiX,
} from "react-icons/hi";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

type Filter = "all" | "active" | "inactive";

/* =========================================================
 * Component
 * =======================================================*/
export default function TextStylesSection() {
  const system = useTypography();
  const rt = useRuntimeAPI();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visibleStyles = useMemo(() => {
    return system.textStyles.filter((s) => {
      if (filter === "active" && !s.active) return false;
      if (filter === "inactive" && s.active) return false;
      if (query && !s.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [system.textStyles, query, filter]);

  const move = (id: string, dir: -1 | 1) => {
    const idx = system.textStyles.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const to = idx + dir;
    if (to < 0 || to >= system.textStyles.length) return;
    rt.theme.reorderTextStyles(idx, to);
  };

  /* ---------- empty state (no styles at all) ---------- */
  if (system.textStyles.length === 0) {
    return (
      <section className="space-y-3">
        <Header count={0} total={0} onAdd={() => rt.theme.addTextStyle()} />
        <EmptyState
          title="هنوز استایلی نساختی"
          description="استایل‌های متنی مثل display، h1، body و caption رو اینجا تعریف کن."
          action={{
            label: "افزودن استایل",
            onClick: () => rt.theme.addTextStyle(),
          }}
        />
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <Header
        count={system.textStyles.filter((s) => s.active).length}
        total={system.textStyles.length}
        onAdd={() => rt.theme.addTextStyle()}
      />

      {/* ============ Search + Filter ============ */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[140px] flex-1">
          <HiSearch className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در استایل‌ها..."
            className="w-full rounded-lg border border-gray-200 py-1.5 pr-8 pl-8 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <HiX className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
          {(["all", "active", "inactive"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
                filter === f
                  ? "bg-white text-gray-900 shadow dark:bg-gray-950 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {f === "all" ? "همه" : f === "active" ? "فعال" : "غیرفعال"}
            </button>
          ))}
        </div>
      </div>

      {/* ============ Empty (filtered) ============ */}
      {visibleStyles.length === 0 && (
        <EmptyState
          compact
          title="نتیجه‌ای پیدا نشد"
          description="عبارت جستجو یا فیلتر رو تغییر بده."
        />
      )}

      {/* ============ Styles List ============ */}
      <div className="space-y-2">
        {visibleStyles.map((s) => {
          const r = resolveTextStyle(s, system);
          const globalIndex = system.textStyles.findIndex((x) => x.id === s.id);
          const isFirst = globalIndex === 0;
          const isLast = globalIndex === system.textStyles.length - 1;

          return (
            <div
              key={s.id}
              className={`rounded-xl border bg-white p-3 transition dark:bg-gray-900 ${
                s.active
                  ? "border-gray-200 dark:border-gray-800"
                  : "border-dashed border-gray-300 opacity-60 dark:border-gray-700"
              }`}
            >
              {/* ============ Row 1 — controls ============ */}
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Reorder */}
                <div className="-gap-1 flex flex-col">
                  <button
                    onClick={() => move(s.id, -1)}
                    disabled={isFirst}
                    className="rounded p-0.5 text-gray-400 hover:bg-gray-100 disabled:opacity-20 dark:hover:bg-gray-800"
                    title="بالا"
                  >
                    <BiChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => move(s.id, 1)}
                    disabled={isLast}
                    className="rounded p-0.5 text-gray-400 hover:bg-gray-100 disabled:opacity-20 dark:hover:bg-gray-800"
                    title="پایین"
                  >
                    <BiChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => rt.theme.toggleTextStyle(s.id)}
                  className={`rounded-lg p-1.5 ${
                    s.active
                      ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                      : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  title={s.active ? "غیرفعال کن" : "فعال کن"}
                >
                  {s.active ? (
                    <HiEye className="h-4 w-4" />
                  ) : (
                    <HiEyeOff className="h-4 w-4" />
                  )}
                </button>

                {/* Name */}
                <input
                  value={s.name}
                  onChange={(e) =>
                    rt.theme.updateTextStyle(s.id, { name: e.target.value })
                  }
                  className="w-28 rounded border border-gray-200 px-2 py-1 font-mono text-xs font-semibold dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />

                {/* Selects */}
                <Select
                  label="سایز"
                  value={s.fontSizeId}
                  options={system.fontSizes.map((x) => ({
                    id: x.id,
                    label: x.name,
                  }))}
                  onChange={(v) =>
                    rt.theme.updateTextStyle(s.id, { fontSizeId: v })
                  }
                />
                <Select
                  label="وزن"
                  value={s.fontWeightId}
                  options={system.fontWeights.map((x) => ({
                    id: x.id,
                    label: x.name,
                  }))}
                  onChange={(v) =>
                    rt.theme.updateTextStyle(s.id, { fontWeightId: v })
                  }
                />
                <Select
                  label="line"
                  value={s.lineHeightId}
                  options={system.lineHeights.map((x) => ({
                    id: x.id,
                    label: x.name,
                  }))}
                  onChange={(v) =>
                    rt.theme.updateTextStyle(s.id, { lineHeightId: v })
                  }
                />
                <Select
                  label="ls"
                  value={s.letterSpacingId ?? ""}
                  options={[
                    { id: "", label: "—" },
                    ...system.letterSpacings.map((x) => ({
                      id: x.id,
                      label: x.name,
                    })),
                  ]}
                  onChange={(v) =>
                    rt.theme.updateTextStyle(s.id, {
                      letterSpacingId: v || undefined,
                    })
                  }
                />
                <Select
                  label="فونت"
                  value={s.fontFamilyId ?? ""}
                  options={[
                    { id: "", label: "پیش‌فرض" },
                    ...system.fontFamilies.map((x) => ({
                      id: x.id,
                      label: x.name,
                    })),
                  ]}
                  onChange={(v) =>
                    rt.theme.updateTextStyle(s.id, {
                      fontFamilyId: v || undefined,
                    })
                  }
                />

                {/* Actions */}
                <div className="ms-auto flex items-center gap-0.5">
                  <CopyCssButton style={s} resolved={r} />
                  <button
                    onClick={() => rt.theme.duplicateTextStyle(s.id)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                    title="کپی"
                  >
                    <HiDuplicate className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => rt.theme.removeTextStyle(s.id)}
                    className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    title="حذف"
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* ============ Row 2 — Preview ============ */}
              {r && (
                <>
                  <p
                    className="mt-3 text-gray-900 dark:text-white"
                    style={{
                      fontSize: `${r.fontSize}px`,
                      fontWeight: r.fontWeight,
                      lineHeight: r.lineHeight,
                      letterSpacing: r.letterSpacing,
                      fontFamily: r.fontFamily,
                    }}
                    dir="rtl"
                  >
                    این نمونه‌ای از استایل {s.name} است — طراحی خوب وقتی دیده
                    می‌شود که خواننده متوجهش نشود.
                  </p>

                  {/* Meta chips */}
                  <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] text-gray-500 dark:text-gray-400">
                    <MetaChip>{r.fontSize}px</MetaChip>
                    <MetaChip>{r.fontSizeRem}rem</MetaChip>
                    <MetaChip>w{r.fontWeight}</MetaChip>
                    <MetaChip>lh {r.lineHeight}</MetaChip>
                    {r.letterSpacing !== "0" && (
                      <MetaChip>ls {r.letterSpacing}</MetaChip>
                    )}
                    {r.fontFamily && (
                      <MetaChip truncate>
                        {r.fontFamily.split(",")[0]}
                      </MetaChip>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
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
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
        استایل‌های متنی
        {total > 0 && (
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            {total} استایل · {count} فعال
          </span>
        )}
      </h3>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
      >
        <HiPlus className="h-3.5 w-3.5" /> استایل
      </button>
    </div>
  );
}

function MetaChip({
  children,
  truncate,
}: {
  children: React.ReactNode;
  truncate?: boolean;
}) {
  return (
    <span
      className={`rounded bg-gray-100 px-1.5 py-0.5 dark:bg-gray-800 ${
        truncate ? "max-w-[120px] truncate" : ""
      }`}
    >
      {children}
    </span>
  );
}

function CopyCssButton({
  style,
  resolved,
}: {
  style: { name: string; note?: string };
  resolved: ReturnType<typeof resolveTextStyle>;
}) {
  const [copied, setCopied] = useState(false);

  if (!resolved) return null;

  const css = [
    `.${style.name} {`,
    `  font-size: ${resolved.fontSizeRem}rem;`,
    `  font-weight: ${resolved.fontWeight};`,
    `  line-height: ${resolved.lineHeight};`,
    `  letter-spacing: ${resolved.letterSpacing};`,
    resolved.fontFamily ? `  font-family: ${resolved.fontFamily};` : null,
    `}`,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`rounded-lg p-1.5 ${
        copied
          ? "text-green-600 dark:text-green-400"
          : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      title={copied ? "کپی شد" : "کپی CSS"}
    >
      {copied ? (
        <HiCheck className="h-4 w-4" />
      ) : (
        <HiClipboardCopy className="h-4 w-4" />
      )}
    </button>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-0.5 text-[10px] dark:border-gray-700">
      <span className="text-gray-400 dark:text-gray-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[10px] text-gray-800 outline-none dark:text-gray-200"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}