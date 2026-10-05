// _hooks/useTabParam.ts
"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_TAB, isValidTab, type TabId } from "../_config/tabs";

export function useTabParam(): [TabId, (t: TabId) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const raw = params.get("tab");
  const tab: TabId = isValidTab(raw) ? raw : DEFAULT_TAB;

  const setTab = useCallback(
    (next: TabId) => {
      const sp = new URLSearchParams(params.toString());
      if (next === DEFAULT_TAB) sp.delete("tab");
      else sp.set("tab", next);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router]
  );

  return [tab, setTab];
}