import { type UNSAFE_DeferredData as DeferredData } from '@remix-run/router';
import {
  defer as routerDefer,
  json as routerJson,
  redirect as routerRedirect,
  useActionData as routerUseActionData,
  useLoaderData as routerUseLoaderData,
  type ActionFunction,
  type LoaderFunction,
} from 'react-router-dom';

export type TypedResponse<T = unknown> = Omit<Response, 'json'> & {
  json(): Promise<T>;
};

export const useLoaderData = <T extends LoaderFunction>() => {
  return routerUseLoaderData() as Awaited<ReturnType<T>>;
};

export const useActionData = <T extends ActionFunction>() => {
  return routerUseActionData() as Awaited<ReturnType<T>> | undefined;
};

export type JsonFunction = <Data>(data: Data, init?: number | ResponseInit) => TypedResponse<Data>;

export const json: JsonFunction = (data, init = {}) => {
  return routerJson(data, init);
};

declare const typedDeferredDataBrand: unique symbol;

export type TypedDeferredData<Data extends Record<string, unknown>> = Pick<DeferredData, 'init'> & {
  data: Data;
  readonly [typedDeferredDataBrand]: 'TypedDeferredData';
};

export type DeferFunction = <Data extends Record<string, unknown>>(
  data: Data,
  init?: number | ResponseInit
) => TypedDeferredData<Data>;

export const defer: DeferFunction = (data, init = {}) => {
  return routerDefer(data, init) as unknown as TypedDeferredData<typeof data>;
};

export type RedirectFunction = (url: string, init?: number | ResponseInit) => TypedResponse<never>;

export const redirect: RedirectFunction = (url, init = 302) => {
  return routerRedirect(url, init) as TypedResponse<never>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDeferredData = (value: any): value is DeferredData => {
  const deferred: DeferredData = value;

  return (
    deferred &&
    typeof deferred === 'object' &&
    typeof deferred.data === 'object' &&
    typeof deferred.subscribe === 'function' &&
    typeof deferred.cancel === 'function' &&
    typeof deferred.resolveData === 'function'
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isResponse = (value: any): value is Response =>
  value != null &&
  typeof value.status === 'number' &&
  typeof value.statusText === 'string' &&
  typeof value.headers === 'object' &&
  typeof value.body !== 'undefined';

const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
export const isRedirectStatusCode = (statusCode: number): boolean => redirectStatusCodes.has(statusCode);
export const isRedirectResponse = (response: Response): boolean => isRedirectStatusCode(response.status);
