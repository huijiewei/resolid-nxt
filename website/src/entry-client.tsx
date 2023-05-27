import { RunClient, lazyMatches } from '@resolid/nxt-run';
import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { matchRoutes } from 'react-router-dom';
import routes from '~/routes';

if (import.meta.env.DEV) {
  console.log(`import.meta.env.DEV = ${import.meta.env.DEV}`);
  console.log(`import.meta.env.PROD = ${import.meta.env.PROD}`);
  console.log(`import.meta.env.SSR = ${import.meta.env.SSR}`);
}

async function hydrate() {
  const matches = matchRoutes(routes, window.location);

  await lazyMatches(matches);

  startTransition(() => {
    hydrateRoot(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById('app')!,
      <StrictMode>
        <RunClient />
      </StrictMode>
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
