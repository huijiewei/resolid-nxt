import { __DEV__ } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';
import { cx } from '../../utils/cva';
import { Spinner } from '../spinner/Spinner';
import type { ButtonStyles } from './Button.style';

export type ButtonSpinnerProps = {
  size: NonNullable<ButtonStyles['size']>;
  label?: string;
  placement?: 'start' | 'end';
};

const SpinnerSizes: Record<string, ButtonSpinnerProps['size']> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

export const ButtonSpinner = (props: PrimitiveProps<'span', ButtonSpinnerProps>) => {
  const { label, size, placement, className, children = <Spinner size={SpinnerSizes[size]} />, ...rest } = props;

  return (
    <span
      className={cx(
        'flex items-center',
        label ? 'relative' : 'absolute',
        placement === 'start' ? label && 'me-2' : label && 'ms-2',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

if (__DEV__) {
  ButtonSpinner.displayName = 'ButtonSpinner';
}
