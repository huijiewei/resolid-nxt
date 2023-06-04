import { server$ } from '@resolid/nxt-run/server';
import { json, type RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/api',
    handle: { api: true },
    children: [
      {
        path: 'demo',
        loader: server$(() => {
          return json({
            demo: 'Hello world!',
          });
        }),
      },
      {
        path: '*',
        loader: () => {
          throw new Response('Not Found', { status: 404 });
        },
      },
    ],
  },
];

export default routes;
