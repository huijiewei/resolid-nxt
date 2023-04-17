import type { Booleanish } from '../types';

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const dataAttr = (condition: boolean | null | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | null | undefined) => (condition ? true : undefined);

export const cx = (...args: (string | boolean | null | undefined)[]): string => {
  let str = '',
    i = 0,
    arg: unknown;

  for (; i < args.length; ) {
    // eslint-disable-next-line prefer-rest-params
    if ((arg = args[i++]) && typeof arg === 'string') {
      str && (str += ' ');
      str += arg;
    }
  }
  return str;
};
