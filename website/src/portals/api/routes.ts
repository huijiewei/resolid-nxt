import { server$ } from '@resolid/nxt-run/server';
import { json, type RouteObject } from 'react-router-dom';
import authRoutes from './routes/auth';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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
        path: '401',
        loader: server$(() => {
          return new Response(null, { status: 401 });
        }),
      },
      {
        path: 'auth',
        children: authRoutes,
      },
      {
        path: '*',
        loader: server$(() => {
          return new Response('Not Found', { status: 404 });
        }),
      },
    ],
  },
];

export default routes;
