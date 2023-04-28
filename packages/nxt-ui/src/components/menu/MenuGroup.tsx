import { __DEV__ } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';

export const MenuGroup = (props: PrimitiveProps) => {
  const { children, ...rest } = props;

  return (
    <div role={'group'} {...rest}>
      {children}
    </div>
  );
};

if (__DEV__) {
  MenuGroup.displayName = 'MenuGroup';
}
