// src/lib/runtime/types.ts
import type { ThemeState } from "./modules/theme/types";

/**
 * Root state of Runtime.
 * با افزودن هر slice جدید، این type گسترش پیدا می‌کنه.
 */
export type RuntimeState = {
  theme: ThemeState;

  // فازهای بعدی:
  // global: GlobalState;
  // session: SessionState;
  // routing: RoutingState;
  // layout: LayoutState;
  // widgets: WidgetsState;
  // channels: ChannelsState;
  // ui: UIState;
};