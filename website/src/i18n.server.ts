import { createInstance } from 'i18next';
import FsBackend from 'i18next-fs-backend/cjs';
import { resolve } from 'node:path';
import { initReactI18next } from 'react-i18next';
import { i18n } from '~/i18n';

export const getInstance = async (lng: string, ns: string[]) => {
  const instance = createInstance();

  await instance
    .use(FsBackend)
    .use(initReactI18next)
    .init({
      ...i18n,
      lng,
      ns: ['common', ...ns],
      debug: false,
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    });

  return instance;
};

export const getFixedT = async (lng: string, ns?: string) => {
  const instance = await getInstance(lng, ns ? [ns] : []);

  return instance.getFixedT(lng, ns);
};
