import { colorsPalette } from './colors-palette';

export const colorsSemanticLight = {
  fg: {
    default: colorsPalette.black,
    emphasized: colorsPalette.white,
    muted: colorsPalette.gray[600],
    subtle: colorsPalette.gray[500],

    primary: {
      DEFAULT: colorsPalette.blue[500],
      hovered: colorsPalette.blue[600],
      pressed: colorsPalette.blue[700],
    },
    success: {
      DEFAULT: colorsPalette.green[500],
      hovered: colorsPalette.green[600],
      pressed: colorsPalette.green[700],
    },
    warning: {
      DEFAULT: colorsPalette.yellow[500],
      hovered: colorsPalette.yellow[600],
      pressed: colorsPalette.yellow[700],
    },
    danger: {
      DEFAULT: colorsPalette.red[500],
      hovered: colorsPalette.red[600],
      pressed: colorsPalette.red[700],
    },
  },
  bg: {
    default: colorsPalette.white,
    emphasized: colorsPalette.gray[900],
    muted: colorsPalette.gray[200],
    subtle: colorsPalette.gray[100],
    subtlest: colorsPalette.gray[50],

    primary: {
      DEFAULT: colorsPalette.blue[50],
      hovered: colorsPalette.blue[100],
      pressed: colorsPalette.blue[200],
      emphasis: {
        DEFAULT: colorsPalette.blue[500],
        hovered: colorsPalette.blue[600],
        pressed: colorsPalette.blue[700],
      },
    },

    neutral: {
      DEFAULT: colorsPalette.gray[50],
      hovered: colorsPalette.gray[100],
      pressed: colorsPalette.gray[200],
      emphasis: {
        DEFAULT: colorsPalette.gray[500],
        hovered: colorsPalette.gray[600],
        pressed: colorsPalette.gray[700],
      },
    },

    success: {
      DEFAULT: colorsPalette.green[50],
      hovered: colorsPalette.green[100],
      pressed: colorsPalette.green[200],
      emphasis: {
        DEFAULT: colorsPalette.green[500],
        hovered: colorsPalette.green[600],
        pressed: colorsPalette.green[700],
      },
    },

    warning: {
      DEFAULT: colorsPalette.yellow[50],
      hovered: colorsPalette.yellow[100],
      pressed: colorsPalette.yellow[200],
      emphasis: {
        DEFAULT: colorsPalette.yellow[500],
        hovered: colorsPalette.yellow[600],
        pressed: colorsPalette.yellow[700],
      },
    },

    danger: {
      DEFAULT: colorsPalette.red[50],
      hovered: colorsPalette.red[100],
      pressed: colorsPalette.red[200],
      emphasis: {
        DEFAULT: colorsPalette.red[500],
        hovered: colorsPalette.red[600],
        pressed: colorsPalette.red[700],
      },
    },
  },
  border: {
    default: colorsPalette.gray[200],
    hovered: colorsPalette.gray[300],
    invalid: colorsPalette.red[500],
  },
  link: {
    DEFAULT: colorsPalette.blue[500],
    hovered: colorsPalette.blue[600],
    pressed: colorsPalette.blue[700],
  },
};
