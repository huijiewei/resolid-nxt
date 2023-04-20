import type { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs } from '@remix-run/router';

export type DataFunction = LoaderFunction | ActionFunction;
export type DataFunctionArgs = LoaderFunctionArgs | ActionFunctionArgs;
