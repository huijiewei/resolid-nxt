import { __DEV__ } from '@resolid/nxt-utils';
import { polymorphicComponent } from '../../primitives';

export const Box = polymorphicComponent<'div'>((props, ref) => {
  const { as: Component = 'div', ...rest } = props;

  return <Component ref={ref} {...rest} />;
});

if (__DEV__) {
  Box.displayName = 'Box';
}
