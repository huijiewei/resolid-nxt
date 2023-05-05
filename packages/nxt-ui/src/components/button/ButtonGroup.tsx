import { __DEV__, cx } from '@resolid/nxt-utils';
import { useMemo } from 'react';
import type { PrimitiveProps } from '../../primitives';
import { ButtonGroupProvider, type ButtonGroupContext } from './ButtonGroupContext';

export type ButtonGroupProps = ButtonGroupContext;

export const ButtonGroup = (props: PrimitiveProps<'div', ButtonGroupProps>) => {
  const { children, vertical = false, disabled, size, color, variant, className, ...rest } = props;

  const context = useMemo(
    () => ({ size, color, variant, disabled, vertical }),
    [size, color, variant, disabled, vertical]
  );

  return (
    <div role={'group'} className={cx('inline-flex', vertical ? 'flex-col' : 'flex-row', className)} {...rest}>
      <ButtonGroupProvider value={context}>{children}</ButtonGroupProvider>
    </div>
  );
};

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}
