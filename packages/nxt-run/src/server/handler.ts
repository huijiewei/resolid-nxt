import { type FilledContext } from 'react-helmet-async';
import { matchRoutes, redirect } from 'react-router-dom';
import { createStaticHandler } from 'react-router-dom/server';
import { getHandler, handleData$ } from './bling';
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

export const createHandler = (handle: HandleFn) => {
  return async (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext,
    renderOptions: RenderOptions
  ) => {
    const url = new URL(request.url);

    const staticHandler = createStaticHandler(
      [
        {
          path: '/',
          id: 'root',
          loader: Root.loader,
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

        return handleData$(dataHandler, { params: matches?.[0]?.params ?? {}, request: request });
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
