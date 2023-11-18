import { zodResolver } from '@hookform/resolvers/zod';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Input } from '@resolid/nxt-ui';
import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { AuthModalAction, useAuthModalDispatch } from '~/common/components/AuthModal';
import { FormError } from '~/common/components/FormError';
import { FormTurnstile } from '~/common/components/FormTurnstile';
import { LocalizedLink } from '~/common/components/LocalizedLink';

const schema = z.object({
  email: z.string().nonempty().email(),
  token: z.string().nonempty(),
});

export type AuthForgotPasswordFormData = z.infer<typeof schema>;

// eslint-disable-next-line react-refresh/only-export-components
export const authForgotPasswordResolver = zodResolver(schema);

export const AuthForgotPasswordForm = () => {
  const { t, i18n } = useTranslation('common');
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();
  const [captchaVerify, setCaptchaVerify] = useState(false);
  const captchaRef = useRef<TurnstileInstance>(null);

  const {
    handleSubmit,
    fetcher: { Form, state, data },
    formState: { errors },
    control,
  } = useNxtFetcherForm<AuthForgotPasswordFormData>({
    mode: 'onSubmit',
    submitOptions: {
      action: `/api/auth/forgot-password?hl=${i18n.language}`,
    },
    resolver: authForgotPasswordResolver,
  });

  useEffect(() => {
    if (!data?.success) {
      setCaptchaVerify(false);
      captchaRef.current?.reset();
    }
  }, [data]);

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'py-3 text-center text-xl font-bold'}>{t('forgotPassword')}</h3>
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
                invalid={Boolean(errors.email)}
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
        <Controller
          name={'token'}
          control={control}
          render={({ field: { onChange } }) => (
            <FormTurnstile
              ref={captchaRef}
              onSuccess={(token) => {
                onChange(token);
                setCaptchaVerify(true);
              }}
              options={{ responseField: false }}
            />
          )}
        ></Controller>
        <div className={'text-center'}>
          <Button fullWidth size={'lg'} disabled={!captchaVerify} loading={state == 'submitting'} type={'submit'}>
            {t('send')}
          </Button>
        </div>
      </Form>
      <div className={''}>
        {setAuthModalAction ? (
          <Button onClick={() => setAuthModalAction(AuthModalAction.LOGIN)} className={'!px-0'} variant={'link'}>
            {t('backLogin')}
          </Button>
        ) : (
          <Button
            as={LocalizedLink}
            to={{ pathname: '../login', search: params.toString() }}
            className={'!px-0'}
            variant={'link'}
          >
            {t('backLogin')}
          </Button>
        )}
      </div>
    </div>
  );
};
