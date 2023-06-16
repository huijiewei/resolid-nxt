import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '~/common/components/DefaultLayout';

export default function HomeTerms() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('terms')}</title>
      </Helmet>
      <DefaultLayout>{t('terms')}</DefaultLayout>
    </>
  );
}
