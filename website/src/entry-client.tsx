import { RunClient, lazyMatches } from '@resolid/nxt-run';
import { __DEV__ } from '@resolid/nxt-utils';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend/cjs';
import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { matchRoutes } from 'react-router-dom';
import { i18n } from '~/i18n';
import routes from '~/routes';

if (import.meta.env.DEV) {
  console.log(`import.meta.env.DEV = ${import.meta.env.DEV}`);
  console.log(`import.meta.env.PROD = ${import.meta.env.PROD}`);
  console.log(`import.meta.env.SSR = ${import.meta.env.SSR}`);
}

async function hydrate() {
  const matches = matchRoutes(routes, window.location);
  const ns = matches?.filter((m) => m.route.handle?.i18n !== undefined).flatMap((m) => m.route.handle.i18n);

  await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...i18n,
      ns: ['common', ...(ns || [])],
      debug: __DEV__,

      detection: {
        order: ['path'],
      },
      interpolation: {
        escapeValue: false,
      },
    });

  await lazyMatches(matches);

  startTransition(() => {
    hydrateRoot(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById('app')!,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RunClient />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
