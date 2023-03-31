export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const clamp = (value: number, [min, max]: [number, number]): number => {
  return Math.min(max, Math.max(min, value));
};
