"use client";

import { useState } from "react";
import TypographyToolbar from "./_components/TypographyToolbar";
import FontsSection from "./_components/FontsSection";
import TypeScaleSection from "./_components/TypeScaleSection";
import FontWeightsSection from "./_components/FontWeightsSection";
import LineHeightsSection from "./_components/LineHeightsSection";
import TextStylesSection from "./_components/TextStylesSection";
import TypographyPreview from "./_components/TypographyPreview";
import TypographyExport from "./_components/TypographyExport";

const TABS = [
  { id: "fonts", label: "فونت‌ها" },
  { id: "scale", label: "مقیاس سایز" },
  { id: "weights", label: "وزن‌ها" },
  { id: "lines", label: "ارتفاع خط" },
  { id: "styles", label: "استایل‌های متنی" },
  { id: "export", label: "خروجی" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function TypographyPage() {
  const [tab, setTab] = useState<Tab>("fonts");

  return (
    <div className="space-y-6">
      <TypographyToolbar />

      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                tab === t.id
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {tab === "fonts" && <FontsSection />}
          {tab === "scale" && <TypeScaleSection />}
          {tab === "weights" && <FontWeightsSection />}
          {tab === "lines" && <LineHeightsSection />}
          {tab === "styles" && <TextStylesSection />}
          {tab === "export" && <TypographyExport />}
        </div>

        <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <TypographyPreview />
          </div>
        </div>
      </div>
    </div>
  );
}