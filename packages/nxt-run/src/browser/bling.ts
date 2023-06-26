import { redirect } from '../base/data';
import type { DataFunction } from '../base/types';
import { isDeferredResponse, parseDeferredReadableStream } from './deferred';

const fetchImpl = (() => {
  throw new Error('Should be compiled away');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export type FetchMethods = {
  createFetcher(): DataFunction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCatchResponse = (response: any): boolean =>
  response instanceof Response && response.headers.get('X-Nxt-Catch') != null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isErrorResponse = (response: any): boolean =>
  response instanceof Response && response.headers.get('X-Nxt-Error') != null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRedirectResponse = (response: any): boolean =>
  response instanceof Response && response.headers.get('X-Nxt-Redirect') != null;

const fetchMethods: FetchMethods = {
  createFetcher: () => {
    return async ({ request }) => {
      try {
        const result = await fetchData(request);

        if (result instanceof Error) {
          throw result;
        }

        if (isRedirectResponse(result)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const status = parseInt(result.headers.get('X-Nxt-Status')!, 10) || 302;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const url = result.headers.get('X-Nxt-Redirect')!;
          const headers: Record<string, string> = {};
          const revalidate = result.headers.get('X-Nxt-Revalidate');

          if (revalidate) {
            headers['X-Nxt-Revalidate'] = revalidate;
          }

          throw redirect(url, { status, headers });
        }

        if (isCatchResponse(result)) {
          throw result;
        }

        if (isDeferredResponse(result) && result.body) {
          return await parseDeferredReadableStream(result.body);
        }

        return result;
      } finally {
        /* empty */
      }
    };
  },
};

export type FetchFunction = (fn: DataFunction) => Awaited<ReturnType<DataFunction>>;

// noinspection JSUnusedGlobalSymbols
export const server$: FetchFunction = Object.assign(fetchImpl, fetchMethods);

const fetchData = async (request: Request) => {
  const url = new URL(request.url);
  url.searchParams.set('_data', btoa(url.pathname));

  const init: RequestInit = { signal: request.signal };

  if (request.method !== 'GET') {
    init.method = request.method;

    const contentType = request.headers.get('Content-Type');
    init.body =
      contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)
        ? new URLSearchParams(await request.text())
        : await request.formData();
  }

  const response = await fetch(url.href, init);

  if (isErrorResponse(response)) {
    const data = await response.json();
    const error = new Error(data.message);
    error.stack = data.stack;
    return error;
  }

  return response;
};
