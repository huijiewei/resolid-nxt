import { isObject } from '@resolid/nxt-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenColorPalette = (colors: Record<string, any>): Record<string, string> =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      isObject(values)
        ? Object.entries(flattenColorPalette(values)).map(([name, value]) => ({
            [color + (name === 'DEFAULT' ? '' : `-${name}`)]: value,
          }))
        : [{ [color]: values }],
    ),
  );
