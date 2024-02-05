import { validateFormData } from '@resolid/nxt-run-form';
import { server$ } from '@resolid/nxt-run/server';
import type { RouteObject } from 'react-router-dom';

import { problem, success } from '~/common/utils/http';
import { verifyToken } from '~/common/utils/trunstile';
import { checkExistByEmail } from '~/engine/modules/user/userService';
import {
  authForgotPasswordResolver,
  type AuthForgotPasswordFormData,
} from '~/extensions/auth/AuthForgotPasswordResolver';
import { getLocale } from '~/extensions/localized-link/localizedLinkUtils';
import { destroySession, getSession } from '~/foundation/session';
import { getFixedT } from '~/i18n.server';

const routes: RouteObject[] = [
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
    path: 'forgot-password',
    action: server$(async ({ request }) => {
      const { errors, data } = await validateFormData<AuthForgotPasswordFormData>(request, authForgotPasswordResolver);

      if (errors) {
        return problem(errors);
      }

      const captcha = await verifyToken(data?.token);

      if (!captcha.success) {
        return problem({
          captcha: { message: captcha.error },
        });
      }

      const t = await getFixedT(getLocale(request), 'common');

      if (!(await checkExistByEmail(data?.email))) {
        return problem({
          email: { message: t('userNotExist') },
        });
      }

      return success({});
    }),
  },
];

export default routes;
