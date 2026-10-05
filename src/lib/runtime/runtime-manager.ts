// src/lib/runtime/runtime-manager.ts
import type { StoreApi } from "zustand/vanilla";

import { createRuntimeStore } from "./store/create-store";
import type { RuntimeState } from "./types";
import { ThemeModule } from "./modules/theme";

export type RuntimeConfig = {
  persistKey?: string;
  autoInitialize?: boolean;
};

/**
 * RuntimeManager
 *
 * - Singleton
 * - Framework-agnostic (بدون وابستگی به React)
 * - Lifecycle متمرکز
 * - دسترسی به همه moduleها از یک نقطه
 */
export class RuntimeManager {
  private readonly store: StoreApi<RuntimeState>;
  private _initialized = false;

  /* ═══════════════════════════════════════
   * Modules
   * ═══════════════════════════════════════ */

  /** ماژول theme (typography, colors, ...) */
  readonly theme: ThemeModule;

  // فازهای بعدی:
  // readonly global: GlobalModule;
  // readonly session: SessionModule;
  // readonly socket: SocketManager;

  constructor(config: RuntimeConfig = {}) {
    this.store = createRuntimeStore({
      persistKey: config.persistKey ?? "app-runtime",
    });

    this.theme = new ThemeModule(this.store);
  }

  /* ═══════════════════════════════════════
   * Lifecycle
   * ═══════════════════════════════════════ */

  async initialize(): Promise<void> {
    if (this._initialized) return;
    await this.theme.initialize();
    this._initialized = true;
  }

  async destroy(): Promise<void> {
    await this.theme.destroy();
    this._initialized = false;
  }

  get isInitialized(): boolean {
    return this._initialized;
  }

  /* ═══════════════════════════════════════
   * Direct Store Access
   * ═══════════════════════════════════════ */

  getState = (): RuntimeState => this.store.getState();

  setState = (
    patch: Partial<RuntimeState> | ((s: RuntimeState) => Partial<RuntimeState>)
  ): void => {
    this.store.setState(patch as Partial<RuntimeState>);
  };

  subscribe = (listener: (s: RuntimeState) => void): (() => void) => {
    return this.store.subscribe(listener);
  };

  /* ═══════════════════════════════════════
   * Undo / Redo
   * ═══════════════════════════════════════ */

  undo = (): void => {
    (this.store as unknown as { temporal: { getState: () => { undo: () => void } } })
      .temporal.getState().undo();
  };

  redo = (): void => {
    (this.store as unknown as { temporal: { getState: () => { redo: () => void } } })
      .temporal.getState().redo();
  };

  clearHistory = (): void => {
    (this.store as unknown as { temporal: { getState: () => { clear: () => void } } })
      .temporal.getState().clear();
  };

  get history(): { past: number; future: number } {
    const t = (this.store as unknown as {
      temporal: {
        getState: () => {
          pastStates: unknown[];
          futureStates: unknown[];
        };
      };
    }).temporal.getState();

    return {
      past: t.pastStates.length,
      future: t.futureStates.length,
    };
  }

  /* ═══════════════════════════════════════
   * Internal (for hooks)
   * ═══════════════════════════════════════ */

  get _store(): StoreApi<RuntimeState> {
    return this.store;
  }
}

/* ═══════════════════════════════════════
 * Singleton
 * ═══════════════════════════════════════ */

export const runtime = new RuntimeManager({
  persistKey: "app-runtime",
});