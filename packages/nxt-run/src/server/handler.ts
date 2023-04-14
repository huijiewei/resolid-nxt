import { type FilledContext } from 'react-helmet-async';
import { createStaticHandler } from 'react-router-dom/server';
import { type EntryContext } from './context';

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
    const { query, dataRoutes } = createStaticHandler(
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

    entryContext.helmetContext = {} as FilledContext;
    entryContext.routes = dataRoutes;
    entryContext.staticHandlerContext = await query(request);

    return handle(request, responseStatusCode, responseHeaders, entryContext, renderOptions);
  };
};
