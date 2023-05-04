import type { BorderRadius } from '@resolid/nxt-tailwind';
import { isBoolean, isNumber } from '@resolid/nxt-utils';

export type Radius = boolean | number | BorderRadius;

const radiusStyles = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const toRounded = (radius: Radius): { value: string | undefined; style: string | undefined } => {
  if (isBoolean(radius)) {
    return {
      value: undefined,
      style: radius ? 'rounded' : undefined,
    };
  }

  if (isNumber(radius)) {
    const valid = radius > 0;

    return {
      value: valid ? `${radius}px` : undefined,
      style: valid ? 'rounded-[--rounded-var]' : undefined,
    };
  }

  return {
    value: undefined,
    style: radiusStyles[radius as BorderRadius],
  };
};
