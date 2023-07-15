import { __DEV__, cx } from '@resolid/nxt-utils';
import type { CSSProperties } from 'react';
import { primitiveComponent } from '../../primitives';
import type { Radius } from '../../utils/radius';
import { toRounded } from '../../utils/radius';
import type { Color, Size } from '../../utils/types';
import { progressColorStyles } from './Progress.style';

export type ProgressBarProps = {
  /**
   * Color
   *
   * @default 'primary'
   */
  color?: Color;

  /**
   * Value
   */
  value?: number;

  /**
   * Size
   * @default 'md'
   */
  size?: Size;

  /**
   * Label
   */
  label?: string;

  /**
   * Radius
   */
  radius?: Radius;
};

const progressBarSizeStyles = {
  xs: {
    bar: 'h-1',
    text: 'text-[2px]',
  },
  sm: {
    bar: 'h-2',
    text: 'text-[6px]',
  },
  md: {
    bar: 'h-3',
    text: 'text-xs',
  },
  lg: {
    bar: 'h-4',
    text: 'text-sm',
  },
  xl: {
    bar: 'h-5',
    text: 'text-sm',
  },
};

export const ProgressBar = primitiveComponent<'div', ProgressBarProps>((props, ref) => {
  const { color = 'primary', value, style, radius = false, size = 'md', label, className, children, ...rest } = props;

  const rounded = toRounded(radius);

  const colorStyle = progressColorStyles[color];
  const sizeStyle = progressBarSizeStyles[size];

  return (
    <div
      style={{ ...style, '--rounded-var': rounded.value } as CSSProperties}
      className={cx('relative w-full overflow-hidden bg-bg-subtle', sizeStyle.bar, rounded.style)}
    >
      <div
        ref={ref}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar"
        className={cx(
          'flex h-full items-center justify-center rounded-none text-fg-emphasized transition-[width]',
          sizeStyle.text,
          colorStyle,
          className,
        )}
        style={{ width: `${value}%` }}
        {...rest}
      >
        {children || label}
      </div>
    </div>
  );
});

if (__DEV__) {
  ProgressBar.displayName = 'ProgressBar';
}
