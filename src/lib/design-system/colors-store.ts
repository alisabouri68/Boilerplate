import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type {
  ColorPalette,
  ColorShade,
  ColorsDesignSystem,
  FilterMode,
  SemanticColor,
  SortMode,
} from "./types";
import { defaultColors } from "./colors-default";
import { generateShades, uid } from "./colors-utils";

type Status = "idle" | "saving" | "saved" | "error";

interface ColorsState {
  /* data */
  id?: string;
  version: number;
  palettes: ColorPalette[];
  semanticColors: SemanticColor[];
  updatedAt?: string;
  dirty: boolean;

  /* ui state */
  status: Status;
  errorMessage?: string;
  autoSave: boolean;
  search: string;
  filter: FilterMode;
  sort: SortMode;
  selectedPaletteIds: string[];
  selectedShadeIds: string[];
  selectedSemanticIds: string[];

  /* history */
  history: ColorsDesignSystem[];
  future: ColorsDesignSystem[];

  /* ui actions */
  setSearch: (v: string) => void;
  setFilter: (v: FilterMode) => void;
  setSort: (v: SortMode) => void;
  setAutoSave: (v: boolean) => void;
  clearSelection: () => void;

  /* selection */
  toggleSelectPalette: (id: string) => void;
  toggleSelectShade: (id: string) => void;
  toggleSelectSemantic: (id: string) => void;
  selectAllPalettes: () => void;
  selectNonePalettes: () => void;

  /* palette */
  addPalette: (baseHex?: string) => void;
  removePalette: (id: string) => void;
  updatePalette: (id: string, patch: Partial<ColorPalette>) => void;
  duplicatePalette: (id: string) => void;
  togglePalette: (id: string) => void;
  togglePinPalette: (id: string) => void;
  toggleCollapsePalette: (id: string) => void;
  bulkTogglePalettes: (active: boolean) => void;
  bulkDeletePalettes: () => void;
  reorderPalettes: (from: number, to: number) => void;

  /* shade */
  addShade: (paletteId: string) => void;
  removeShade: (paletteId: string, shadeId: string) => void;
  updateShade: (paletteId: string, shadeId: string, patch: Partial<ColorShade>) => void;
  duplicateShade: (paletteId: string, shadeId: string) => void;
  toggleShade: (paletteId: string, shadeId: string) => void;
  togglePinShade: (paletteId: string, shadeId: string) => void;
  regenerateShades: (paletteId: string, baseHex: string) => void;

  /* semantic */
  addSemantic: () => void;
  removeSemantic: (id: string) => void;
  updateSemantic: (id: string, patch: Partial<SemanticColor>) => void;
  duplicateSemantic: (id: string) => void;
  toggleSemantic: (id: string) => void;
  bulkToggleSemantic: (active: boolean) => void;
  bulkDeleteSemantic: () => void;

  /* history */
  undo: () => void;
  redo: () => void;

  /* io */
  reset: () => void;
  importSystem: (ds: ColorsDesignSystem) => void;
  exportSystem: () => ColorsDesignSystem;
  save: () => Promise<void>;
}

const MAX_HISTORY = 50;

const snapshot = (s: ColorsState): ColorsDesignSystem => ({
  id: s.id,
  version: s.version,
  palettes: structuredClone(s.palettes),
  semanticColors: structuredClone(s.semanticColors),
  updatedAt: s.updatedAt,
});

const pushHistory = (s: ColorsState) => {
  const history = [...s.history, snapshot(s)];
  if (history.length > MAX_HISTORY) history.shift();
  return { history, future: [] };
};

