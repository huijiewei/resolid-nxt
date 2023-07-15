import { __DEV__, cx, isNumber } from '@resolid/nxt-utils';
import type { CSSProperties } from 'react';
import { primitiveComponent } from '../../primitives';
import type { Radius } from '../../utils/radius';
import { toRounded } from '../../utils/radius';
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
   * Rounded
   * @default false
   */
  radius?: Radius;
};

const overlayColorStyles = {
  neutral: 'bg-bg-neutral',
  primary: 'bg-bg-primary',
  success: 'bg-bg-success',
  warning: 'bg-bg-warning',
  danger: 'bg-bg-danger',
};

export const Overlay = primitiveComponent<'div', OverlayProps>((props, ref) => {
  const { className, opacity = 75, color = 'neutral', blur = false, radius = false, ...rest } = props;

  const opacityValue = opacity > 1 ? opacity / 100 : opacity;
  const blurValue = isNumber(blur) && blur > 0 ? `${blur}px` : undefined;

  const rounded = toRounded(radius);

  const colorStyle = overlayColorStyles[color];

  const isBlur = isNumber(blur) ? blur > 0 : blur;

  const overlayStyle = isBlur ? 'w-full h-full' : 'absolute inset-0 z-10';

  const overlay = (
    <div
      ref={ref}
      style={
        { '--opacity-var': opacityValue, '--rounded-var': rounded.value, '--blur-var': blurValue } as CSSProperties
      }
      className={cx(overlayStyle, 'opacity-[--opacity-var]', rounded.style, colorStyle, className)}
      {...rest}
    />
  );

  if (isBlur) {
    return (
      <div
        style={{ '--blur-var': blurValue, '--rounded-var': rounded.value } as CSSProperties}
        className={cx(
          'absolute inset-0 z-10',
          isNumber(blur) ? 'backdrop-blur-[--blur-var]' : 'backdrop-blur-[2px]',
          rounded.style,
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
