import { __DEV__, cx } from '@resolid/nxt-utils';
import { useMemo } from 'react';
import type { PrimitiveProps } from '../../primitives';
import { createContext } from '../../primitives';
import type { ButtonStyles } from './Button.style';

export type ButtonBaseProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: NonNullable<ButtonStyles['size']>;

  /**
   * Color
   * @default 'primary'
   */
  color?: NonNullable<ButtonStyles['color']>;

  /**
   * Variant
   * @default 'solid'
   */
  variant?: NonNullable<ButtonStyles['variant']>;

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupProps = ButtonBaseProps & {
  /**
   * Vertical
   * @default false
   */
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

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}
