import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '~/common/components/DefaultLayout';

export default function HomeAbout() {
  const { t } = useTranslation('site');

  return (
    <>
      <Helmet>
        <title>{t('menu.about')}</title>
      </Helmet>
      <DefaultLayout>About</DefaultLayout>
    </>
  );
}
