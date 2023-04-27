import { FloatingArrow, type FloatingArrowProps, type FloatingContext } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { type RefObject } from 'react';
import { createContext } from '../../primitives';

export type FloatingArrowContextValue = {
  setArrow: RefObject<SVGSVGElement>;
  context: FloatingContext;
  className: string;
};

const [FloatingArrowProvider, useFloatingArrow] = createContext<FloatingArrowContextValue>({
  strict: true,
  name: 'FloatingArrowContext',
});

export { FloatingArrowProvider, useFloatingArrow };

export const FloatingArrowComponent = (props: Omit<FloatingArrowProps, 'context' | 'stroke' | 'fill'>) => {
  const { width = 11, height = 6, tipRadius = 0.2, className, ...rest } = props;

  const arrow = useFloatingArrow();

  return (
    <FloatingArrow
      className={cx(arrow.className, className)}
      ref={arrow.setArrow}
      strokeWidth={1}
      width={width}
      height={height}
      context={arrow.context}
      tipRadius={tipRadius}
      {...rest}
    />
  );
};

if (__DEV__) {
  FloatingArrowComponent.displayName = 'FloatingArrow';
}
