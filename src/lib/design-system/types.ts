export type ColorShade = {
  id: string;
  shade: string;
  token: string;
  hex: string;
  active: boolean;
  pinned?: boolean;
  note?: string;
};

export type ColorPalette = {
  id: string;
  name: string;
  category?: string;
  active: boolean;
  pinned?: boolean;
  collapsed?: boolean;
  note?: string;
  shades: ColorShade[];
};

export type SemanticColor = {
  id: string;
  name: string;
  hex: string;
  textHex: string;
  desc: string;
  active: boolean;
  note?: string;
  tokenRef?: string;
};

export type ColorsDesignSystem = {
  id?: string;
  version: number;
  palettes: ColorPalette[];
  semanticColors: SemanticColor[];
  updatedAt?: string;
};

export type SortMode = "manual" | "name-asc" | "name-desc" | "shades-desc";
export type FilterMode = "all" | "active" | "inactive" | "pinned";  