export const useColorsStore = create<ColorsState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        id: defaultColors.id,
        version: defaultColors.version,
        palettes: defaultColors.palettes,
        semanticColors: defaultColors.semanticColors,
        updatedAt: defaultColors.updatedAt,
        dirty: false,

        status: "idle",
        autoSave: false,
        search: "",
        filter: "all",
        sort: "manual",
        selectedPaletteIds: [],
        selectedShadeIds: [],
        selectedSemanticIds: [],

        history: [],
        future: [],

        /* ---------------- UI ---------------- */
        setSearch: (v) => set({ search: v }),
        setFilter: (v) => set({ filter: v }),
        setSort: (v) => set({ sort: v }),
        setAutoSave: (v) => set({ autoSave: v }),
        clearSelection: () =>
          set({ selectedPaletteIds: [], selectedShadeIds: [], selectedSemanticIds: [] }),

        /* ---------------- Selection ---------------- */
        toggleSelectPalette: (id) =>
          set((s) => ({
            selectedPaletteIds: s.selectedPaletteIds.includes(id)
              ? s.selectedPaletteIds.filter((x) => x !== id)
              : [...s.selectedPaletteIds, id],
          })),

        toggleSelectShade: (id) =>
          set((s) => ({
            selectedShadeIds: s.selectedShadeIds.includes(id)
              ? s.selectedShadeIds.filter((x) => x !== id)
              : [...s.selectedShadeIds, id],
          })),

        toggleSelectSemantic: (id) =>
          set((s) => ({
            selectedSemanticIds: s.selectedSemanticIds.includes(id)
              ? s.selectedSemanticIds.filter((x) => x !== id)
              : [...s.selectedSemanticIds, id],
          })),

        selectAllPalettes: () =>
          set((s) => ({ selectedPaletteIds: s.palettes.map((p) => p.id) })),

        selectNonePalettes: () => set({ selectedPaletteIds: [] }),

        /* ---------------- Palette ---------------- */
        addPalette: (baseHex = "#3b82f6") =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: [
              ...s.palettes,
              {
                id: uid(),
                name: `Palette ${s.palettes.length + 1}`,
                active: true,
                shades: generateShades(baseHex, `new-${s.palettes.length + 1}`),
              },
            ],
          })),

        removePalette: (id) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.filter((p) => p.id !== id),
          })),

        updatePalette: (id, patch) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) => (p.id === id ? { ...p, ...patch } : p)),
          })),

        duplicatePalette: (id) =>
          set((s) => {
            const idx = s.palettes.findIndex((p) => p.id === id);
            if (idx < 0) return s;
            const src = s.palettes[idx];
            const clone: ColorPalette = {
              ...structuredClone(src),
              id: uid(),
              name: `${src.name} Copy`,
              shades: src.shades.map((sh) => ({ ...sh, id: uid() })),
            };
            const palettes = s.palettes.slice();
            palettes.splice(idx + 1, 0, clone);
            return { ...pushHistory(s), dirty: true, status: "idle", palettes };
          }),

        togglePalette: (id) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === id ? { ...p, active: !p.active } : p
            ),
          })),

        togglePinPalette: (id) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === id ? { ...p, pinned: !p.pinned } : p
            ),
          })),

        toggleCollapsePalette: (id) =>
          set((s) => ({
            palettes: s.palettes.map((p) =>
              p.id === id ? { ...p, collapsed: !p.collapsed } : p
            ),
          })),

        bulkTogglePalettes: (active) =>
          set((s) => {
            const ids = s.selectedPaletteIds.length
              ? s.selectedPaletteIds
              : s.palettes.map((p) => p.id);
            return {
              ...pushHistory(s),
              dirty: true,
              status: "idle",
              palettes: s.palettes.map((p) =>
                ids.includes(p.id) ? { ...p, active } : p
              ),
            };
          }),

        bulkDeletePalettes: () =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.filter((p) => !s.selectedPaletteIds.includes(p.id)),
            selectedPaletteIds: [],
          })),

        reorderPalettes: (from, to) =>
          set((s) => {
            if (from === to) return s;
            const palettes = s.palettes.slice();
            const [moved] = palettes.splice(from, 1);
            palettes.splice(to, 0, moved);
            return { ...pushHistory(s), dirty: true, status: "idle", palettes };
          }),

        /* ---------------- Shade ---------------- */
        addShade: (paletteId) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === paletteId
                ? {
                    ...p,
                    shades: [
                      ...p.shades,
                      {
                        id: uid(),
                        shade: "500",
                        token: "new-500",
                        hex: "#3b82f6",
                        active: true,
                      },
                    ],
                  }
                : p
            ),
          })),

        removeShade: (paletteId, shadeId) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === paletteId
                ? { ...p, shades: p.shades.filter((sh) => sh.id !== shadeId) }
                : p
            ),
          })),

        updateShade: (paletteId, shadeId, patch) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === paletteId
                ? {
                    ...p,
                    shades: p.shades.map((sh) =>
                      sh.id === shadeId ? { ...sh, ...patch } : sh
                    ),
                  }
                : p
            ),
          })),

        duplicateShade: (paletteId, shadeId) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) => {
              if (p.id !== paletteId) return p;
              const idx = p.shades.findIndex((sh) => sh.id === shadeId);
              if (idx < 0) return p;
              const src = p.shades[idx];
              const clone: ColorShade = {
                ...src,
                id: uid(),
                shade: `${src.shade}-copy`,
                token: `${src.token}-copy`,
              };
              const shades = p.shades.slice();
              shades.splice(idx + 1, 0, clone);
              return { ...p, shades };
            }),
          })),

        toggleShade: (paletteId, shadeId) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === paletteId
                ? {
                    ...p,
                    shades: p.shades.map((sh) =>
                      sh.id === shadeId ? { ...sh, active: !sh.active } : sh
                    ),
                  }
                : p
            ),
          })),

        togglePinShade: (paletteId, shadeId) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === paletteId
                ? {
                    ...p,
                    shades: p.shades.map((sh) =>
                      sh.id === shadeId ? { ...sh, pinned: !sh.pinned } : sh
                    ),
                  }
                : p
            ),
          })),

        regenerateShades: (paletteId, baseHex) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            palettes: s.palettes.map((p) =>
              p.id === paletteId
                ? { ...p, shades: generateShades(baseHex, p.name.toLowerCase()) }
                : p
            ),
          })),

        /* ---------------- Semantic ---------------- */
        addSemantic: () =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            semanticColors: [
              ...s.semanticColors,
              {
                id: uid(),
                name: "New",
                hex: "#6b7280",
                textHex: "#ffffff",
                desc: "توضیح",
                active: true,
              },
            ],
          })),

        removeSemantic: (id) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            semanticColors: s.semanticColors.filter((c) => c.id !== id),
          })),

        updateSemantic: (id, patch) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            semanticColors: s.semanticColors.map((c) =>
              c.id === id ? { ...c, ...patch } : c
            ),
          })),

        duplicateSemantic: (id) =>
          set((s) => {
            const idx = s.semanticColors.findIndex((c) => c.id === id);
            if (idx < 0) return s;
            const src = s.semanticColors[idx];
            const clone: SemanticColor = {
              ...structuredClone(src),
              id: uid(),
              name: `${src.name} Copy`,
            };
            const semanticColors = s.semanticColors.slice();
            semanticColors.splice(idx + 1, 0, clone);
            return { ...pushHistory(s), dirty: true, status: "idle", semanticColors };
          }),

        toggleSemantic: (id) =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            semanticColors: s.semanticColors.map((c) =>
              c.id === id ? { ...c, active: !c.active } : c
            ),
          })),

        bulkToggleSemantic: (active) =>
          set((s) => {
            const ids = s.selectedSemanticIds.length
              ? s.selectedSemanticIds
              : s.semanticColors.map((c) => c.id);
            return {
              ...pushHistory(s),
              dirty: true,
              status: "idle",
              semanticColors: s.semanticColors.map((c) =>
                ids.includes(c.id) ? { ...c, active } : c
              ),
            };
          }),

        bulkDeleteSemantic: () =>
          set((s) => ({
            ...pushHistory(s),
            dirty: true,
            status: "idle",
            semanticColors: s.semanticColors.filter(
              (c) => !s.selectedSemanticIds.includes(c.id)
            ),
            selectedSemanticIds: [],
          })),

        /* ---------------- History ---------------- */
        undo: () =>
          set((s) => {
            if (!s.history.length) return s;
            const prev = s.history[s.history.length - 1];
            return {
              ...prev,
              dirty: true,
              status: "idle",
              history: s.history.slice(0, -1),
              future: [snapshot(s), ...s.future].slice(0, MAX_HISTORY),
            };
          }),

        redo: () =>
          set((s) => {
            if (!s.future.length) return s;
            const next = s.future[0];
            return {
              ...next,
              dirty: true,
              status: "idle",
              future: s.future.slice(1),
              history: [...s.history, snapshot(s)].slice(-MAX_HISTORY),
            };
          }),

        /* ---------------- IO ---------------- */
        reset: () =>
          set(() => ({
            ...defaultColors,
            dirty: false,
            status: "idle",
            errorMessage: undefined,
            history: [],
            future: [],
            selectedPaletteIds: [],
            selectedShadeIds: [],
            selectedSemanticIds: [],
          })),

        importSystem: (ds) =>
          set((s) => ({
            ...pushHistory(s),
            id: ds.id,
            version: ds.version ?? 1,
            palettes: ds.palettes ?? [],
            semanticColors: ds.semanticColors ?? [],
            updatedAt: ds.updatedAt,
            dirty: true,
            status: "idle",
          })),

        exportSystem: () => snapshot(get()),

        save: async () => {
          const s = get();
          set({ status: "saving", errorMessage: undefined });
          try {
            const res = await fetch("/api/design-system/colors", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: s.id,
                version: s.version,
                palettes: s.palettes,
                semanticColors: s.semanticColors,
              }),
            });
            if (!res.ok) throw new Error("خطا در ذخیره‌سازی");
            const data = (await res.json()) as { id: string; updatedAt: string };
            set({
              id: data.id,
              updatedAt: data.updatedAt,
              status: "saved",
              dirty: false,
            });
          } catch (e) {
            set({ status: "error", errorMessage: (e as Error).message });
          }
        },
      }),
      {
        name: "colors-design-system",
        version: 2,
        migrate: (old: any) => {
          if (!old || old.version === 2) return old;
          const fixShade = (s: any) => ({
            ...s,
            id: s.id ?? uid(),
            active: s.active ?? true,
          });
          return {
            ...old,
            version: 2,
            palettes: (old.palettes ?? []).map((p: any) => ({
              ...p,
              id: p.id ?? uid(),
              active: p.active ?? true,
              shades: (p.shades ?? []).map(fixShade),
            })),
            semanticColors: (old.semanticColors ?? []).map((c: any) => ({
              ...c,
              id: c.id ?? uid(),
              active: c.active ?? true,
            })),
          };
        },
        partialize: (s) => ({
          id: s.id,
          version: s.version,
          palettes: s.palettes,
          semanticColors: s.semanticColors,
          updatedAt: s.updatedAt,
          autoSave: s.autoSave,
        }),
      }
    )
  )
);

