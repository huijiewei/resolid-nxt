import { verifySync } from '@node-rs/bcrypt';
import { validateFormData } from '@resolid/nxt-run-form';
import { server$ } from '@resolid/nxt-run/server';
import { json, type RouteObject } from 'react-router-dom';
import { authLoginResolver, type AuthLoginFormData } from '~/common/components/AuthLoginForm';
import { db } from '~/foundation/db';
import { getFixedT } from '~/i18n.server';

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
        path: 'login',
        action: server$(async ({ request }) => {
          const { errors, data } = await validateFormData<AuthLoginFormData>(request, authLoginResolver);

          if (errors) {
            return json({
              success: false,
              errors,
            });
          } else {
            const t = await getFixedT(new URL(request.url).searchParams.get('lng'), 'common');

            const user = await db.user.findUnique({
              where: {
                email: data.email,
              },
            });

            if (user == null) {
              return json({
                success: false,
                errors: {
                  email: { message: t('userNotExist'), type: 'invalid_string' },
                },
              });
            }

            if (!verifySync(data.password, user.password)) {
              return json({
                success: false,
                errors: {
                  password: { message: t('passwordWrong'), type: 'invalid_string' },
                },
              });
            }

            return json({
              success: true,
            });
          }
        }),
      },
      {
        path: '*',
        loader: server$(() => {
          throw new Response('Not Found', { status: 404 });
        }),
      },
    ],
  },
];

export default routes;
