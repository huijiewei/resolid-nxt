import { hydrate } from '@resolid/nxt-run';

if (import.meta.env.DEV) {
  console.log(`import.meta.env.DEV = ${import.meta.env.DEV}`);
  console.log(`import.meta.env.PROD = ${import.meta.env.PROD}`);
  console.log(`import.meta.env.SSR = ${import.meta.env.SSR}`);
}

const hydrateApp = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await hydrate(document.getElementById('app')!);
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrateApp);
} else {
  window.setTimeout(hydrateApp, 1);
}
