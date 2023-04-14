import type { CSSProperties } from 'react';
import type { Language } from '../lib/types';

export type StyleObj = CSSProperties;

export type ThemeDict = {
  root: StyleObj;
  plain: StyleObj;
  [type: string]: StyleObj;
};

export type PrismTheme = {
  plain: PrismThemeEntry;
  styles: Array<{
    types: string[];
    style: PrismThemeEntry;
    languages?: Language[];
  }>;
};

type PrismThemeEntry = {
  color?: string;
  backgroundColor?: string;
  fontStyle?: 'normal' | 'italic';
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  opacity?: number;
  [styleKey: string]: string | number | undefined;
};

export const themeToDict = (theme: PrismTheme, language: Language): ThemeDict => {
  const { plain } = theme;

  const base: ThemeDict = Object.create(null);

  const themeDict = theme.styles.reduce((acc, themeEntry) => {
    const { types, languages, style } = themeEntry;

    if (languages && !languages.includes(language)) {
      return acc;
    }

    types.forEach((type) => {
      acc[type] = { ...acc[type], ...style };
    });

    return acc;
  }, base);

  themeDict.root = plain;
  themeDict.plain = { ...plain, backgroundColor: undefined };

  return themeDict;
};
