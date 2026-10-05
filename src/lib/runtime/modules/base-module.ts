// src/lib/runtime/modules/base-module.ts
import type { StoreApi } from "zustand/vanilla";
import type { RuntimeState } from "../types";

/**
 * Storeای که subscribeWithSelector داره.
 * این تایپ، overload های اضافه رو اضافه می‌کنه.
 */
export type SelectorStore<T> = StoreApi<T> & {
  subscribe: {
    /** حالت ساده — بدون selector */
    (listener: (state: T, prev: T) => void): () => void;
    /** حالت با selector */
    <U>(
      selector: (state: T) => U,
      listener: (curr: U, prev: U) => void,
      options?: {
        equalityFn?: (a: U, b: U) => boolean;
        fireImmediately?: boolean;
      }
    ): () => void;
  };
};

/**
 * کلاس پایه با تایپ درست store.
 */
export abstract class BaseModule<K extends keyof RuntimeState> {
  protected readonly store: SelectorStore<RuntimeState>;
  protected readonly key: K;

  constructor(store: StoreApi<RuntimeState>, key: K) {
    this.store = store as SelectorStore<RuntimeState>;
    this.key = key;
  }

  /* ═══════════ Read ═══════════ */

  protected get state(): RuntimeState[K] {
    return this.store.getState()[this.key];
  }

  protected select<T>(selector: (s: RuntimeState[K]) => T): T {
    return selector(this.state);
  }

  /* ═══════════ Write ═══════════ */

  protected setState(
    patch:
      | Partial<RuntimeState[K]>
      | ((prev: RuntimeState[K]) => Partial<RuntimeState[K]>)
  ): void {
    this.store.setState((s) => {
      const prev = s[this.key];
      const next =
        typeof patch === "function"
          ? (patch as (p: RuntimeState[K]) => Partial<RuntimeState[K]>)(prev)
          : patch;

      return { [this.key]: { ...(prev as object), ...next } } as Partial<RuntimeState>;
    });
  }

  protected replaceState(next: RuntimeState[K]): void {
    this.store.setState({ [this.key]: next } as Partial<RuntimeState>);
  }

  /* ═══════════ Subscribe ═══════════ */

  /** اشتراک به کل slice */
  protected subscribe(
    listener: (state: RuntimeState[K], prev: RuntimeState[K]) => void
  ): () => void {
    return this.store.subscribe(
      (s) => s[this.key],
      listener as (curr: RuntimeState[K], prev: RuntimeState[K]) => void,
      { fireImmediately: true }
    );
  }

  /**
   * اشتراک با selector — عمومی.
   * مثال: subscribeTo(s => s.theme.mode, (mode) => ...)
   */
  protected subscribeTo<U>(
    selector: (state: RuntimeState) => U,
    listener: (curr: U, prev: U) => void,
    options?: { fireImmediately?: boolean }
  ): () => void {
    return this.store.subscribe(selector, listener, {
      fireImmediately: options?.fireImmediately ?? true,
    });
  }

  /* ═══════════ Lifecycle ═══════════ */

  async initialize(): Promise<void> {}
  async destroy(): Promise<void> {}
}