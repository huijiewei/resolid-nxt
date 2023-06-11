import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { AuthLoginForm } from '~/common/components/AuthLoginForm';
import { DefaultLayout } from '~/common/components/DefaultLayout';

export default function HomeLogin() {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('login')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'justify-center flex'}>
          <div className={'w-96'}>
            <h3 className={'font-bold text-center text-xl py-3'}>{t('login')}</h3>
            <AuthLoginForm />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
