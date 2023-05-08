import { useEffect, useRef, useState } from 'react';
import type { Language } from '../lib/types';
import type { PrismTheme, ThemeDict } from '../utils/themeToDict';
import { themeToDict } from '../utils/themeToDict';

export const useThemeDict = (language: Language, theme: PrismTheme) => {
  const [themeDict, setThemeDict] = useState<ThemeDict>(themeToDict(theme, language));
  const previousTheme = useRef<PrismTheme>();
  const previousLanguage = useRef<Language>();

  useEffect(() => {
    if (theme !== previousTheme.current || language !== previousLanguage.current) {
      previousTheme.current = theme;
      previousLanguage.current = language;
      setThemeDict(themeToDict(theme, language));
    }
  }, [language, theme]);

  return themeDict;
};
