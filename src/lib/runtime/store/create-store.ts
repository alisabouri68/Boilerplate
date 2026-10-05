// src/lib/runtime/store/create-store.ts
import { createStore, type StoreApi } from "zustand/vanilla";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { temporal } from "zundo";

import type { RuntimeState } from "../types";
import { createThemeState } from "../modules/theme/slice";

export type StoreConfig = {
  persistKey: string;
  enableUndo?: boolean;
  enablePersist?: boolean;
};

export function createRuntimeStore(config: StoreConfig): StoreApi<RuntimeState> {
  return createStore<RuntimeState>()(
    subscribeWithSelector(
      temporal(
        persist(
          () => ({
            ...createThemeState(),
          }),
          {
            name: config.persistKey,
            version: 1,
            partialize: (s) => ({ theme: s.theme }),
          }
        ),
        {
          limit: 100,
          partialize: (s) => ({ theme: s.theme }),
        }
      )
    )
  );
}