import { zodResolver } from '@hookform/resolvers/zod';
import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Input } from '@resolid/nxt-ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { AuthModalAction, useAuthModalDispatch } from '~/common/components/AuthModal';
import { FormError } from '~/common/components/FormError';
import { Link } from '~/common/components/Link';

const schema = z.object({
  email: z.string().nonempty().email(),
});

export type AuthForgotPasswordFormData = z.infer<typeof schema>;

export const authForgotPasswordResolver = zodResolver(schema);

export const AuthForgotPasswordForm = () => {
  const { t, i18n } = useTranslation('common');
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();

  const {
    handleSubmit,
    fetcher: { Form, state },
    formState: { errors },
    control,
  } = useNxtFetcherForm<AuthForgotPasswordFormData>({
    mode: 'onSubmit',
    submitOptions: {
      action: `/api/auth/forgot-password?lng=${i18n.resolvedLanguage}`,
    },
    resolver: authForgotPasswordResolver,
  });

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'font-bold text-center text-xl py-3'}>{t('forgotPassword')}</h3>
      <Form className={'flex flex-col gap-6'} onSubmit={handleSubmit} noValidate>
        <div className={'flex flex-col gap-1 relative'}>
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
        <div className={'text-center'}>
          <Button fullWidth loading={state == 'submitting'} type={'submit'}>
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
            as={Link}
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
