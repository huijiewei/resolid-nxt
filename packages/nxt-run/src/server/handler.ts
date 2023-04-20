import { type FilledContext } from 'react-helmet-async';
import { matchRoutes } from 'react-router-dom';
import { createStaticHandler } from 'react-router-dom/server';
import { getHandler, handleData$ } from './bling';
import { components$, type EntryContext } from './context';

// @ts-expect-error Cannot find module
import Root from '~nxt-run/root';

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

    const dataName = url.searchParams.get('_data');

    if (dataName) {
      const dataHandler = getHandler(dataName);

      if (dataHandler) {
        const matches = matchRoutes(routes, url.pathname);

        return handleData$(dataHandler, { params: matches?.[0]?.params ?? {}, request: request });
      }
    }

    const staticHandler = createStaticHandler(
      [
        {
          path: '/',
          Component: Root,
          children: routes,
        },
      ],
      {
        basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
      }
    );

    const context = await staticHandler.query(request);

    if (context instanceof Response) {
      throw context;
    }

    entryContext.helmetContext = {} as FilledContext;
    entryContext.routes = staticHandler.dataRoutes;
    entryContext.staticHandlerContext = context;

    components$.clearComponents();

    return handle(request, context.statusCode, responseHeaders, entryContext, renderOptions);
  };
};
