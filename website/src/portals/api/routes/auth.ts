import { verifySync } from '@node-rs/bcrypt';
import { validateFormData } from '@resolid/nxt-run-form';
import { server$ } from '@resolid/nxt-run/server';
import type { RouteObject } from 'react-router-dom';
import { json } from 'react-router-dom';
import { authForgotPasswordResolver } from '~/common/components/AuthForgotPasswordForm';
import { authLoginResolver, type AuthLoginFormData } from '~/common/components/AuthLoginForm';
import type { AuthSignupFormData } from '~/common/components/AuthSignupForm';
import { authSignupResolver } from '~/common/components/AuthSignupForm';
import { db } from '~/foundation/db';
import { getFixedT } from '~/i18n.server';

const routes: RouteObject[] = [
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
            revalidate: false,
            errors: {
              email: { message: t('userNotExist') },
            },
          });
        }

        if (!verifySync(data.password, user.password)) {
          return json({
            success: false,
            revalidate: false,
            errors: {
              password: { message: t('passwordWrong') },
            },
          });
        }

        return json({
          success: true,
          revalidate: false,
        });
      }
    }),
  },
  {
    path: 'signup',
    action: server$(async ({ request }) => {
      const { errors, data } = await validateFormData<AuthSignupFormData>(request, authSignupResolver);

      if (errors) {
        return json({
          success: false,
          errors,
        });
      } else {
        const t = await getFixedT(new URL(request.url).searchParams.get('lng'), 'common');

        if (
          (await db.user.findUnique({
            where: {
              email: data.email,
            },
          })) != null
        ) {
          return json({
            success: false,
            revalidate: false,
            errors: {
              email: { message: t('userExist') },
            },
          });
        }

        if (
          (await db.user.findUnique({
            where: {
              username: data.username,
            },
          })) != null
        ) {
          return json({
            success: false,
            revalidate: false,
            errors: {
              username: { message: t('userExist') },
            },
          });
        }

        return json({
          success: true,
          revalidate: false,
        });
      }
    }),
  },
  {
    path: 'forgot-password',
    action: server$(async ({ request }) => {
      const { errors, data } = await validateFormData<AuthLoginFormData>(request, authForgotPasswordResolver);

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
            revalidate: false,
            errors: {
              email: { message: t('userNotExist') },
            },
          });
        }

        return json({
          success: true,
          revalidate: false,
        });
      }
    }),
  },
];

export default routes;
