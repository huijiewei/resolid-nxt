import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { scrollbar } from './plugins/scrollbar';
import { borderRadius } from './tokens/border-radius';
import { colorsPalette } from './tokens/colors-palette';
import { colorsSemantic } from './tokens/colors-semantic';
import { fontFamily } from './tokens/font-family';
import { fontSize } from './tokens/font-size';
import { fontWidth } from './tokens/font-width';
import { screens } from './tokens/screens';
import { flattenColorPalette, hexToRGB } from './utils';

export * from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MaybeNested<K extends keyof any = string, V = string> = {
  [key: string]: V | MaybeNested<K, V>;
};

type DefaultThemeType = 'light' | 'dark';
type ConfigObject = Record<string, MaybeNested>;

export type Preset = (config: {
  themes?: ConfigObject;
  defaultTheme?: DefaultThemeType;
  cssVarPrefix?: string;
}) => Partial<Config>;

const resolveConfig = (config: ConfigObject, defaultTheme: DefaultThemeType, cssVarPrefix: string) => {
  const resolved: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    utilities: Record<string, Record<string, any>>;
    colors: Record<string, string>;
  } = {
    utilities: {},
    colors: {},
  };

  Object.keys(config).forEach((themeName) => {
    let cssSelector = `.${themeName}, [data-theme="${themeName}"]`;

    if (themeName === defaultTheme) {
      cssSelector = `:root, ${cssSelector}`;
    }

    resolved.utilities[cssSelector] = {};

    const flatColors = flattenColorPalette(config[themeName]);

    Object.keys(flatColors).forEach((colorName) => {
      const colorValue = flatColors[colorName];

      if (!colorValue) {
        return;
      }

      const rgb = hexToRGB(colorValue);

      const colorVariable = `--${cssVarPrefix}-${colorName}`;

      resolved.utilities[cssSelector][colorVariable] = `${rgb.r} ${rgb.g} ${rgb.b}`;

      resolved.colors[colorName] = `rgb(var(${colorVariable}) / <alpha-value>)`;
    });
  });

  return resolved;
};

const preset: Preset = (config = {}) => {
  const cssVarPrefix = config.cssVarPrefix || 're';

  const resolved = resolveConfig(
    {
      light: colorsSemantic.light,
      dark: colorsSemantic.dark,
    },
    config.defaultTheme || 'light',
    config.cssVarPrefix || 're'
  );

  return {
    darkMode: 'class',
    theme: {
      screens: screens,
      fontFamily: fontFamily,
      fontSize: fontSize,
      colors: { ...colorsPalette, ...resolved.colors },
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: `rgb(var(--${cssVarPrefix}-border-default))`,
      }),
      borderRadius: borderRadius,
      fontWeight: fontWidth,
    },
    plugins: [
      plugin(({ addBase, addUtilities, addVariant, theme }) => {
        addBase({
          body: {
            color: `rgb(var(--${cssVarPrefix}-fg-default))`,
            backgroundColor: `rgb(var(--${cssVarPrefix}-bg-default))`,
            fontSize: theme('fontSize.base'),
            lineHeight: theme('fontSize.base[1]', 'lineHeight.normal'),
          },
        });
        addUtilities(resolved.utilities);
        addVariant('active', ['&[data-active]', '&:active']);
        addVariant('opened', '&[data-opened]');
      }),
      scrollbar(cssVarPrefix),
    ],
  };
};

export default preset;
