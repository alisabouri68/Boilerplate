// lib/typography/typography-types.ts

export type FontRole = "sans" | "serif" | "mono" | "display";

export type FontFamily = {
  id: string;
  name: string;
  stack: string;
  role: FontRole;
  active: boolean;
  googleFont?: string;
  note?: string;
};

export type FontSize = {
  id: string;
  name: string;
  px: number;
  rem: number;
  active: boolean;
  note?: string;
};

export type FontWeight = {
  id: string;
  name: string;
  value: number;
  active: boolean;
};

export type LineHeight = {
  id: string;
  name: string;
  value: number;
  active: boolean;
  note?: string;
};

export type LetterSpacing = {
  id: string;
  name: string;
  value: string;
  active: boolean;
};

export type TextStyle = {
  id: string;
  name: string;
  fontSizeId: string;
  fontWeightId: string;
  lineHeightId: string;
  letterSpacingId?: string;
  fontFamilyId?: string;
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

export type ResolvedTextStyle = {
  id: string;
  name: string;
  fontSize: number;
  fontSizeRem: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
  fontFamily?: string;
  note?: string;
};