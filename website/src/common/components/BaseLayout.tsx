import { cx } from '@resolid/nxt-utils';
import { type PropsWithChildren } from 'react';

export const BaseLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cx('mx-auto desktop:max-w-7xl', className)}>{children}</div>;
};
