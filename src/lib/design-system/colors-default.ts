import type { ColorsDesignSystem } from "./types";
import { uid } from "./colors-utils";

const mk = (shade: string, token: string, hex: string) => ({
  id: uid(),
  shade,
  token,
  hex,
  active: true,
});

export const defaultColors: ColorsDesignSystem = {
  version: 1,
  palettes: [
    {
      id: uid(),
      name: "Blue",
      category: "Primary",
      active: true,
      shades: [
        mk("50", "blue-50", "#eff6ff"),
        mk("100", "blue-100", "#dbeafe"),
        mk("200", "blue-200", "#bfdbfe"),
        mk("300", "blue-300", "#93c5fd"),
        mk("400", "blue-400", "#60a5fa"),
        mk("500", "blue-500", "#3b82f6"),
        mk("600", "blue-600", "#2563eb"),
        mk("700", "blue-700", "#1d4ed8"),
        mk("800", "blue-800", "#1e40af"),
        mk("900", "blue-900", "#1e3a8a"),
      ],
    },
    {
      id: uid(),
      name: "Emerald",
      category: "Success",
      active: true,
      shades: [
        mk("50", "emerald-50", "#ecfdf5"),
        mk("100", "emerald-100", "#d1fae5"),
        mk("300", "emerald-300", "#6ee7b7"),
        mk("500", "emerald-500", "#10b981"),
        mk("600", "emerald-600", "#059669"),
        mk("700", "emerald-700", "#047857"),
      ],
    },
    {
      id: uid(),
      name: "Amber",
      category: "Warning",
      active: true,
      shades: [
        mk("50", "amber-50", "#fffbeb"),
        mk("100", "amber-100", "#fef3c7"),
        mk("300", "amber-300", "#fcd34d"),
        mk("500", "amber-500", "#f59e0b"),
        mk("600", "amber-600", "#d97706"),
        mk("700", "amber-700", "#b45309"),
      ],
    },
    {
      id: uid(),
      name: "Red",
      category: "Danger",
      active: true,
      shades: [
        mk("50", "red-50", "#fef2f2"),
        mk("100", "red-100", "#fee2e2"),
        mk("300", "red-300", "#fca5a5"),
        mk("500", "red-500", "#ef4444"),
        mk("600", "red-600", "#dc2626"),
        mk("700", "red-700", "#b91c1c"),
      ],
    },
    {
      id: uid(),
      name: "Gray",
      category: "Neutral",
      active: true,
      shades: [
        mk("50", "gray-50", "#f9fafb"),
        mk("100", "gray-100", "#f3f4f6"),
        mk("200", "gray-200", "#e5e7eb"),
        mk("300", "gray-300", "#d1d5db"),
        mk("400", "gray-400", "#9ca3af"),
        mk("500", "gray-500", "#6b7280"),
        mk("600", "gray-600", "#4b5563"),
        mk("700", "gray-700", "#374151"),
        mk("800", "gray-800", "#1f2937"),
        mk("900", "gray-900", "#111827"),
      ],
    },
  ],
  semanticColors: [
    { id: uid(), name: "Primary", hex: "#2563eb", textHex: "#ffffff", desc: "اقدام اصلی", active: true },
    { id: uid(), name: "Success", hex: "#059669", textHex: "#ffffff", desc: "موفقیت", active: true },
    { id: uid(), name: "Warning", hex: "#f59e0b", textHex: "#ffffff", desc: "هشدار", active: true },
    { id: uid(), name: "Danger",  hex: "#dc2626", textHex: "#ffffff", desc: "خطا",   active: true },
    { id: uid(), name: "Info",    hex: "#0891b2", textHex: "#ffffff", desc: "اطلاع", active: true },
    { id: uid(), name: "Neutral", hex: "#4b5563", textHex: "#ffffff", desc: "خنثی",  active: true },
  ],
};