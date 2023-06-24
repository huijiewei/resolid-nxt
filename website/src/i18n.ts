import type { InitOptions } from 'i18next';

export const LOCALES = {
  en: {
    name: 'English',
    hrefLang: 'en',
  },
  'zh-CN': {
    name: '简体中文',
    hrefLang: 'zh-Hans',
  },
  'zh-TW': {
    name: '繁体中文',
    hrefLang: 'zh-Hant',
  },
};

export type LocaleKey = keyof typeof LOCALES;

export const DEFAULT_LOCALE = 'en';

export const LOCALE_PARAMS = 'hl';

export const i18n: InitOptions = {
  supportedLngs: Object.keys(LOCALES),
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: ['common', 'zod'],
  load: 'currentOnly',
};
