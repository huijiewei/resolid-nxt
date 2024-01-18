import type { Dispatch, SetStateAction } from 'react';
import { createContext } from '../../primitives';

export type ColorMode = 'system' | 'light' | 'dark';

type ColorModeStateContext = { darkMode: boolean; colorMode: ColorMode };

const [ColorModeStateProvider, useColorModeState] = createContext<ColorModeStateContext>({
  name: 'ColorModeStateContext',
  strict: true,
});

type ColorModeDispatchContext = {
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
};

const [ColorModeDispatchProvider, useColorModeDispatch] = createContext<ColorModeDispatchContext>({
  name: 'ColorModeDispatchContext',
  strict: true,
});

export { ColorModeDispatchProvider, ColorModeStateProvider, useColorModeDispatch, useColorModeState };
