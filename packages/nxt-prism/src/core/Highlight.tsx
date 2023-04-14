import { useCallback, useMemo, type ReactNode } from 'react';
import type { Language, PrismGrammar, PrismLib, PrismToken } from '../lib/types';
import { normalizeTokens, type Token } from '../utils/normalizeTokens';
import { themeToDict, type PrismTheme, type StyleObj } from '../utils/themeToDict';

export type { PrismTheme, Language };

type LineInputProps = {
  style?: StyleObj;
  className?: string;
  line: Token[];
  [key: string]: unknown;
};

type LineOutputProps = {
  style?: StyleObj;
  className: string;
  [key: string]: unknown;
};

type TokenInputProps = {
  style?: StyleObj;
  className?: string;
  token: Token;
  [key: string]: unknown;
};

type TokenOutputProps = {
  style?: StyleObj;
  className: string;
  children: string;
  [key: string]: unknown;
};

export type HighlightProps = {
  Prism: PrismLib;
  theme?: PrismTheme;
  language: Language;
  code: string;
  children: (props: {
    tokens: Token[][];
    className: string;
    style: StyleObj;
    getLineProps: (input: LineInputProps) => LineOutputProps;
    getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  }) => ReactNode;
};

const prismTokenize = (Prism: PrismLib, code: string, grammar: PrismGrammar, language: Language) => {
  const env = {
    code,
    grammar,
    language,
    tokens: [] as (PrismToken | string)[],
  };

  Prism.hooks.run('before-tokenize', env);
  const tokens = (env.tokens = Prism.tokenize(env.code, env.grammar));
  Prism.hooks.run('after-tokenize', env);

  return tokens;
};

export const Highlight = ({ Prism, theme, language, code, children }: HighlightProps) => {
  const themeDict = useMemo(() => {
    return theme ? themeToDict(theme, language) : undefined;
  }, [theme, language]);

  const getLineProps = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ className, style, line, ...rest }: LineInputProps): LineOutputProps => {
      const output: LineOutputProps = {
        ...rest,
        className: 'token-line',
        style: undefined,
      };

      if (themeDict !== undefined) {
        output.style = themeDict.plain;
      }

      if (style !== undefined) {
        output.style = output.style !== undefined ? { ...output.style, ...style } : style;
      }

      if (className) {
        output.className += ` ${className}`;
      }

      return output;
    },
    [themeDict]
  );

  const getStyleForToken = useCallback(
    ({ types, empty }: Token) => {
      const typesSize = types.length;

      if (themeDict === undefined) {
        return undefined;
      } else if (typesSize === 1 && types[0] === 'plain') {
        return empty ? { display: 'inline-block' } : undefined;
      } else if (typesSize === 1 && !empty) {
        return themeDict[types[0]];
      }

      const baseStyle = empty ? { display: 'inline-block' } : {};
      const typeStyles = types.map((type) => themeDict[type]);
      return Object.assign(baseStyle, ...typeStyles);
    },
    [themeDict]
  );

  const getTokenProps = ({ className, style, token, ...rest }: TokenInputProps): TokenOutputProps => {
    const output: TokenOutputProps = {
      ...rest,
      className: `token ${token.types.join(' ')}`,
      children: token.content,
      style: getStyleForToken(token),
    };

    if (style !== undefined) {
      output.style = output.style !== undefined ? { ...output.style, ...style } : style;
    }

    if (className) {
      output.className += ` ${className}`;
    }

    return output;
  };

  const tokens = useMemo(() => {
    const grammar = Prism.languages[language];
    const mixedTokens = grammar !== undefined ? prismTokenize(Prism, code, grammar, language) : [code];

    return normalizeTokens(mixedTokens);
  }, [language, Prism, code]);

  return (
    <>
      {children({
        tokens: tokens,
        className: `prism-code language-${language}`,
        style: themeDict?.root ?? {},
        getLineProps: getLineProps,
        getTokenProps: getTokenProps,
      })}
    </>
  );
};
