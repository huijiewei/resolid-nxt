import { cx } from '@resolid/nxt-utils';
import { useMemo } from 'react';
import type { PrimitiveProps } from '../../primitives';
import { createContext } from '../../primitives';
import type { ButtonVariants } from './Button.style';

export type ButtonBaseProps = ButtonVariants;

export type ButtonGroupProps = Omit<ButtonBaseProps, 'active'> & {
  vertical?: boolean;
};

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupProps>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

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
