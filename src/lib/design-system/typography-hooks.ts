"use client";

import { useShallow } from "zustand/react/shallow";
import { useTypographyStore } from "./typography-store";

export const useTypography = () =>
  useTypographyStore(
    useShallow((s) => ({
      id: s.id,
      version: s.version,
      updatedAt: s.updatedAt,
      fontFamilies: s.fontFamilies,
      fontSizes: s.fontSizes,
      fontWeights: s.fontWeights,
      lineHeights: s.lineHeights,
      letterSpacings: s.letterSpacings,
      textStyles: s.textStyles,
      dirty: s.dirty,
    }))
  );

export const useTypographyActions = () =>
  useTypographyStore(
    useShallow((s) => ({
      addFontFamily: s.addFontFamily,
      updateFontFamily: s.updateFontFamily,
      removeFontFamily: s.removeFontFamily,
      toggleFontFamily: s.toggleFontFamily,

      addFontSize: s.addFontSize,
      updateFontSize: s.updateFontSize,
      removeFontSize: s.removeFontSize,
      toggleFontSize: s.toggleFontSize,

      addFontWeight: s.addFontWeight,
      updateFontWeight: s.updateFontWeight,
      removeFontWeight: s.removeFontWeight,

      addLineHeight: s.addLineHeight,
      updateLineHeight: s.updateLineHeight,
      removeLineHeight: s.removeLineHeight,

      addLetterSpacing: s.addLetterSpacing,
      updateLetterSpacing: s.updateLetterSpacing,
      removeLetterSpacing: s.removeLetterSpacing,

      addTextStyle: s.addTextStyle,
      updateTextStyle: s.updateTextStyle,
      removeTextStyle: s.removeTextStyle,
      duplicateTextStyle: s.duplicateTextStyle,
      toggleTextStyle: s.toggleTextStyle,

      reset: s.reset,
      importSystem: s.importSystem,
      exportSystem: s.exportSystem,
    }))
  );