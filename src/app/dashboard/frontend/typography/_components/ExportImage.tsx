// _components/ExportImage.tsx
"use client";

import { useRef, useState } from "react";
import { useTypography } from "@/lib/runtime/react";  // ← تغییر
import { resolveAllStyles } from "@/lib/design-system/core/typography-utils";
import { toGoogleFontsLink } from "@/lib/design-system/typography-exporters";
import {
  HiDownload,
  HiPhotograph,
  HiDocument,
  HiColorSwatch,
} from "react-icons/hi";

/* =========================================================
 * Types
 * =======================================================*/
type Format = "png" | "pdf";
type Preset = "styles" | "poster" | "cheatsheet";

/* =========================================================
 * Component
 * =======================================================*/
export default function ExportImage() {
  const system = useTypography();
  const [format, setFormat] = useState<Format>("png");
  const [preset, setPreset] = useState<Preset>("styles");
  const [busy, setBusy] = useState(false);
  const [includeWeights, setIncludeWeights] = useState(true);
  const [includeColors, setIncludeColors] = useState(true);

  const previewRef = useRef<HTMLDivElement>(null);

  const resolved = resolveAllStyles(system as any);
  const googleHref = toGoogleFontsLink(system as any);

  /* ---------- export handler ---------- */
  const handleExport = async () => {
    if (!previewRef.current) return;
    setBusy(true);

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const el = previewRef.current;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      if (format === "png") {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `typography-${preset}-${Date.now()}.png`;
        a.click();
      } else {
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          canvas.width,
          canvas.height
        );
        pdf.save(`typography-${preset}-${Date.now()}.pdf`);
      }
    } catch (err) {
      console.error("[ExportImage] failed:", err);
      alert("خطا در تولید خروجی. دوباره تلاش کن.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          خروجی تصویری
        </h3>
        <button
          onClick={handleExport}
          disabled={busy || resolved.length === 0}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              در حال تولید...
            </>
          ) : format === "png" ? (
            <>
              <HiPhotograph className="h-3.5 w-3.5" />
              دانلود PNG
            </>
          ) : (
            <>
              <HiDocument className="h-3.5 w-3.5" />
              دانلود PDF
            </>
          )}
        </button>
      </div>

      {/* ============ Controls ============ */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex gap-0.5 rounded-lg bg-white p-0.5 dark:bg-gray-950">
          {(["png", "pdf"] as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
                format === f
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex gap-0.5 rounded-lg bg-white p-0.5 dark:bg-gray-950">
          {(
            [
              { id: "styles", label: "استایل‌ها" },
              { id: "poster", label: "پوستر" },
              { id: "cheatsheet", label: "چیت‌شیت" },
            ] as { id: Preset; label: string }[]
          ).map((p) => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
                preset === p.id
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-1.5 text-[11px]">
          <input
            type="checkbox"
            checked={includeWeights}
            onChange={(e) => setIncludeWeights(e.target.checked)}
            className="h-3 w-3 accent-blue-600"
          />
          <span className="text-gray-600 dark:text-gray-400">وزن‌ها</span>
        </label>
        <label className="inline-flex items-center gap-1.5 text-[11px]">
          <input
            type="checkbox"
            checked={includeColors}
            onChange={(e) => setIncludeColors(e.target.checked)}
            className="h-3 w-3 accent-blue-600"
          />
          <span className="text-gray-600 dark:text-gray-400">رنگ‌ها</span>
        </label>
      </div>

      {/* ============ Preview (منبع export) ============ */}
      <div className="overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-3 dark:border-gray-800 dark:bg-gray-950">
        {googleHref && <link rel="stylesheet" href={googleHref} />}
        <div
          ref={previewRef}
          dir="rtl"
          className="mx-auto bg-white p-8 text-gray-900"
          style={{
            width: preset === "cheatsheet" ? "900px" : "720px",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          {preset === "styles" && (
            <StylesSheet
              resolved={resolved}
              includeWeights={includeWeights}
              includeColors={includeColors}
            />
          )}
          {preset === "poster" && <PosterSheet resolved={resolved} />}
          {preset === "cheatsheet" && (
            <CheatsheetSheet
              resolved={resolved}
              system={system}
              includeWeights={includeWeights}
            />
          )}
        </div>
      </div>

      <p className="text-[10px] text-gray-400">
        تصویر با مقیاس ۲x رندر می‌شه (~
        {preset === "cheatsheet" ? "1800" : "1440"}px عرض)
      </p>
    </section>
  );
}

/* =========================================================
 * Preset Renderers — بدون تغییر
 * =======================================================*/

function StylesSheet({
  resolved,
  includeWeights,
  includeColors,
}: {
  resolved: ReturnType<typeof resolveAllStyles>;
  includeWeights: boolean;
  includeColors: boolean;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1
          className="mb-2 text-3xl font-bold"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Typography System
        </h1>
        <p className="text-xs text-gray-500">
          {new Date().toLocaleDateString("fa-IR")} — {resolved.length} استایل
        </p>
      </div>

      {resolved.map((r) => (
        <div key={r.id} className="border-t border-gray-200 pt-6">
          <div className="mb-3 flex items-baseline justify-between">
            <code className="font-mono text-xs font-semibold text-blue-600">
              {r.name}
            </code>
            <span className="font-mono text-[10px] text-gray-400">
              {r.fontSize}px / {r.fontSizeRem}rem · w{r.fontWeight} · lh{" "}
              {r.lineHeight}
            </span>
          </div>
          <p
            style={{
              fontSize: `${r.fontSize}px`,
              fontWeight: r.fontWeight,
              lineHeight: r.lineHeight,
              letterSpacing: r.letterSpacing,
              fontFamily: r.fontFamily,
            }}
          >
            طراحی خوب دیده نمی‌شود — The quick brown fox jumps over the lazy
            dog. ۱۲۳۴۵۶۷۸۹۰
          </p>
        </div>
      ))}

      {includeWeights && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-semibold">وزن‌ها</h2>
          <div className="space-y-1">
            {[300, 400, 500, 600, 700, 800, 900].map((w) => (
              <p key={w} style={{ fontWeight: w }} className="text-sm">
                وزن {w} — Typography is invisible when done right.
              </p>
            ))}
          </div>
        </div>
      )}

      {includeColors && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-semibold">رنگ‌های نمونه</h2>
          <div className="flex gap-2">
            {[
              "#111827",
              "#374151",
              "#6b7280",
              "#9ca3af",
              "#2563eb",
              "#059669",
              "#dc2626",
            ].map((c) => (
              <div
                key={c}
                className="h-12 w-12 rounded"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 text-center text-[10px] text-gray-400">
        Generated with Typography Studio
      </div>
    </div>
  );
}

function PosterSheet({
  resolved,
}: {
  resolved: ReturnType<typeof resolveAllStyles>;
}) {
  const display = resolved.find((r) => r.name === "display") ?? resolved[0];
  const h1 = resolved.find((r) => r.name === "h1");
  const body = resolved.find((r) => r.name === "body");

  return (
    <div className="flex min-h-[600px] flex-col justify-between text-center">
      <div />
      <div className="space-y-6">
        {display && (
          <h1
            style={{
              fontSize: `${Math.min(display.fontSize, 96)}px`,
              fontWeight: display.fontWeight,
              lineHeight: display.lineHeight,
              letterSpacing: display.letterSpacing,
              fontFamily: display.fontFamily,
            }}
          >
            طراحی، ساده‌تر از آنچه فکر می‌کنی.
          </h1>
        )}
        {h1 && (
          <p
            style={{
              fontSize: `${Math.min(h1.fontSize, 32)}px`,
              fontWeight: h1.fontWeight,
              lineHeight: h1.lineHeight,
              fontFamily: h1.fontFamily,
            }}
            className="text-gray-600"
          >
            یک سیستم تایپوگرافی حرفه‌ای برای فارسی
          </p>
        )}
        {body && (
          <p
            style={{
              fontSize: "16px",
              lineHeight: body.lineHeight,
              fontFamily: body.fontFamily,
            }}
            className="mx-auto max-w-md text-gray-500"
          >
            این یک پوستر نمونه است تا زیبایی سیستم تایپوگرافی تو را در یک نگاه
            نشان بدهد.
          </p>
        )}
      </div>
      <div className="text-[10px] text-gray-400">
        Typography System · {new Date().toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}

function CheatsheetSheet({
  resolved,
  system,
  includeWeights,
}: {
  resolved: ReturnType<typeof resolveAllStyles>;
  system: ReturnType<typeof useTypography>;
  includeWeights: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-900 pb-3">
        <h1 className="text-2xl font-bold">Typography Cheatsheet</h1>
        <p className="mt-1 text-xs text-gray-500">
          {system.fontFamilies.filter((f) => f.active).length} فونت ·{" "}
          {resolved.length} استایل
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {resolved.map((r) => (
          <div key={r.id} className="rounded-lg border border-gray-200 p-3">
            <div className="mb-2 flex items-baseline justify-between">
              <code className="font-mono text-[10px] font-semibold text-blue-600">
                {r.name}
              </code>
              <span className="font-mono text-[9px] text-gray-400">
                {r.fontSize}px
              </span>
            </div>
            <p
              style={{
                fontSize: `${Math.min(r.fontSize, 22)}px`,
                fontWeight: r.fontWeight,
                lineHeight: Math.min(r.lineHeight, 1.5),
                fontFamily: r.fontFamily,
              }}
            >
              نمونه متن {r.name}
            </p>
            <div className="mt-2 font-mono text-[9px] text-gray-400">
              w{r.fontWeight} · lh {r.lineHeight}
            </div>
          </div>
        ))}
      </div>

      {includeWeights && (
        <div className="rounded-lg border border-gray-200 p-3">
          <h3 className="mb-2 text-xs font-semibold text-gray-700">
            وزن‌های فعال
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {system.fontWeights
              .filter((w) => w.active)
              .map((w) => (
                <div key={w.id} className="flex items-baseline gap-2">
                  <span className="font-mono text-[9px] text-gray-400">
                    {w.value}
                  </span>
                  <span
                    className="truncate text-sm"
                    style={{ fontWeight: w.value }}
                  >
                    {w.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 p-3">
        <h3 className="mb-2 text-xs font-semibold text-gray-700">
          فونت‌های فعال
        </h3>
        <div className="space-y-1">
          {system.fontFamilies
            .filter((f) => f.active)
            .map((f) => (
              <div key={f.id} className="flex items-baseline gap-3">
                <span className="w-24 shrink-0 font-mono text-[9px] text-gray-400">
                  {f.role}
                </span>
                <span
                  className="truncate text-sm"
                  style={{ fontFamily: f.stack }}
                >
                  {f.name} — طراحی خوب دیده نمی‌شود
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="border-t pt-3 text-center text-[9px] text-gray-400">
        Typography Studio · {new Date().toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}