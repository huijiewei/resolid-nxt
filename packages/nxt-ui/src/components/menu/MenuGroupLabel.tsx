import { __DEV__, cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';

export const MenuGroupLabel = (props: PrimitiveProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('flex w-full items-center p-1.5 leading-none text-fg-muted outline-none', className)} {...rest}>
      {children}
    </div>
  );
};

if (__DEV__) {
  MenuGroupLabel.displayName = 'MenuGroupLabel';
}
