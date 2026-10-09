/* =====================================================================
   Tailwind Font Sizes
   ===================================================================== */

export interface FontSizePreset {
  key: string;
  name: string;
  value: string;
  lineHeight?: string;
  letterSpacing?: string;
  order: number;
}

export const TAILWIND_FONT_SIZES: FontSizePreset[] = [
  { key: "xs",   name: "Extra Small",  value: "0.75rem",  lineHeight: "1rem",    order: 1 },
  { key: "sm",   name: "Small",        value: "0.875rem", lineHeight: "1.25rem", order: 2 },
  { key: "base", name: "Base",         value: "1rem",     lineHeight: "1.5rem",  order: 3 },
  { key: "lg",   name: "Large",        value: "1.125rem", lineHeight: "1.75rem", order: 4 },
  { key: "xl",   name: "Extra Large",  value: "1.25rem",  lineHeight: "1.75rem", order: 5 },
  { key: "2xl",  name: "2XL",          value: "1.5rem",   lineHeight: "2rem",    order: 6 },
  { key: "3xl",  name: "3XL",          value: "1.875rem", lineHeight: "2.25rem", order: 7 },
  { key: "4xl",  name: "4XL",          value: "2.25rem",  lineHeight: "2.5rem",  order: 8 },
  { key: "5xl",  name: "5XL",          value: "3rem",     lineHeight: "1",       order: 9 },
  { key: "6xl",  name: "6XL",          value: "3.75rem",  lineHeight: "1",       order: 10 },
  { key: "7xl",  name: "7XL",          value: "4.5rem",   lineHeight: "1",       order: 11 },
  { key: "8xl",  name: "8XL",          value: "6rem",     lineHeight: "1",       order: 12 },
  { key: "9xl",  name: "9XL",          value: "8rem",     lineHeight: "1",       order: 13 },
];

/* =====================================================================
   Standard Font Weights
   ===================================================================== */

export interface FontWeightPreset {
  key: string;
  name: string;
  value: number;
  order: number;
}

export const STANDARD_FONT_WEIGHTS: FontWeightPreset[] = [
  { key: "thin",       name: "Thin",        value: 100, order: 1 },
  { key: "extralight", name: "Extra Light", value: 200, order: 2 },
  { key: "light",      name: "Light",       value: 300, order: 3 },
  { key: "normal",     name: "Normal",      value: 400, order: 4 },
  { key: "medium",     name: "Medium",      value: 500, order: 5 },
  { key: "semibold",   name: "Semi Bold",   value: 600, order: 6 },
  { key: "bold",       name: "Bold",        value: 700, order: 7 },
  { key: "extrabold",  name: "Extra Bold",  value: 800, order: 8 },
  { key: "black",      name: "Black",       value: 900, order: 9 },
];