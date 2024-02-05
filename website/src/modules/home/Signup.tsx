import { hashSync } from '@node-rs/bcrypt';
import { validateFormData } from '@resolid/nxt-run-form';
import { server$ } from '@resolid/nxt-run/server';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { problem, success } from '~/common/utils/http';
import { checkExistByEmail, checkExistByUsername, createUser } from '~/engine/modules/user/userService';
import { AuthSignupForm } from '~/extensions/auth/AuthSignupForm';
import { authSignupResolver, type AuthSignupFormData } from '~/extensions/auth/AuthSignupResolver';
import { getLocale } from '~/extensions/localized-link/localizedLinkUtils';
import { commitSession, getSession, omitUser } from '~/foundation/session';
import { getFixedT } from '~/i18n.server';

export const action = server$(async ({ request }) => {
  const { errors, data } = await validateFormData<AuthSignupFormData>(request, authSignupResolver);

  if (errors) {
    return problem(errors);
  }

  const t = await getFixedT(getLocale(request), 'common');

  if (await checkExistByEmail(data?.email)) {
    return problem({
      email: { message: t('userExist') },
    });
  }

  if (await checkExistByUsername(data?.username)) {
    return problem({
      username: { message: t('userExist') },
    });
  }

  const user = await createUser({
    email: data.email,
    username: data.username,
    password: hashSync(data?.password),
    userGroupId: 2,
  });

  const session = await getSession(request.headers.get('Cookie'));
  session.set('id', user.id);

  return success(omitUser(user), false, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
});

export function Component() {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('signup')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'flex justify-center'}>
          <div className={'mt-10 w-96'}>
            <div className={'flex justify-center'}>
              <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
            </div>
            <AuthSignupForm />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
