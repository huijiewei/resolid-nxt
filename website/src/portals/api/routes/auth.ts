import { hashSync, verifySync } from '@node-rs/bcrypt';
import { validateFormData } from '@resolid/nxt-run-form';
import { server$ } from '@resolid/nxt-run/server';
import type { RouteObject } from 'react-router-dom';
import {
  authForgotPasswordResolver,
  type AuthForgotPasswordFormData,
} from '~/common/components/AuthForgotPasswordForm';
import { authLoginResolver, type AuthLoginFormData } from '~/common/components/AuthLoginForm';
import type { AuthSignupFormData } from '~/common/components/AuthSignupForm';
import { authSignupResolver } from '~/common/components/AuthSignupForm';
import { problem, success } from '~/common/utils/http';
import { db } from '~/foundation/db';
import { commitSession, destroySession, getSession, omitUser } from '~/foundation/session';
import { getFixedT } from '~/i18n.server';

const routes: RouteObject[] = [
  {
    path: 'login',
    action: server$(async ({ request }) => {
      const { errors, data } = await validateFormData<AuthLoginFormData>(request, authLoginResolver);

      if (errors) {
        return problem(errors);
      }

      const t = await getFixedT(new URL(request.url).searchParams.get('lng'), 'common');
      const user = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user == null) {
        return problem({
          email: { message: t('userNotExist') },
        });
      }

      if (!verifySync(data.password, user.password)) {
        return problem({
          password: { message: t('passwordWrong') },
        });
      }

      const session = await getSession(request.headers.get('Cookie'));
      session.set('id', user.id);

      return success(omitUser(user), false, {
        headers: {
          'Set-Cookie': await commitSession(session, {
            maxAge: data?.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 30,
          }),
        },
      });
    }),
  },
  {
    path: 'logout',
    action: server$(async ({ request }) => {
      const session = await getSession(request.headers.get('Cookie'));

      return success(null, true, {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    }),
  },
  {
    path: 'signup',
    action: server$(async ({ request }) => {
      const { errors, data } = await validateFormData<AuthSignupFormData>(request, authSignupResolver);

      if (errors) {
        return problem(errors);
      }

      const t = await getFixedT(new URL(request.url).searchParams.get('lng'), 'common');

      if (
        (await db.user.findUnique({
          where: {
            email: data.email,
          },
        })) != null
      ) {
        return problem({
          email: { message: t('userExist') },
        });
      }

      if (
        (await db.user.findUnique({
          where: {
            username: data.username,
          },
        })) != null
      ) {
        return problem({
          username: { message: t('userExist') },
        });
      }

      const user = await db.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: hashSync(data?.password),
        },
      });

      const session = await getSession(request.headers.get('Cookie'));
      session.set('id', user.id);

      return success(omitUser(user), false, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }),
  },
  {
    path: 'forgot-password',
    action: server$(async ({ request }) => {
      const { errors, data } = await validateFormData<AuthForgotPasswordFormData>(request, authForgotPasswordResolver);

      if (errors) {
        return problem(errors);
      }

      const t = await getFixedT(new URL(request.url).searchParams.get('lng'), 'common');
      const user = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user == null) {
        return problem({
          email: { message: t('userNotExist') },
        });
      }

      return success({});
    }),
  },
];

export default routes;
