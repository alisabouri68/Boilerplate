// src/lib/runtime/modules/theme/index.ts
import type { StoreApi } from "zustand/vanilla";
import { BaseModule } from "../base-module";
import type { RuntimeState } from "../../types";
import type {
  ThemeState,
  ThemeMode,
  Direction,
  Density,
  ThemeTokens,
} from "./types";
import { resolveToken, deepSet } from "./resolve";

import {
  fontFamilyActions,
  fontSizeActions,
  fontWeightActions,
  lineHeightActions,
  letterSpacingActions,
  textStyleActions,
} from "./typography/actions";

import type {
  TypographySystem,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from "@/lib/design-system/core/typography-types";
import { defaultTypography } from "@/lib/design-system/core/typography-default";

export class ThemeModule extends BaseModule<"theme"> {
  constructor(store: StoreApi<RuntimeState>) {
    super(store, "theme");
  }

  /* ═══════════════════════════════════════════════════════
   * Core Getters
   * ═══════════════════════════════════════════════════════ */

  get mode(): ThemeMode {
    return this.state.mode;
  }

  get direction(): Direction {
    return this.state.direction;
  }

  get density(): Density {
    return this.state.density;
  }

  get tokens(): ThemeTokens {
    return this.state.tokens;
  }

  get typography(): TypographySystem {
    return this.state.tokens.typography;
  }

  get colors() {
    return this.state.tokens.colors;
  }

  get spacing() {
    return this.state.tokens.spacing;
  }

  /* ═══════════════════════════════════════════════════════
   * Resolve
   * ═══════════════════════════════════════════════════════ */

  /** "colors.primary" → "#3b82f6" */
  resolve(path: string): string | number | undefined {
    return resolveToken(this.state.tokens, path);
  }

  /* ═══════════════════════════════════════════════════════
   * Actions — Theme
   * ═══════════════════════════════════════════════════════ */

  setMode(mode: ThemeMode): void {
    this.setState({ mode });
    this.applyToDocument();
  }

  setDirection(direction: Direction): void {
    this.setState({ direction });
    this.applyToDocument();
  }

  setDensity(density: Density): void {
    this.setState({ density });
    this.applyToDocument();
  }

  toggleMode(): void {
    const current = this.mode;
    const next: ThemeMode =
      current === "dark" ? "light" : current === "light" ? "dark" : "dark";
    this.setMode(next);
  }

  /* ═══════════════════════════════════════════════════════
   * Actions — Tokens (generic)
   * ═══════════════════════════════════════════════════════ */

  updateTypography(patch: Partial<TypographySystem>): void {
    this.setState((s) => ({
      tokens: {
        ...s.tokens,
        typography: { ...s.tokens.typography, ...patch },
      },
    }));
  }

  updateToken(path: string, value: unknown): void {
    this.setState((s) => ({
      tokens: deepSet(s.tokens, path, value) as ThemeTokens,
    }));
  }

  /* ═══════════════════════════════════════════════════════
   * Subscribe — Theme
   * ═══════════════════════════════════════════════════════ */

  subscribeToTheme(
    listener: (theme: ThemeState, prev: ThemeState) => void,
  ): () => void {
    return this.subscribe(listener);
  }

  onModeChange(listener: (mode: ThemeMode) => void): () => void {
    return this.subscribeTo((s) => s.theme.mode, listener, {
      fireImmediately: true,
    });
  }

  onDirectionChange(listener: (d: Direction) => void): () => void {
    return this.subscribeTo((s) => s.theme.direction, listener, {
      fireImmediately: true,
    });
  }

  /* ═══════════════════════════════════════════════════════
   * Subscribe — Typography
   * ═══════════════════════════════════════════════════════ */

  onTypographyChange(
    listener: (t: TypographySystem, prev: TypographySystem) => void,
  ): () => void {
    return this.subscribeTo((s) => s.theme.tokens.typography, listener, {
      fireImmediately: true,
    });
  }

  onFontFamiliesChange(
    listener: (f: FontFamily[], prev: FontFamily[]) => void,
  ): () => void {
    return this.subscribeTo(
      (s) => s.theme.tokens.typography.fontFamilies,
      listener,
      { fireImmediately: true },
    );
  }

  onTextStylesChange(
    listener: (t: TextStyle[], prev: TextStyle[]) => void,
  ): () => void {
    return this.subscribeTo(
      (s) => s.theme.tokens.typography.textStyles,
      listener,
      { fireImmediately: true },
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Getters
   * ═══════════════════════════════════════════════════════ */

  get fontFamilies() {
    return this.typography.fontFamilies;
  }
  get fontSizes() {
    return this.typography.fontSizes;
  }
  get fontWeights() {
    return this.typography.fontWeights;
  }
  get lineHeights() {
    return this.typography.lineHeights;
  }
  get letterSpacings() {
    return this.typography.letterSpacings;
  }
  get textStyles() {
    return this.typography.textStyles;
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Actions — Font Families
   * ═══════════════════════════════════════════════════════ */

  addFontFamily(patch?: Partial<FontFamily>): void {
    this.updateTypographyInternal((sys) => fontFamilyActions.add(sys, patch));
  }
  updateFontFamily(id: string, patch: Partial<FontFamily>): void {
    this.updateTypographyInternal((sys) =>
      fontFamilyActions.update(sys, id, patch),
    );
  }
  removeFontFamily(id: string): void {
    this.updateTypographyInternal((sys) => fontFamilyActions.remove(sys, id));
  }
  toggleFontFamily(id: string): void {
    this.updateTypographyInternal((sys) => fontFamilyActions.toggle(sys, id));
  }
  reorderFontFamilies(from: number, to: number): void {
    this.updateTypographyInternal((sys) =>
      fontFamilyActions.reorder(sys, from, to),
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Actions — Font Sizes
   * ═══════════════════════════════════════════════════════ */

  addFontSize(patch?: Partial<FontSize>): void {
    this.updateTypographyInternal((sys) => fontSizeActions.add(sys, patch));
  }
  updateFontSize(id: string, patch: Partial<FontSize>): void {
    this.updateTypographyInternal((sys) =>
      fontSizeActions.update(sys, id, patch),
    );
  }
  removeFontSize(id: string): void {
    this.updateTypographyInternal((sys) => fontSizeActions.remove(sys, id));
  }
  toggleFontSize(id: string): void {
    this.updateTypographyInternal((sys) => fontSizeActions.toggle(sys, id));
  }
  reorderFontSizes(from: number, to: number): void {
    this.updateTypographyInternal((sys) =>
      fontSizeActions.reorder(sys, from, to),
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Actions — Font Weights
   * ═══════════════════════════════════════════════════════ */

  addFontWeight(patch?: Partial<FontWeight>): void {
    this.updateTypographyInternal((sys) => fontWeightActions.add(sys, patch));
  }
  updateFontWeight(id: string, patch: Partial<FontWeight>): void {
    this.updateTypographyInternal((sys) =>
      fontWeightActions.update(sys, id, patch),
    );
  }
  removeFontWeight(id: string): void {
    this.updateTypographyInternal((sys) => fontWeightActions.remove(sys, id));
  }
  reorderFontWeights(from: number, to: number): void {
    this.updateTypographyInternal((sys) =>
      fontWeightActions.reorder(sys, from, to),
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Actions — Line Heights
   * ═══════════════════════════════════════════════════════ */

  addLineHeight(patch?: Partial<LineHeight>): void {
    this.updateTypographyInternal((sys) => lineHeightActions.add(sys, patch));
  }
  updateLineHeight(id: string, patch: Partial<LineHeight>): void {
    this.updateTypographyInternal((sys) =>
      lineHeightActions.update(sys, id, patch),
    );
  }
  removeLineHeight(id: string): void {
    this.updateTypographyInternal((sys) => lineHeightActions.remove(sys, id));
  }
  reorderLineHeights(from: number, to: number): void {
    this.updateTypographyInternal((sys) =>
      lineHeightActions.reorder(sys, from, to),
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Actions — Letter Spacings
   * ═══════════════════════════════════════════════════════ */

  addLetterSpacing(patch?: Partial<LetterSpacing>): void {
    this.updateTypographyInternal((sys) =>
      letterSpacingActions.add(sys, patch),
    );
  }
  updateLetterSpacing(id: string, patch: Partial<LetterSpacing>): void {
    this.updateTypographyInternal((sys) =>
      letterSpacingActions.update(sys, id, patch),
    );
  }
  removeLetterSpacing(id: string): void {
    this.updateTypographyInternal((sys) =>
      letterSpacingActions.remove(sys, id),
    );
  }
  reorderLetterSpacings(from: number, to: number): void {
    this.updateTypographyInternal((sys) =>
      letterSpacingActions.reorder(sys, from, to),
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Typography Actions — Text Styles
   * ═══════════════════════════════════════════════════════ */

  addTextStyle(patch?: Partial<TextStyle>): void {
    this.updateTypographyInternal((sys) => textStyleActions.add(sys, patch));
  }
  updateTextStyle(id: string, patch: Partial<TextStyle>): void {
    this.updateTypographyInternal((sys) =>
      textStyleActions.update(sys, id, patch),
    );
  }
  removeTextStyle(id: string): void {
    this.updateTypographyInternal((sys) => textStyleActions.remove(sys, id));
  }
  duplicateTextStyle(id: string): void {
    this.updateTypographyInternal((sys) => textStyleActions.duplicate(sys, id));
  }
  toggleTextStyle(id: string): void {
    this.updateTypographyInternal((sys) => textStyleActions.toggle(sys, id));
  }
  renameTextStyle(id: string, name: string): void {
    this.updateTypographyInternal((sys) =>
      textStyleActions.rename(sys, id, name),
    );
  }
  reorderTextStyles(from: number, to: number): void {
    this.updateTypographyInternal((sys) =>
      textStyleActions.reorder(sys, from, to),
    );
  }

  /* ═══════════════════════════════════════════════════════
   * Bulk
   * ═══════════════════════════════════════════════════════ */

  resetTypography(): void {
    this.updateTypographyInternal(() => structuredClone(defaultTypography));
  }

  importTypography(system: TypographySystem): void {
    this.updateTypographyInternal(() => structuredClone(system));
  }

  /* ═══════════════════════════════════════════════════════
   * Lifecycle
   * ═══════════════════════════════════════════════════════ */

  async initialize(): Promise<void> {
    this.applyToDocument();
  }
  /* ═══════════════════════════════════════════════════════
   * Meta — dirty tracking
   * ═══════════════════════════════════════════════════════ */

  get dirty(): boolean {
    return this.state.dirty;
  }

  get updatedAt(): string | null {
    return this.state.updatedAt;
  }

  markClean(): void {
    this.setState({
      dirty: false,
      updatedAt: new Date().toISOString(),
    });
  }

  /* ═══════════════════════════════════════════════════════
   * Export / Import
   * ═══════════════════════════════════════════════════════ */

  /** کلون از typography فعلی برای export */
  exportTypography(): TypographySystem {
    return structuredClone(this.typography);
  }
  /* ═══════════════════════════════════════════════════════
   * Internals
   * ═══════════════════════════════════════════════════════ */

private updateTypographyInternal(
  updater: (sys: TypographySystem) => TypographySystem
): void {
  this.setState((s) => ({
    dirty: true,
    updatedAt: new Date().toISOString(),
    tokens: {
      ...s.tokens,
      typography: updater(s.tokens.typography),
    },
  }));
}

  private applyToDocument(): void {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    const isDark =
      this.mode === "dark" ||
      (this.mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.toggle("dark", isDark);
    root.dataset.theme = isDark ? "dark" : "light";

    root.dir = this.direction;
    root.dataset.direction = this.direction;

    root.dataset.density = this.density;
  }
}
