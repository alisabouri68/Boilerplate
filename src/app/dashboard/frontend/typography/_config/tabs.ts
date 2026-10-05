// _config/tabs.ts
import type { ComponentType } from "react";
import FontsSection from "../_components/FontsSection";
import TypeScaleSection from "../_components/TypeScaleSection";
import FontWeightsSection from "../_components/FontWeightsSection";
import LineHeightsSection from "../_components/LineHeightsSection";
import LetterSpacingsSection from "../_components/LetterSpacingsSection";
import TextStylesSection from "../_components/TextStylesSection";
import ContrastChecker from "../_components/ContrastChecker";
import ExportImage from "../_components/ExportImage";
import PresetEditor from "../_components/PresetEditor";
import TypographyExport from "../_components/TypographyExport";

export type TabId =
  | "fonts"
  | "scale"
  | "weights"
  | "lines"
  | "tracking"
  | "styles"
  | "contrast"
  | "image"        // ← جدید
  | "presets"      // ← جدید
  | "export";

export type TabDef = {
  id: TabId;
  label: string;
  Component: ComponentType;
};

export const TABS: readonly TabDef[] = [
  { id: "fonts",    label: "فونت‌ها",           Component: FontsSection },
  { id: "scale",    label: "مقیاس سایز",        Component: TypeScaleSection },
  { id: "weights",  label: "وزن‌ها",            Component: FontWeightsSection },
  { id: "lines",    label: "ارتفاع خط",         Component: LineHeightsSection },
  { id: "tracking", label: "فاصله حروف",        Component: LetterSpacingsSection },
  { id: "styles",   label: "استایل‌های متنی",   Component: TextStylesSection },
  { id: "contrast", label: "کنتراست",           Component: ContrastChecker },
  { id: "image",    label: "خروجی تصویری",      Component: ExportImage },
  { id: "presets",  label: "Preset های من",     Component: PresetEditor },
  { id: "export",   label: "خروجی کد",          Component: TypographyExport },
] as const;

export const DEFAULT_TAB: TabId = "fonts";

const VALID = new Set<string>(TABS.map((t) => t.id));
export const isValidTab = (x: string | null): x is TabId =>
  !!x && VALID.has(x);