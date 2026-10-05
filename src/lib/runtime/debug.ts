// src/lib/runtime/debug.ts
import { runtime } from "./runtime-manager";

/**
 * همه تغییرات runtime رو در کنسول لاگ می‌کنه.
 * این روش به middleware نیاز نداره — فقط subscribe می‌کنه.
 */
export function watchRuntime(): () => void {
  let prev = runtime.getState();

  return runtime.subscribe((state) => {
    const changed = findChangedKeys(
      prev as Record<string, unknown>,
      state as Record<string, unknown>
    );

    if (changed.length > 0) {
      const label = `🔵 Runtime · ${changed.join(", ")}`;
      console.groupCollapsed(
        `%c${label}`,
        "color: #3b82f6; font-weight: bold; padding: 2px 4px; background: #eff6ff; border-radius: 3px;"
      );

      changed.forEach((key) => {
        console.log(
          `%c${key}`,
          "color: #8b5cf6; font-weight: bold;",
          "\n  قبل:",
          (prev as Record<string, unknown>)[key],
          "\n  بعد:",
          (state as Record<string, unknown>)[key]
        );
      });

      console.groupEnd();
    }

    prev = state;
  });
}

function findChangedKeys(
  prev: Record<string, unknown>,
  next: Record<string, unknown>
): string[] {
  const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);
  const changed: string[] = [];
  keys.forEach((key) => {
    if (prev[key] !== next[key]) changed.push(key);
  });
  return changed;
}

/**
 * وضعیت فعلی runtime رو چاپ می‌کنه.
 */
export function logRuntimeState(): void {
  const state = runtime.getState();
  console.group("📸 Runtime Snapshot");
  console.log("Mode:", state.theme.mode);
  console.log("Direction:", state.theme.direction);
  console.log("Density:", state.theme.density);
  console.log("Fonts:", state.theme.tokens.typography.fontFamilies.length);
  console.log("Styles:", state.theme.tokens.typography.textStyles.length);
  console.log("History:", runtime.history);
  console.log("Full State:", state);
  console.groupEnd();
}

/**
 * runtime رو در `window` expose می‌کنه.
 * در development، در layout صدا بزن.
 */
export function exposeRuntimeToWindow(): void {
  if (typeof window === "undefined") return;

  (window as unknown as { __runtime: typeof runtime }).__runtime = runtime;
  (window as unknown as { __logRuntime: typeof logRuntimeState }).__logRuntime =
    logRuntimeState;

  console.log(
    "%c💡 Runtime exposed to console",
    "color: #3b82f6; font-weight: bold; background: #eff6ff; padding: 4px 8px; border-radius: 4px;",
    "\n  • window.__runtime → دسترسی کامل",
    "\n  • window.__logRuntime() → چاپ وضعیت",
    "\n  • window.__watchRuntime() → لاگ خودکار"
  );
}