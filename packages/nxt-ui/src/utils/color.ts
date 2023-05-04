import { hexToRGB } from '@resolid/nxt-utils';

export const randomColor = (str: string) => {
  let hash = 0;

  if (str.length === 0) {
    return hash.toString();
  }

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';

  for (let j = 0; j < 3; j += 1) {
    const value = (hash >> (j * 8)) & 255;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const isDarkColor = (hex: string) => {
  const rgb = hexToRGB(hex);

  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 < 128;
};
