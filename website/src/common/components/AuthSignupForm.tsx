import { zodResolver } from '@hookform/resolvers/zod';
import { useNxtFetcherForm } from '@resolid/nxt-run-form';
import { Button, Checkbox, Input } from '@resolid/nxt-ui';
import { Controller } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { AuthContinue } from '~/common/components/AuthContinue';
import { AuthModalAction, useAuthModalDispatch } from '~/common/components/AuthModal';
import { FormError } from '~/common/components/FormError';
import { LocalizedLink } from '~/common/components/LocalizedLink';

const schema = z
  .object({
    email: z.string().nonempty().email(),
    username: z.string().nonempty().min(3).max(15),
    password: z.string().nonempty().min(6),
    confirmPassword: z.string().nonempty().min(6),
    agreeTerms: z.literal<boolean>(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    params: {
      i18n: 'not_match',
    },
  });

export type AuthSignupFormData = z.infer<typeof schema>;

export const authSignupResolver = zodResolver(schema);

export const AuthSignupForm = () => {
  const { t, i18n } = useTranslation('common');
  const [params] = useSearchParams();
  const setAuthModalAction = useAuthModalDispatch();

  const {
    handleSubmit,
    fetcher: { Form, state },
    formState: { errors },
    control,
  } = useNxtFetcherForm<AuthSignupFormData>({
    mode: 'onSubmit',
    submitOptions: {
      action: `/api/auth/signup?hl=${i18n.language}`,
    },
    resolver: authSignupResolver,
  });

  return (
    <div className={'flex flex-col gap-2'}>
      <h3 className={'font-bold text-center text-xl py-3'}>{t('signupTitle')}</h3>
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
        <div className={'flex flex-col gap-1 relative'}>
          <label htmlFor={'username'}>{t('username')}</label>
          <Controller
            name={'username'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.username)}
                fullWidth
                placeholder={t('username') as string}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.username?.message} />
        </div>
        <div className={'flex flex-col gap-1 relative'}>
          <label htmlFor={'password'}>{t('password')}</label>
          <Controller
            name={'password'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.password)}
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
        <div className={'flex flex-col gap-1 relative'}>
          <label htmlFor={'confirmPassword'}>{t('confirmPassword')}</label>
          <Controller
            name={'confirmPassword'}
            control={control}
            render={({ field: { name, onChange, onBlur, value, ref } }) => (
              <Input
                id={name}
                name={name}
                invalid={Boolean(errors.confirmPassword)}
                type={'password'}
                fullWidth
                placeholder={t('confirmPassword') as string}
                onChange={(vc) => onChange(vc as string)}
                onBlur={onBlur}
                value={value}
                ref={ref}
              />
            )}
          />
          <FormError message={errors.confirmPassword?.message} />
        </div>
        <div className={'relative'}>
          <Controller
            name={'agreeTerms'}
            control={control}
            render={({ field: { name, onChange } }) => (
              <Checkbox id={name} name={name} invalid={Boolean(errors.agreeTerms)} onChange={onChange}>
                <Trans t={t} i18nKey={'agreeTerms'}>
                  Agree{' '}
                  <LocalizedLink className={'text-link hover:text-link-hovered'} target={'_blank'} to={'../terms'}>
                    Terms of Service
                  </LocalizedLink>{' '}
                  and have read{' '}
                  <LocalizedLink className={'text-link hover:text-link-hovered'} target={'_blank'} to={'../privacy'}>
                    Privacy Policy
                  </LocalizedLink>
                </Trans>
              </Checkbox>
            )}
          />
        </div>
        <div className={'text-center'}>
          <Button size={'lg'} fullWidth loading={state == 'submitting'} type={'submit'}>
            {t('signup')}
          </Button>
        </div>
      </Form>
      <div className={''}>
        {t('haveAccount')}&nbsp;
        {setAuthModalAction ? (
          <Button onClick={() => setAuthModalAction(AuthModalAction.LOGIN)} className={'!px-0'} variant={'link'}>
            {t('login')}
          </Button>
        ) : (
          <Button
            as={LocalizedLink}
            to={{ pathname: '../login', search: params.toString() }}
            className={'!px-0'}
            variant={'link'}
          >
            {t('login')}
          </Button>
        )}
      </div>
      <AuthContinue />
    </div>
  );
};
