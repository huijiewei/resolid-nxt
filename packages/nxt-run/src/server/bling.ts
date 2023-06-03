import {
  UNSAFE_DEFERRED_SYMBOL as DEFERRED_SYMBOL,
  type UNSAFE_DeferredData as DeferredData,
  type StaticHandler,
} from '@remix-run/router';
import { isRouteErrorResponse } from 'react-router-dom';
import { isRedirectResponse, isResponse, json } from '../base/data';
import type { DataFunction } from '../base/types';
import { createDeferredReadableStream } from './deferred';

const serverImpl = (() => {
  throw new Error('Should be compiled away');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export type ServerFunction = (fn: DataFunction) => Awaited<ReturnType<DataFunction>>;

// noinspection JSUnusedGlobalSymbols
export const server$: ServerFunction = serverImpl;

export const handleData$ = async (staticHandler: StaticHandler, request: Request, routeId?: string) => {
  try {
    const response = await staticHandler.queryRoute(request, {
      routeId: routeId,
    });

    if (isRedirectResponse(response)) {
      const headers = new Headers(response.headers);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      headers.set('X-Nxt-Redirect', headers.get('Location')!);
      headers.set('X-Nxt-Status', response.status);
      headers.delete('Location');

      if (response.headers.get('Set-Cookie') !== null) {
        headers.set('X-Nxt-Revalidate', 'yes');
      }

      return new Response(null, {
        status: 204,
        headers,
      });
    }

    if (DEFERRED_SYMBOL in response) {
      const deferredData = response[DEFERRED_SYMBOL] as DeferredData;
      const body = createDeferredReadableStream(deferredData, request.signal);
      const init = deferredData.init || {};
      const headers = new Headers(init.headers);

      headers.set('Content-Type', 'text/nxt-deferred');
      init.headers = headers;

      return new Response(body, init);
    }

    return response;
  } catch (error: unknown) {
    if (isResponse(error)) {
      error.headers.set('X-Nxt-Catch', 'yes');

      return error;
    }

    const status = isRouteErrorResponse(error) ? error.status : 500;

    const errorInstance =
      isRouteErrorResponse(error) && error.error
        ? error.error
        : error instanceof Error
        ? error
        : new Error('Unexpected Server Error');

    return json(errorInstance, {
      status,
      headers: {
        'X-Nxt-Error': 'yes',
      },
    });
  }
};
