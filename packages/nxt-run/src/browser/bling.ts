import type { DataFunction } from '../base/types';

const fetchImpl = (() => {
  throw new Error('Should be compiled away');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export type FetchMethods = {
  createFetcher(route: string): DataFunction;
};

const fetchMethods: FetchMethods = {
  createFetcher: (pathname: string) => {
    return async ({ request }) => {
      const url = new URL(request.url);
      url.searchParams.set('_data', pathname);

      const init: RequestInit = { signal: request.signal };

      if (request.method !== 'GET') {
        init.method = request.method;

        const contentType = request.headers.get('Content-Type');
        init.body =
          contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)
            ? new URLSearchParams(await request.text())
            : await request.formData();
      }

      return await fetch(url.href, init);
    };
  },
};

export type FetchFunction = (fn: DataFunction) => Awaited<ReturnType<DataFunction>>;

export const server$: FetchFunction = Object.assign(fetchImpl, fetchMethods);
