import { cx } from '@resolid/nxt-utils';
import { type PropsWithChildren } from 'react';

export const BaseLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cx('desktop:max-w-7xl mx-auto', className)}>{children}</div>;
};
