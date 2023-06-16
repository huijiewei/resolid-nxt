import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '~/common/components/DefaultLayout';

export default function HomePrivacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('privacy')}</title>
      </Helmet>
      <DefaultLayout>{t('privacy')}</DefaultLayout>
    </>
  );
}
