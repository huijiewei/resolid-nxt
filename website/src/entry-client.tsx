import { bootstrap } from '@resolid/nxt-run';

if (import.meta.env.DEV) {
  console.log(`import.meta.env.DEV = ${import.meta.env.DEV}`);
  console.log(`import.meta.env.PROD = ${import.meta.env.PROD}`);
  console.log(`import.meta.env.SSR = ${import.meta.env.SSR}`);
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
bootstrap(document.getElementById('app')!);
