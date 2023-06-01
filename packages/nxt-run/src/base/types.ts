import type { LoaderFunctionArgs } from '@remix-run/router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppData = any;

export type DataFunctionArgs = LoaderFunctionArgs;

export type DataFunction = {
  (args: DataFunctionArgs): Promise<Response> | Response | Promise<AppData> | AppData;
};
