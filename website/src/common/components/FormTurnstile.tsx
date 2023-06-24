import { Turnstile, type TurnstileInstance, type TurnstileProps } from '@marsidev/react-turnstile';
import { __DEV__ } from '@resolid/nxt-utils';
import { forwardRef } from 'react';

export const FormTurnstile = forwardRef<TurnstileInstance, Omit<TurnstileProps, 'siteKey'>>((props, ref) => {
  const { ...rest } = props;

  return (
    <div className={'h-[65px]'}>
      <Turnstile ref={ref} siteKey={import.meta.env.VITE_TURNSTILE_KEY} {...rest}></Turnstile>
    </div>
  );
});

if (__DEV__) {
  FormTurnstile.displayName = 'FormTurnstile';
}
