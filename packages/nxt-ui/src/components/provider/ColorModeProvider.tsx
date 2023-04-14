import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useLocalStorage, useMediaQuery } from '../../hooks';
import { createContext } from '../../primitives';

export type ColorMode = 'system' | 'light' | 'dark';

type ColorModeStateValue = { darkMode: boolean; colorMode: ColorMode };

const [ColorModeStateProvider, useColorModeState] = createContext<ColorModeStateValue>({
  name: 'ColorModeStateContext',
  strict: true,
});

type ColorModeDispatch = {
  setColorMode: Dispatch<SetStateAction<ColorMode>>;
};

const [ColorModeDispatchProvider, useColorModeDispatch] = createContext<ColorModeDispatch>({
  name: 'ColorModeDispatchContext',
  strict: true,
});

export { useColorModeState, useColorModeDispatch };

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const COLOR_MODE_STORAGE_KEY = 'nxt:color-mode';

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
  const darkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [colorMode, setColorMode] = useLocalStorage<ColorMode>(COLOR_MODE_STORAGE_KEY, 'system');
  const [darkMode, setDarkMode] = useState<boolean>(darkOS);

  useEffect(() => {
    const isDark = colorMode == 'dark' || darkOS;

    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode, darkOS]);

  return (
    <ColorModeDispatchProvider value={{ setColorMode }}>
      <ColorModeStateProvider value={{ darkMode, colorMode }}>{children}</ColorModeStateProvider>
    </ColorModeDispatchProvider>
  );
};
