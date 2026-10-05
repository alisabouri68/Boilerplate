// src/lib/runtime/index.ts

/* ═══════════ Public API ═══════════ */

export { runtime, RuntimeManager } from "./runtime-manager";
export type { RuntimeConfig } from "./runtime-manager";

/* ═══════════ Types ═══════════ */

export type { RuntimeState} from './types'
export type { ThemeState, ThemeMode, Direction, Density } from "./modules/theme/types";

/* ═══════════ Base for extension ═══════════ */

export { BaseModule } from "./modules/base-module";