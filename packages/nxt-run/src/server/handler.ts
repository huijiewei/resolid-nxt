import { createLocation, createPath } from '@remix-run/router/history';
import { type FilledContext } from 'react-helmet-async';
import { matchRoutes, redirect } from 'react-router-dom';
import { createStaticHandler } from 'react-router-dom/server';
import { isDeferredData, isRedirectStatusCode, isResponse, json } from '../base/data';
import { handleData$ } from './bling';
import { components$, type EntryContext } from './context';

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

export type HandleDataFn = (response: Response, request: Request) => Promise<Response> | Response;

// noinspection JSUnusedGlobalSymbols
export const createHandler = (handle: HandleFn, handleData: HandleDataFn | null = null) => {
  return async (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext,
    renderOptions: RenderOptions
  ) => {
    const url = new URL(request.url);
    const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

    const staticHandler = createStaticHandler(
      [
        {
          path: '',
          id: 'root',
          loader: Root.loader,
          handle: Root.handle,
          Component: Root.default,
          children: routes,
        },
      ],
      {
        basename,
      }
    );

    if (url.searchParams.has('_data')) {
      let response = await handleData$(staticHandler, request);

      if (handleData) {
        response = handleData(response, request);
      }

      if (isDeferredData(response)) {
        if (response.init && isRedirectStatusCode(response.init.status || 200)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return redirect(new Headers(response.init.headers).get('Location')!, response.init);
        }

        return response;
      }

      return isResponse(response) ? response : json(response);
    }

    const location = createLocation('', createPath(url), null, 'default');
    const matches = matchRoutes(staticHandler.dataRoutes, location, basename);

    if (matches?.find((match) => match.route.handle?.api)) {
      try {
        return await staticHandler.queryRoute(request);
      } catch (error) {
        if (isResponse(error)) {
          error.headers.set('X-Nxt-Catch', 'yes');
          return error;
        }

        return new Response('Unexpected Server Error', {
          status: 500,
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      }
    }

    let context;

    try {
      context = await staticHandler.query(request);
    } catch {
      return new Response(null, { status: 500 });
    }

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((match.route as any).headers) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const routeHeaders = (match.route as any).headers();

        for (const key in routeHeaders) {
          responseHeaders.set(key, routeHeaders[key]);
        }
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
