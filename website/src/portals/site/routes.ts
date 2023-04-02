import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import uiSiteRoutes from '~/modules/ui/siteRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./Layout'),
    children: [
      {
        index: true,
        lazy: () => import('~/modules/home/Index'),
      },
      { path: 'ui', Component: lazy(() => import('~/modules/ui/Layout')), children: uiSiteRoutes },
      {
        path: '*',
        Component: lazy(() => import('./NotFound')),
      },
    ],
  },
];

export default routes;
