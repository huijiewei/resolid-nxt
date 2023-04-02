import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./Layout'),
    children: [
      {
        index: true,
        lazy: () => import('~/modules/home/Index'),
      },
    ],
  },
];

export default routes;
