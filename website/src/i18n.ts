import type { InitOptions } from 'i18next';

export const LOCALES = {
  en: 'English',
  'zh-CN': '简体中文',
};

export const i18n: InitOptions = {
  supportedLngs: Object.keys(LOCALES),
  fallbackLng: 'en',
  defaultNS: ['common', 'zod'],
  load: 'currentOnly',
};
