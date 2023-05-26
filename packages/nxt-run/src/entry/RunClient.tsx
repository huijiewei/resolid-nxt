import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom';

// @ts-expect-error Cannot find module
import * as Root from '~nxt-run/root';

// @ts-expect-error Cannot find module
import routes from '~nxt-run/routes';

// noinspection JSUnusedGlobalSymbols
export const RunClient = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        id: 'root',
        loader: Root.loader,
        element: <Root.default />,
        children: routes,
      },
    ],
    {
      basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
      future: {
        v7_normalizeFormMethod: true,
      },
    }
  );

  return (
    <HelmetProvider>
      <RouterProvider router={router} fallbackElement={null} />
    </HelmetProvider>
  );
};

// noinspection JSUnusedGlobalSymbols
export const lazyMatches = async () => {
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy);

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy?.();
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined,
        });
      })
    );
  }
};
