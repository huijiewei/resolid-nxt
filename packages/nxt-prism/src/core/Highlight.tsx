import { type JSX } from 'react';
import type { Language, PrismLib } from '../lib/types';
import { type Token } from '../utils/normalizeTokens';
import { type PrismTheme, type StyleObj } from '../utils/themeToDict';
import { useGetLineProps, type LineInputProps, type LineOutputProps } from './useGetLineProps';
import { useGetTokenProps, type TokenInputProps, type TokenOutputProps } from './useGetTokenProps';
import { useThemeDict } from './useThemeDict';
import { useTokenize } from './useTokenize';

export type { PrismTheme, Language };

export type HighlightProps = {
  prism: PrismLib;
  theme: PrismTheme;
  language: Language;
  code: string;
  children: (props: {
    tokens: Token[][];
    className: string;
    style: StyleObj;
    getLineProps: (input: LineInputProps) => LineOutputProps;
    getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  }) => JSX.Element;
};

export const Highlight = ({ prism, theme, language, code, children }: HighlightProps) => {
  const themeDict = useThemeDict(language, theme);
  const getLineProps = useGetLineProps(themeDict);
  const getTokenProps = useGetTokenProps(themeDict);
  const grammar = prism.languages[language];
  const tokens = useTokenize({ prism, language, code, grammar });

  return children({
    tokens: tokens,
    className: `prism-code language-${language}`,
    style: themeDict?.root ?? {},
    getLineProps: getLineProps,
    getTokenProps: getTokenProps,
  });
};
