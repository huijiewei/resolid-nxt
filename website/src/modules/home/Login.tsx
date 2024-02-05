import { verifySync } from '@node-rs/bcrypt';
import { validateFormData } from '@resolid/nxt-run-form';
import { server$ } from '@resolid/nxt-run/server';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { problem, success } from '~/common/utils/http';
import { getUserByEmail } from '~/engine/modules/user/userService';
import { AuthLoginForm } from '~/extensions/auth/AuthLoginForm';
import { authLoginResolver, type AuthLoginFormData } from '~/extensions/auth/AuthLoginResolver';
import { getLocale } from '~/extensions/localized-link/localizedLinkUtils';
import { commitSession, getSession, omitUser } from '~/foundation/session';
import { getFixedT } from '~/i18n.server';

export const action = server$(async ({ request }) => {
  const { errors, data } = await validateFormData<AuthLoginFormData>(request, authLoginResolver);

  if (errors) {
    return problem(errors);
  }

  const t = await getFixedT(getLocale(request), 'common');
  const user = await getUserByEmail(data?.email);

  if (user == null) {
    return problem({
      email: { message: t('userNotExist') },
      password: null,
    });
  }

  if (!verifySync(data.password, user.password)) {
    return problem({
      email: null,
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
});

export function Component() {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('login')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'flex justify-center'}>
          <div className={'mt-10 w-96'}>
            <div className={'flex justify-center'}>
              <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
            </div>
            <AuthLoginForm />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
