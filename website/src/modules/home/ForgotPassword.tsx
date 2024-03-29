import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { AuthForgotPasswordForm } from '~/extensions/auth/AuthForgotPasswordForm';

export default function HomeForgotPassword() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('forgotPassword')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'flex justify-center'}>
          <div className={'mt-10 w-96'}>
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
