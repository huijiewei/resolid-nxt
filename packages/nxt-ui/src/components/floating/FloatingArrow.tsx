import { FloatingArrow as FloatingArrowComponent, type FloatingArrowProps } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useFloatingArrow } from './FloatingArrowContext';

export const FloatingArrow = (props: Omit<FloatingArrowProps, 'context' | 'stroke' | 'fill'>) => {
  const { width = 11, height = 6, tipRadius = 0.1, strokeWidth = 1, className, ...rest } = props;

  const arrow = useFloatingArrow();

  return (
    <FloatingArrowComponent
      className={cx(arrow.className, className)}
      ref={arrow.setArrow}
      strokeWidth={strokeWidth}
      width={width}
      height={height}
      context={arrow.context}
      tipRadius={tipRadius}
      {...rest}
    />
  );
};

if (__DEV__) {
  FloatingArrow.displayName = 'FloatingArrow';
}