/* ---------------- Selectors ---------------- */
export const selectPrimary = (s: ColorsState) =>
  s.semanticColors.find(
    (c) => c.active && c.name.toLowerCase() === "primary"
  ) ?? s.semanticColors.find((c) => c.active);

export const selectActiveSemantics = (s: ColorsState) =>
  s.semanticColors.filter((c) => c.active);

export const selectFilteredPalettes = (s: ColorsState): ColorPalette[] => {
  let list = s.palettes;

  if (s.filter === "active") list = list.filter((p) => p.active);
  else if (s.filter === "inactive") list = list.filter((p) => !p.active);
  else if (s.filter === "pinned") list = list.filter((p) => p.pinned);

  if (s.search.trim()) {
    const q = s.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.shades.some(
          (sh) =>
            sh.token.toLowerCase().includes(q) ||
            sh.hex.toLowerCase().includes(q)
        )
    );
  }

  if (s.sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (s.sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
  else if (s.sort === "shades-desc") list = [...list].sort((a, b) => b.shades.length - a.shades.length);

  return list;
};

export const selectStats = (s: ColorsState) => {
  const totalPalettes = s.palettes.length;
  const activePalettes = s.palettes.filter((p) => p.active).length;
  const totalShades = s.palettes.reduce((n, p) => n + p.shades.length, 0);
  const activeShades = s.palettes.reduce(
    (n, p) => n + p.shades.filter((sh) => sh.active).length,
    0
  );
  const totalSemantic = s.semanticColors.length;
  const activeSemantic = s.semanticColors.filter((c) => c.active).length;
  return { totalPalettes, activePalettes, totalShades, activeShades, totalSemantic, activeSemantic };
};