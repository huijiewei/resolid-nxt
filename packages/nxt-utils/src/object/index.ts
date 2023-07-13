import type { Dict } from '../types';

export const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === 'object';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyObject = (value: any): boolean => {
  return Object.keys(value).length === 0;
};

export const omit = <T extends Dict, K extends keyof T>(object: T, keys: K[]) => {
  return keys.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...object },
  ) as Omit<T, K>;
};
