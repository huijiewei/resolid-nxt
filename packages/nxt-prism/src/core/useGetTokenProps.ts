import { useCallback, type CSSProperties } from 'react';
import type { ThemeDict } from '../utils/themeToDict';
import { type StyleObj } from '../utils/themeToDict';

export type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

export type TokenInputProps = {
  style?: StyleObj;
  className?: string;
  token: Token;
  [key: string]: unknown;
};

export type TokenOutputProps = {
  style?: StyleObj;
  className: string;
  children: string;
  [key: string]: unknown;
};

export const useGetTokenProps = (themeDict?: ThemeDict) => {
  const styleForToken = useCallback(
    ({ types, empty }: Token) => {
      if (themeDict == null) {
        return undefined;
      } else if (types.length === 1 && types[0] === 'plain') {
        return empty != null ? { display: 'inline-block' } : undefined;
      } else if (types.length === 1 && empty != null) {
        return themeDict[types[0]];
      }

      return Object.assign(
        empty != null ? { display: 'inline-block' } : {},
        ...types.map((type) => themeDict[type]),
      ) satisfies CSSProperties;
    },
    [themeDict],
  );

  return useCallback(
    ({ token, className, style, ...rest }: TokenInputProps) => {
      const output: TokenOutputProps = {
        ...rest,
        className: ['token', ...token.types, className].join(' '),
        children: token.content,
        style: styleForToken(token),
      };

      if (style != null) {
        output.style = {
          ...(output.style || {}),
          ...style,
        };
      }

      return output;
    },
    [styleForToken],
  );
};
