import { json } from '@remix-run/router';
import { redirect } from 'react-router-dom';
import { isDeferredData, isRedirectStatusCode, isResponse } from '../base/data';
import type { DataFunction, DataFunctionArgs } from '../base/types';

const serverImpl = (() => {
  throw new Error('Should be compiled away');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;

export type ServerMethods = {
  registerHandler(pathname: string, handler: DataFunction): void;
};

const serverMethods: ServerMethods = {
  registerHandler(pathname, handler) {
    addHandler(pathname, handler);
  },
};

export type ServerFunction = ((fn: DataFunction) => Awaited<ReturnType<DataFunction>>) & ServerMethods;

// noinspection JSUnusedGlobalSymbols
export const server$: ServerFunction = Object.assign(serverImpl, serverMethods);

export const handleData$ = async (
  handler: DataFunction,
  { params, request, context }: DataFunctionArgs
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> => {
  const url = new URL(request.url);
  url.searchParams.delete('index');
  url.searchParams.delete('_data');

  const result = await handler({ params, request: new Request(url.href, request), context });

  if (isDeferredData(result)) {
    if (result.init && isRedirectStatusCode(result.init.status || 200)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return redirect(new Headers(result.init.headers).get('Location')!, result.init);
    }

    return result;
  }

  return isResponse(result) ? result : json(result);
};

const handlers = new Map<string, DataFunction>();

const addHandler = (pathname: string, handler: DataFunction) => {
  handlers.set(pathname, handler);
};

export const getHandler = (pathname: string) => {
  return handlers.get(pathname);
};
