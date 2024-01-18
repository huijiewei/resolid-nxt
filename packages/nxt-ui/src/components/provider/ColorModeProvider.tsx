import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { useLocalStorage, useMediaQuery } from '../../hooks';
import { ColorModeDispatchProvider, ColorModeStateProvider, type ColorMode } from './ColorModeContext';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const COLOR_MODE_STORAGE_KEY = 'nxt:color-mode';

export const ColorModeProvider = ({ children }: PropsWithChildren) => {
  const darkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const [colorMode, setColorMode] = useLocalStorage<ColorMode>(COLOR_MODE_STORAGE_KEY, 'system');
  const [darkMode, setDarkMode] = useState<boolean>(darkOS);

  useEffect(() => {
    const isDark = colorMode == 'dark' || (colorMode == 'system' && darkOS);

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
