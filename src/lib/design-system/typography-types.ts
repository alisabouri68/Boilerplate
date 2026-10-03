export type FontFamily = {
  id: string;
  name: string;         // "وزیرمتن"
  stack: string;        // "Vazirmatn, system-ui, sans-serif"
  role: "sans" | "serif" | "mono" | "display";
  active: boolean;
  googleFont?: string;  // "Vazirmatn:wght@100..900"
  note?: string;
};

export type FontSize = {
  id: string;
  name: string;         // "base", "lg", "2xl"
  px: number;           // 16
  rem: number;          // 1
  active: boolean;
  note?: string;
};

export type FontWeight = {
  id: string;
  name: string;         // "regular", "medium", "bold"
  value: number;        // 400
  active: boolean;
};

export type LineHeight = {
  id: string;
  name: string;         // "tight", "normal", "relaxed-fa"
  value: number;        // 1.5
  active: boolean;
  note?: string;
};

export type LetterSpacing = {
  id: string;
  name: string;         // "tight", "normal", "wide"
  value: string;        // "-0.02em"
  active: boolean;
};

export type TextStyle = {
  id: string;
  name: string;               // "display", "h1", "body-md"
  fontSizeId: string;         // ارجاع به FontSize
  fontWeightId: string;       // ارجاع به FontWeight
  lineHeightId: string;       // ارجاع به LineHeight
  letterSpacingId?: string;   // ارجاع به LetterSpacing
  fontFamilyId?: string;      // ارجاع به FontFamily (اختیاری)
  active: boolean;
  note?: string;
};

export type TypographySystem = {
  id?: string;
  version: number;
  fontFamilies: FontFamily[];
  fontSizes: FontSize[];
  fontWeights: FontWeight[];
  lineHeights: LineHeight[];
  letterSpacings: LetterSpacing[];
  textStyles: TextStyle[];
  updatedAt?: string;
};