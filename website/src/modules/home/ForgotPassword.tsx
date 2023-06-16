import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { AuthForgotPasswordForm } from '~/common/components/AuthForgotPasswordForm';
import { DefaultLayout } from '~/common/components/DefaultLayout';

export default function HomeForgotPassword() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('forgotPassword')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'justify-center flex'}>
          <div className={'w-96 mt-10'}>
            <div className={'flex justify-center'}>
              <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
            </div>
            <AuthForgotPasswordForm />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
