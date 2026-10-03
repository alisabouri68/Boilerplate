"use client";

import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useColorsStore } from "./colors-store";

export const useSaveStatus = () =>
  useColorsStore(
    useShallow((s) => ({
      status: s.status,
      errorMessage: s.errorMessage,
      dirty: s.dirty,
      autoSave: s.autoSave,
      save: s.save,
      setAutoSave: s.setAutoSave,
    })),
  );

export const useHistory = () =>
  useColorsStore(
    useShallow((s) => ({
      undo: s.undo,
      redo: s.redo,
      canUndo: s.history.length > 0,
      canRedo: s.future.length > 0,
    })),
  );

export const usePaletteActions = () =>
  useColorsStore(
    useShallow((s) => ({
      addPalette: s.addPalette,
      removePalette: s.removePalette,
      updatePalette: s.updatePalette,
      duplicatePalette: s.duplicatePalette,
      togglePalette: s.togglePalette,
      togglePinPalette: s.togglePinPalette,
      toggleCollapsePalette: s.toggleCollapsePalette,
      addShade: s.addShade,
      removeShade: s.removeShade,
      updateShade: s.updateShade,
      duplicateShade: s.duplicateShade,
      toggleShade: s.toggleShade,
      togglePinShade: s.togglePinShade,
      regenerateShades: s.regenerateShades,
      reorderPalettes: s.reorderPalettes,
      bulkTogglePalettes: s.bulkTogglePalettes,
      bulkDeletePalettes: s.bulkDeletePalettes,
    })),
  );

export const useSemanticActions = () =>
  useColorsStore(
    useShallow((s) => ({
      add: s.addSemantic,
      remove: s.removeSemantic,
      update: s.updateSemantic,
      duplicate: s.duplicateSemantic,
      toggle: s.toggleSemantic,
      bulkToggle: s.bulkToggleSemantic,
      bulkDelete: s.bulkDeleteSemantic,
      syncFromTheme: s.syncSemanticsFromTheme, // ← جدید
    })),
  );

export const useIO = () =>
  useColorsStore(
    useShallow((s) => ({
      reset: s.reset,
      importSystem: s.importSystem,
      exportSystem: s.exportSystem,
    })),
  );

export const useUI = () =>
  useColorsStore(
    useShallow((s) => ({
      search: s.search,
      filter: s.filter,
      sort: s.sort,
      setSearch: s.setSearch,
      setFilter: s.setFilter,
      setSort: s.setSort,
      selectedPaletteIds: s.selectedPaletteIds,
      selectedShadeIds: s.selectedShadeIds,
      selectedSemanticIds: s.selectedSemanticIds,
      toggleSelectPalette: s.toggleSelectPalette,
      toggleSelectShade: s.toggleSelectShade,
      toggleSelectSemantic: s.toggleSelectSemantic,
      selectAllPalettes: s.selectAllPalettes,
      selectNonePalettes: s.selectNonePalettes,
      clearSelection: s.clearSelection,
    })),
  );

/* ---------------- Auto Save ---------------- */
export function useAutoSave() {
  const dirty = useColorsStore((s) => s.dirty);
  const autoSave = useColorsStore((s) => s.autoSave);
  const save = useColorsStore((s) => s.save);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!autoSave || !dirty) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => save(), 1500);
    return () => clearTimeout(timer.current);
  }, [dirty, autoSave, save]);
}

/* ---------------- Keyboard shortcuts ---------------- */
export function useShortcuts(handlers: {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onEscape?: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.ctrlKey || e.metaKey;
      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handlers.onSave?.();
      } else if (meta && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        handlers.onUndo?.();
      } else if (
        meta &&
        (e.key.toLowerCase() === "y" ||
          (e.key.toLowerCase() === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        handlers.onRedo?.();
      } else if (e.key === "Escape") {
        handlers.onEscape?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
}
