import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RunContext } from '../components/RunContext';
import { HelmetProvider } from 'react-helmet-async';

// @ts-expect-error Cannot find module
import Root from '~nxt-run/root';

// @ts-expect-error Cannot find module
import routes from '~nxt-run/routes';

// noinspection JSUnusedGlobalSymbols
const RunClient = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Root />,
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
    <RunContext.Provider value={{ routes: [], staticHandlerContext: null }}>
      <HelmetProvider>
        <RouterProvider router={router} fallbackElement={null} />
      </HelmetProvider>
    </RunContext.Provider>
  );
};

export const hydrate = async (root: HTMLElement) => {
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

  hydrateRoot(
    root,
    <StrictMode>
      <RunClient />
    </StrictMode>
  );
};