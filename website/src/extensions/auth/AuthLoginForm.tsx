import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Checkbox, Input } from '@resolid/nxt-ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FormError } from '~/common/components/FormError';
import { AuthContinue } from '~/extensions/auth/AuthContinue';
import { authLoginResolver, type AuthLoginFormData } from '~/extensions/auth/AuthLoginResolver';
import { AuthModalAction, useAuthModalDispatch } from '~/extensions/auth/AuthModalContext';
import { useAuth } from '~/extensions/auth/useAuth';
import { LocalizedLink } from '~/extensions/localized-link/LocalizedLink';

export const AuthLoginForm = () => {
  const { t, i18n } = useTranslation('common');
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();

  const {
    handleSubmit,
    fetcher: { Form, state, data },
    formState: { errors },
    control,
  } = useNxtFetcherForm<AuthLoginFormData>({
    mode: 'onSubmit',
    submitOptions: {
      action: `/api/auth/login?hl=${i18n.language}`,
    },
    resolver: authLoginResolver,
  });

  useAuth(data);

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'py-3 text-center text-xl font-bold'}>{t('loginTitle')}</h3>
      <Form method={'post'} className={'flex flex-col gap-6'} onSubmit={handleSubmit} noValidate>
        <div className={'relative flex flex-col gap-1'}>
          <label htmlFor={'email'}>{t('email')}</label>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.email?.message)}
                type={'email'}
                fullWidth
                placeholder={t('email') as string}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.email?.message} />
        </div>
        <div className={'relative flex flex-col gap-1'}>
          <label htmlFor={'password'}>{t('password')}</label>
          <Controller
            name={'password'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.password?.message)}
                type={'password'}
                fullWidth
                placeholder={t('password') as string}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.password?.message} />
        </div>
        <div className={'flex flex-row justify-between'}>
          <Controller
            name={'rememberMe'}
            control={control}
            render={({ field: { name, onChange } }) => (
              <Checkbox id={name} name={name} onChange={onChange}>
                {t('rememberMe')}
              </Checkbox>
            )}
          />

          {setAuthModalAction ? (
            <Button
              onClick={() => setAuthModalAction(AuthModalAction.FORGOT_PASSWORD)}
              className={'!px-0'}
              color={'neutral'}
              variant={'link'}
            >
              {t('forgotPassword')}
            </Button>
          ) : (
            <Button
              as={LocalizedLink}
              to={{ pathname: '../forgot-password', search: params.toString() }}
              className={'!px-0'}
              color={'neutral'}
              variant={'link'}
            >
              {t('forgotPassword')}
            </Button>
          )}
        </div>
        <div className={'text-center'}>
          <Button size={'lg'} fullWidth loading={state == 'submitting'} type={'submit'}>
            {t('login')}
          </Button>
        </div>
      </Form>
      <div className={''}>
        {t('noAccount')}&nbsp;
        {setAuthModalAction ? (
          <Button onClick={() => setAuthModalAction(AuthModalAction.SIGNUP)} className={'!px-0'} variant={'link'}>
            {t('signup')}
          </Button>
        ) : (
          <Button
            as={LocalizedLink}
            to={{ pathname: '../signup', search: params.toString() }}
            className={'!px-0'}
            variant={'link'}
          >
            {t('signup')}
          </Button>
        )}
      </div>
      <AuthContinue />
    </div>
  );
};
