import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/admin',
    Component: lazy(() => import('./Layout')),
    children: [
      { index: true, Component: lazy(() => import('./Home')) },
      {
        path: '*',
        Component: lazy(() => import('./NotFound')),
      },
    ],
  },
];

export default routes;
