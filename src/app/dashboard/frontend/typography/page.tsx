// page.tsx
"use client";

import { Suspense } from "react";
import TypographyToolbar from "./_components/TypographyToolbar";
import TypographyPreview from "./_components/TypographyPreview";
import A11yPanel from "./_components/A11yPanel";
import { TabList } from "./_components/TabList";
import { TABS } from "./_config/tabs";
import { useTabParam } from "./_hooks/useTabParam";

function Inner() {
  const [tab, setTab] = useTabParam();
  const current = TABS.find((t) => t.id === tab) ?? TABS[0];
  const Section = current.Component;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <TypographyToolbar />

      <div className="sticky top-0 z-10 -mx-4 border-b border-gray-200 bg-white/80 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
        <TabList tabs={TABS} active={tab} onChange={setTab} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          id={`panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="space-y-6"
        >
          <Section />
        </section>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <TypographyPreview />
          </div>
          <A11yPanel />
        </aside>
      </div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}