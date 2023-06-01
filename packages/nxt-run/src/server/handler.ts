import { type FilledContext } from 'react-helmet-async';
import { isRouteErrorResponse, matchRoutes, redirect } from 'react-router-dom';
import { createStaticHandler } from 'react-router-dom/server';
import { isRedirectResponse, isResponse, json } from '../base/data';
import type { DataFunctionArgs } from '../base/types';
import { getHandler, handleData$ } from './bling';
import { components$, type EntryContext, type LoadContext } from './context';

// @ts-expect-error Cannot find module
import * as Root from '~nxt-run/root';

// @ts-expect-error Cannot find module
import routes from '~nxt-run/routes';

type RenderOptions = { startHtml: string; endHtml: string };

export type HandleFn = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
  renderOptions: RenderOptions
) => Promise<Response> | Response;

export type HandleDataFn = (response: Response, args: DataFunctionArgs) => Promise<Response> | Response;

// noinspection JSUnusedGlobalSymbols
export const createHandler = (handle: HandleFn, handleData: HandleDataFn | null = null) => {
  return async (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext,
    loadContext: LoadContext,
    renderOptions: RenderOptions
  ) => {
    const url = new URL(request.url);

    const staticHandler = createStaticHandler(
      [
        {
          path: '/',
          id: 'root',
          loader: Root.loader,
          handle: Root.handle,
          Component: Root.default,
          children: routes,
        },
      ],
      {
        basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
      }
    );

    const dataName = url.searchParams.get('_data');

    if (dataName) {
      const dataHandler = getHandler(dataName);

      if (dataHandler) {
        const matches = matchRoutes(staticHandler.dataRoutes, url.pathname);

        const args = { params: matches?.[0]?.params ?? {}, request: request, context: loadContext };

        try {
          const response = await handleData$(dataHandler, args);

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

          if (handleData) {
            return handleData(response, args);
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
      }
    }

    const context = await staticHandler.query(request);

    if (context instanceof Response) {
      return context;
    }

    const responseContext: { status: number; to?: string } = {
      status: context.statusCode,
    };

    for (const match of context.matches) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (match.route as any)?.element?.props?.to == 'string') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        responseContext.to = match.pathname + (match.route as any).element.props.to;

        break;
      }

      if (match.route.path == '*') {
        responseContext.status = 404;
        break;
      }
    }

    if (responseContext.to) {
      return redirect(responseContext.to, 301);
    }

    entryContext.helmetContext = {} as FilledContext;
    entryContext.routes = staticHandler.dataRoutes;
    entryContext.staticHandlerContext = context;

    components$.clearComponents();

    return handle(request, responseContext.status, responseHeaders, entryContext, renderOptions);
  };
};
