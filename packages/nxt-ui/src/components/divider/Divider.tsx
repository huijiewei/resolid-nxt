import { __DEV__, cx } from '@resolid/nxt-utils';
import type { CSSProperties } from 'react';
import { primitiveComponent } from '../../primitives';
import type { DividerStyles } from './Divider.style';
import { dividerStyles } from './Divider.style';

export type DividerProps = {
  /**
   * Color
   * @default "neutral"
   */
  color?: NonNullable<DividerStyles['color']>;

  /**
   * Variant
   * @default "solid"
   */
  variant?: NonNullable<DividerStyles['variant']>;

  /**
   * Size
   * @default 1
   */
  size?: number;

  /**
   * Vertical
   * @default false
   */
  vertical?: boolean;

  /**
   * Label Position
   * @default "center"
   */
  position?: 'left' | 'right' | 'center';
};

export const Divider = primitiveComponent<'div', DividerProps>((props, ref) => {
  const {
    color = 'neutral',
    vertical = false,
    size = 1,
    variant = 'solid',
    position = 'center',
    className,
    children,
    ...rest
  } = props;

  const hasLabel = !!children && !vertical;

  return (
    <div
      role={'separator'}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      ref={ref}
      style={
        {
          '--size-var': `${size}px`,
        } as CSSProperties
      }
      className={cx(dividerStyles({ color, variant, vertical, label: hasLabel, position }), className)}
      {...rest}
    >
      {hasLabel && children}
    </div>
  );
});

if (__DEV__) {
  Divider.displayName = 'Divider';
}
