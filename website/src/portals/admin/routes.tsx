import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const routes: RouteObject[] = [
  {
    path: '/admin',
    Component: lazy(() => import('./Layout')),
    children: [
      { index: true, Component: lazy(() => import('./Home')) },
      { path: '*', lazy: () => import('./NotFound') },
    ],
  },
];

export default routes;
