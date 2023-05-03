import { __DEV__, cx, isNumber } from '@resolid/nxt-utils';
import type { CSSProperties } from 'react';
import { primitiveComponent } from '../../primitives';
import type { Color } from '../../utils/types';

export type OverlayProps = {
  /**
   * Opacity
   * @default 75
   */
  opacity?: number;

  /**
   * Color
   * @default 'neutral'
   */
  color?: Color;

  /**
   * Blur
   * @default false
   */
  blur?: boolean | number;

  /**
   * Rounded size
   * @default false
   */
  radius?: boolean | number;
};

const overlayColorStyles = {
  neutral: 'bg-bg-neutral-emphasis',
  primary: 'bg-bg-primary',
  success: 'bg-bg-success',
  warning: 'bg-bg-warning',
  danger: 'bg-bg-danger',
};

export const Overlay = primitiveComponent<'div', OverlayProps>((props, ref) => {
  const { className, opacity = 75, color = 'neutral', blur = false, radius = false, ...rest } = props;

  const opacityValue = opacity > 1 ? opacity / 100 : opacity;
  const blurValue = isNumber(blur) && blur > 0 ? `${blur}px` : undefined;
  const roundedValue = isNumber(radius) && radius > 0 ? `${radius}px` : undefined;

  const roundedStyle = isNumber(radius) ? radius > 0 && 'rounded-[--rounded-var]' : radius && 'rounded';

  const colorStyle = overlayColorStyles[color];

  const isBlur = isNumber(blur) ? blur > 0 : blur;

  const overlayStyle = isBlur ? 'w-full h-full' : 'absolute inset-0 z-10';

  const overlay = (
    <div
      ref={ref}
      style={{ '--opacity-var': opacityValue, '--rounded-var': roundedValue } as CSSProperties}
      className={cx(overlayStyle, 'opacity-[--opacity-var]', roundedStyle, colorStyle, className)}
      {...rest}
    />
  );

  if (isBlur) {
    return (
      <div
        style={{ '--blur-var': blurValue, '--rounded-var': roundedValue } as CSSProperties}
        className={cx(
          'absolute inset-0 z-10',
          isNumber(blur) ? 'backdrop-blur-[--blur-var]' : 'backdrop-blur-sm',
          roundedStyle
        )}
      >
        {overlay}
      </div>
    );
  }

  return overlay;
});

if (__DEV__) {
  Overlay.displayName = 'Overlay';
}
