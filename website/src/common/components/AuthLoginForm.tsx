import { zodResolver } from '@hookform/resolvers/zod';
import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Input } from '@resolid/nxt-ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { FormError } from '~/common/components/FormError';

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
});

export type AuthLoginFormData = z.infer<typeof schema>;

export const authLoginResolver = zodResolver(schema);

export const AuthLoginForm = () => {
  const { t, i18n } = useTranslation('common');

  const {
    handleSubmit,
    fetcher: { Form, state },
    formState: { errors },
    control,
  } = useNxtFetcherForm<AuthLoginFormData>({
    mode: 'onSubmit',
    submitOptions: {
      action: `/api/login?lng=${i18n.resolvedLanguage}`,
    },
    resolver: authLoginResolver,
  });

  return (
    <Form className={'flex flex-col gap-3'} onSubmit={handleSubmit}>
      <div className={'flex flex-col gap-1'}>
        <label htmlFor={'email'}>{t('email')}</label>
        <Controller
          name={'email'}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              invalid={Boolean(errors.email)}
              id={'email'}
              fullWidth
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />
        <FormError message={errors.email?.message} />
      </div>
      <div className={'flex flex-col gap-1'}>
        <label htmlFor={'password'}>{t('password')}</label>
        <Controller
          name={'password'}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              invalid={Boolean(errors.password)}
              id={'password'}
              fullWidth
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />
        <FormError message={errors.password?.message} />
      </div>
      <div className={'text-center'}>
        <Button loading={state == 'submitting'} type={'submit'}>
          {t('login')}
        </Button>
      </div>
    </Form>
  );
};
