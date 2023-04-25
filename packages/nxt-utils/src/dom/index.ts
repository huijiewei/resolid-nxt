import { isObject } from '../object';
import type { Booleanish } from '../types';

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const dataAttr = (condition: boolean | null | undefined) => (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | null | undefined) => (condition ? true : undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isInputEvent = (value: any): value is { target: HTMLInputElement } => {
  return value && isObject(value) && isObject(value.target);
};

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
