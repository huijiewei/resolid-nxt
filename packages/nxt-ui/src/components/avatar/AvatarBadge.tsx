import { __DEV__, cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';

export const AvatarBadge = (props: PrimitiveProps<'span'>) => {
  const { className, ...rest } = props;
  return (
    <span
      className={cx(
        'absolute bottom-0 right-0 flex translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full',
        className
      )}
      {...rest}
    />
  );
};

if (__DEV__) {
  AvatarBadge.displayName = 'AvatarBadge';
}
