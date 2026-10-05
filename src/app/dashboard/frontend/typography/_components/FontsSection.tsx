// _components/FontsSection.tsx
"use client";

import { useRef, useState } from "react";
import { useFontFamilies, useRuntimeAPI } from "@/lib/runtime/react";

import {
  searchGoogleFonts,
  GOOGLE_FONT_CATEGORIES,
  POPULAR_GOOGLE_FONTS,
  type GoogleFontCategory,
  type GoogleFontEntry,
} from "@/lib/design-system/google-fonts-catalog";
import { useFontPersistence } from "@/lib/design-system/use-font-persistence";
import { EmptyState } from "./ui/EmptyState";
import {
  HiPlus,
  HiTrash,
  HiEye,
  HiEyeOff,
  HiUpload,
  HiSearch,
  HiX,
} from "react-icons/hi";

const SAMPLE_FA = "سلام دنیا — ۱۲۳۴۵۶۷۸۹۰ · ABC abc";

export default function FontsSection() {
  const fontFamilies = useFontFamilies();
  const rt = useRuntimeAPI();

  const { status, usage, uploadFont, deleteUploadedFont } = useFontPersistence();

  const [googleOpen, setGoogleOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GoogleFontCategory | "all">("all");

  const fileRef = useRef<HTMLInputElement>(null);

  const results = searchGoogleFonts(query, { category, limit: 40 });

  const addGoogleFont = (entry: GoogleFontEntry) => {
    const stack = `${entry.family.replace(/\s+/g, "")}, system-ui, sans-serif`;
    rt.theme.addFontFamily({
      name: entry.family,
      stack,
      role: entry.category === "monospace" ? "mono" : "sans",
      googleFont: entry.googleFont,
      active: true,
    });

    const linkId = `gf-${entry.googleFont}`;
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${entry.googleFont}&display=swap`;
      document.head.appendChild(link);
    }
  };

  const handleUpload = async (file: File) => {
    await uploadFont(file);
  };

  const handleRemove = async (id: string, name: string) => {
    const f = fontFamilies.find((x) => x.id === id);
    if (f?.googleFont) {
      rt.theme.removeFontFamily(id);
    } else {
      await deleteUploadedFont(name);
    }
  };

  return (
    <section className="space-y-3">
      {/* ============ Header ============ */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          خانواده فونت‌ها
          <span className="ms-2 text-[10px] font-normal text-gray-500 dark:text-gray-400">
            {fontFamilies.filter((f) => f.active).length} فعال
          </span>
        </h3>
        <div className="flex gap-1.5">
          <button
            onClick={() => setGoogleOpen((v) => !v)}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              googleOpen
                ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <HiSearch className="h-3.5 w-3.5" />
            Google Fonts
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <HiUpload className="h-3.5 w-3.5" />
            آپلود
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".woff,.woff2,.ttf,.otf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => rt.theme.addFontFamily()}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <HiPlus className="h-3.5 w-3.5" />
            فونت
          </button>
        </div>
      </div>

      {/* ============ Storage indicator ============ */}
      {usage && usage.count > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-1.5 text-[10px] dark:border-gray-800 dark:bg-gray-900/50">
          <span className="text-gray-500 dark:text-gray-400">
            💾 فونت‌های آپلودی: {usage.count} فایل · {usage.formatted}
          </span>
          {status === "loading" && (
            <span className="text-blue-500">در حال بازیابی...</span>
          )}
        </div>
      )}

      {/* ============ Google Picker ============ */}
      {googleOpen && (
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 dark:border-blue-900 dark:bg-blue-950/20">
          <div className="relative mb-2">
            <HiSearch className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی فونت... (Poppins، Vazirmatn، Inter)"
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-9 pl-8 text-xs focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <HiX className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="mb-3 flex flex-wrap gap-1">
            {GOOGLE_FONT_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition ${
                  category === c.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {results.length === 0 ? (
            <div className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
              فونتی با «{query}» پیدا نشد
            </div>
          ) : (
            <div className="max-h-72 space-y-1 overflow-y-auto">
              {results.map((f) => {
                const alreadyAdded = fontFamilies.some(
                  (x) => x.googleFont === f.googleFont
                );
                return (
                  <button
                    key={f.family}
                    onClick={() => !alreadyAdded && addGoogleFont(f)}
                    disabled={alreadyAdded}
                    className={`flex w-full items-center justify-between rounded-lg bg-white p-2.5 text-right transition hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 ${
                      alreadyAdded ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          {f.family}
                        </span>
                        <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          {f.category}
                        </span>
                        {f.subsets.includes("arabic") && (
                          <span className="rounded-full bg-green-50 px-1.5 py-0.5 text-[9px] text-green-700 dark:bg-green-950 dark:text-green-400">
                            فارسی
                          </span>
                        )}
                        {f.variable && (
                          <span className="rounded-full bg-purple-50 px-1.5 py-0.5 text-[9px] text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                            Variable
                          </span>
                        )}
                      </div>
                      <div
                        className="mt-1 truncate text-sm text-gray-700 dark:text-gray-300"
                        style={{ fontFamily: f.family }}
                      >
                        {SAMPLE_FA}
                      </div>
                    </div>
                    {alreadyAdded && (
                      <span className="ms-2 shrink-0 text-[10px] text-gray-400">
                        اضافه شده
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <p className="mt-2 text-[10px] text-gray-400">
            {results.length} نتیجه · {POPULAR_GOOGLE_FONTS.length} فونت در کاتالوگ
          </p>
        </div>
      )}

      {/* ============ Empty state ============ */}
      {fontFamilies.length === 0 && (
        <EmptyState
          title="هنوز فونتی نداری"
          description="از Google Fonts، آپلود محلی، یا افزودن دستی شروع کن."
          action={{
            label: "افزودن فونت",
            onClick: () => rt.theme.addFontFamily(),
          }}
        />
      )}

      {/* ============ Font list ============ */}
      <div className="space-y-2">
        {fontFamilies.map((f) => (
          <div
            key={f.id}
            className="rounded-xl border border-gray-200 bg-white p-2.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => rt.theme.toggleFontFamily(f.id)}
                className={`rounded-lg p-1.5 ${
                  f.active
                    ? "text-green-600 hover:bg-green-50 dark:text-green-400"
                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {f.active ? (
                  <HiEye className="h-4 w-4" />
                ) : (
                  <HiEyeOff className="h-4 w-4" />
                )}
              </button>

              <input
                value={f.name}
                onChange={(e) =>
                  rt.theme.updateFontFamily(f.id, { name: e.target.value })
                }
                className="w-28 rounded border border-gray-200 px-2 py-1 text-xs font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />

              <select
                value={f.role}
                onChange={(e) =>
                  rt.theme.updateFontFamily(f.id, {
                    role: e.target.value as typeof f.role,
                  })
                }
                className="rounded border border-gray-200 px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              >
                <option value="sans">sans</option>
                <option value="serif">serif</option>
                <option value="mono">mono</option>
                <option value="display">display</option>
              </select>

              <input
                value={f.stack}
                onChange={(e) =>
                  rt.theme.updateFontFamily(f.id, { stack: e.target.value })
                }
                className="min-w-0 flex-1 rounded border border-gray-200 px-2 py-1 font-mono text-[11px] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
                placeholder="Vazirmatn, sans-serif"
              />

              {f.googleFont && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  Google
                </span>
              )}

              <button
                onClick={() => handleRemove(f.id, f.name)}
                className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <HiTrash className="h-4 w-4" />
              </button>
            </div>

            <p
              className="mt-2 truncate text-sm text-gray-700 dark:text-gray-300"
              style={{ fontFamily: f.stack }}
              dir="rtl"
            >
              {SAMPLE_FA}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}