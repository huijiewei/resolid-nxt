import { json } from '@remix-run/router';
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

export const server$: ServerFunction = Object.assign(serverImpl, serverMethods);

export const handleData$ = async (handler: DataFunction, { params, request }: DataFunctionArgs) => {
  const url = new URL(request.url);
  url.searchParams.delete('index');
  url.searchParams.delete('_data');

  const data = await handler({ params, request: new Request(url.href, request) });

  if (data instanceof Response) {
    return data;
  }

  return json(data, 200);
};

const handlers = new Map<string, DataFunction>();

const addHandler = (pathname: string, handler: DataFunction) => {
  handlers.set(pathname, handler);
};

export const getHandler = (pathname: string) => {
  return handlers.get(pathname);
};
