import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
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
