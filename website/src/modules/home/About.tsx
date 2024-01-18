import { Button } from '@resolid/nxt-ui';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { AuthAction, useAuthDispatch } from '~/extensions/auth/AuthContext';
import { LocalizedLink } from '~/extensions/localized-link/LocalizedLink';

export default function HomeAbout() {
  const { t } = useTranslation('site');
  const { setAction } = useAuthDispatch();

  return (
    <>
      <Helmet>
        <title>{t('menu.about')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'flex gap-5'}>
          <Button onClick={() => setAction(AuthAction.MODAL)}>Auth Modal</Button>
          <Button as={LocalizedLink} to={'../admin'}>
            Admin
          </Button>
        </div>
      </DefaultLayout>
    </>
  );
}
