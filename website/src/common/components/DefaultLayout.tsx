import { cx } from '@resolid/nxt-utils';
import type { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cx('p-4', className)}>{children}</div>;
};
