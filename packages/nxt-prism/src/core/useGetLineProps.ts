import { useCallback } from 'react';
import { type Token } from '../utils/normalizeTokens';
import type { StyleObj, ThemeDict } from '../utils/themeToDict';

export type LineInputProps = {
  style?: StyleObj;
  className?: string;
  line: Token[];
  [key: string]: unknown;
};

export type LineOutputProps = {
  style?: StyleObj;
  className: string;
  [key: string]: unknown;
};

export const useGetLineProps = (themeDict?: ThemeDict) =>
  useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ className, style, line, ...rest }: LineInputProps) => {
      const output: LineOutputProps = {
        ...rest,
        className: ['token-line', className].join(' '),
      };

      if (typeof themeDict === 'object' && 'plain' in themeDict) {
        output.style = themeDict.plain;
      }

      if (typeof style === 'object') {
        output.style = { ...(output.style || {}), ...style };
      }

      return output;
    },
    [themeDict],
  );
