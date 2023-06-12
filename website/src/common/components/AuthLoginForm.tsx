import { zodResolver } from '@hookform/resolvers/zod';
import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Checkbox, Divider, Input } from '@resolid/nxt-ui';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { FormError } from '~/common/components/FormError';
import { Apple } from '~/common/icons/Apple';
import { Facebook } from '~/common/icons/Facebook';
import { Github } from '~/common/icons/Github';
import { Google } from '~/common/icons/Google';
import { Microsoft } from '~/common/icons/Microsoft';
import { Twitter } from '~/common/icons/Twitter';

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
    <div className={'flex flex-col gap-2'}>
      <h3 className={'font-bold text-center text-xl py-3'}>{t('loginTitle')}</h3>
      <Form className={'flex flex-col gap-6'} onSubmit={handleSubmit}>
        <div className={'flex flex-col gap-1 relative'}>
          <label htmlFor={'email'}>{t('email')}</label>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                invalid={Boolean(errors.email)}
                id={'email'}
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
          <Checkbox>{t('rememberMe')}</Checkbox>
          <Button className={'!px-0'} color={'neutral'} variant={'link'}>
            {t('forgotPassword')}
          </Button>
        </div>
        <div className={'text-center'}>
          <Button fullWidth loading={state == 'submitting'} type={'submit'}>
            {t('login')}
          </Button>
        </div>
      </Form>
      <div className={''}>
        {t('noAccount')}&nbsp;
        <Button className={'!px-0'} variant={'link'}>
          {t('register')}
        </Button>
      </div>
      <Divider className={'my-3'}>{t('orContinue')}</Divider>
      <div className={'grid grid-cols-3 gap-3 justify-center'}>
        <Button variant={'outline'} color={'neutral'}>
          <Github className={'me-2'} /> Github
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Apple className={'me-2'} /> Apple
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Google className={'me-2'} /> Google
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Twitter className={'me-2'} /> Twitter
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Facebook className={'me-2'} /> Facebook
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Microsoft className={'me-2'} /> Microsoft
        </Button>
      </div>
    </div>
  );
};
