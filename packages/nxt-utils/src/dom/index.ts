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
