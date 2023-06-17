import { zodResolver } from '@hookform/resolvers/zod';
import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Checkbox, Input } from '@resolid/nxt-ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { AuthContinue } from '~/common/components/AuthContinue';
import { AuthModalAction, useAuthModalDispatch } from '~/common/components/AuthModal';
import { FormError } from '~/common/components/FormError';
import { Link } from '~/common/components/Link';

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
  rememberMe: z.boolean().default(false),
});

export type AuthLoginFormData = z.infer<typeof schema>;

export const authLoginResolver = zodResolver(schema);

export const AuthLoginForm = () => {
  const { t, i18n } = useTranslation('common');
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();

  const {
    handleSubmit,
    fetcher: { Form, state },
    formState: { errors },
    control,
  } = useNxtFetcherForm<AuthLoginFormData>({
    mode: 'onSubmit',
    submitOptions: {
      action: `/api/auth/login?lng=${i18n.resolvedLanguage}`,
    },
    resolver: authLoginResolver,
  });

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'font-bold text-center text-xl py-3'}>{t('loginTitle')}</h3>
      <Form className={'flex flex-col gap-6'} onSubmit={handleSubmit} noValidate>
        <div className={'flex flex-col gap-1 relative'}>
          <label htmlFor={'email'}>{t('email')}</label>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                invalid={Boolean(errors.email)}
                id={'email'}
                type={'email'}
                fullWidth
                placeholder={t('email') as string}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.email?.message} />
        </div>
        <div className={'flex flex-col gap-1 relative'}>
          <label htmlFor={'password'}>{t('password')}</label>
          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                invalid={Boolean(errors.password)}
                id={'password'}
                type={'password'}
                fullWidth
                placeholder={t('password') as string}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.password?.message} />
        </div>
        <div className={'flex justify-between flex-row'}>
          <Controller
            name={'rememberMe'}
            control={control}
            render={({ field: { onChange } }) => (
              <Checkbox id={'rememberMe'} onChange={onChange}>
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
              as={Link}
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
          <Button fullWidth loading={state == 'submitting'} type={'submit'}>
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
            as={Link}
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
