import type { ComponentPropsWithoutRef } from 'react';
import { __DEV__, cx } from '@resolid/nxt-utils';

export const VisuallyHidden = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={cx('sr-only', className)}>
      {children}
    </span>
  );
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
