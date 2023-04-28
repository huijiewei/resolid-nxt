import { platform, type Alignment, type Side } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useId } from 'react';
import { type PrimitiveProps } from '../../primitives';
import { useFloatingArrow } from './FloatingArrowContext';

export type FloatingArrowProps = {
  /**
   * Width of the arrow.
   * @default 14
   */
  width?: number;

  /**
   * Height of the arrow.
   * @default 7
   */
  height?: number;

  /**
   * The corner radius (rounding) of the arrow tip.
   * @default 0 (sharp)
   */
  tipRadius?: number;

  /**
   * Forces a static offset over dynamic positioning under a certain condition.
   */
  staticOffset?: string | number | null;

  /**
   * Custom path string.
   */
  d?: string;

  /**
   * Stroke (border) width of the arrow.
   */
  strokeWidth?: number;
};

export const FloatingArrow = (props: PrimitiveProps<'svg', FloatingArrowProps>) => {
  const {
    context: {
      placement,
      elements: { floating },
      middlewareData: { arrow },
    },
    setArrow,
    fillClassName,
    strokeClassName,
  } = useFloatingArrow();

  const {
    width = 11,
    height = 6,
    tipRadius = 0.1,
    strokeWidth: strokeWidthProp = 1,
    staticOffset,
    className,
    d,
    ...rest
  } = props;

  const strokeWidth = strokeWidthProp * 2;
  const halfStrokeWidth = strokeWidth / 2;

  const svgX = (width / 2) * (tipRadius / -8 + 1);
  const svgY = ((height / 2) * tipRadius) / 4;

  const [side, alignment] = placement.split('-') as [Side, Alignment];
  const isRTL = floating ? platform.isRTL(floating) : false;
  const isCustomShape = !!d;
  const isVerticalSide = side === 'top' || side === 'bottom';

  const yOffsetProp = staticOffset && alignment === 'end' ? 'bottom' : 'top';
  let xOffsetProp = staticOffset && alignment === 'end' ? 'right' : 'left';
  if (staticOffset && isRTL) {
    xOffsetProp = alignment === 'end' ? 'left' : 'right';
  }

  const arrowOffsetY = isCustomShape ? 0 : halfStrokeWidth;
  const arrowX = arrow?.x != null ? staticOffset || arrow.x : '';
  const arrowY = arrow?.y != null ? staticOffset || arrow.y + arrowOffsetY : '';

  const dValue =
    d ||
    'M0,0' +
      ` H${width}` +
      ` L${width - svgX},${height - svgY}` +
      ` Q${width / 2},${height} ${svgX},${height - svgY}` +
      ' Z';

  const rotation = {
    top: isCustomShape ? 'rotate(180deg)' : '',
    left: isCustomShape ? 'rotate(90deg)' : 'rotate(-90deg)',
    bottom: isCustomShape ? '' : 'rotate(180deg)',
    right: isCustomShape ? 'rotate(-90deg)' : 'rotate(90deg)',
  }[side];

  const clipPathId = useId();

  // noinspection HtmlUnknownAttribute
  return (
    <svg
      className={cx(fillClassName, className)}
      {...rest}
      // @ts-expect-error Property 'suppressHydrationWarning' does not exist
      suppressHydrationWarning
      aria-hidden
      ref={setArrow}
      width={isCustomShape ? width : width + strokeWidth}
      height={width}
      viewBox={`0 0 ${width} ${height > width ? height : width}`}
      style={{
        ...rest.style,
        position: 'absolute',
        pointerEvents: 'none',
        [xOffsetProp]: arrowX,
        [yOffsetProp]: arrowY,
        [side]: isVerticalSide || isCustomShape ? '100%' : `calc(100% - ${strokeWidth / 2}px)`,
        transform: `${rotation}${rest.style?.transform ? ` ${rest.style.transform}` : ''}`,
      }}
    >
      {strokeWidth > 0 && (
        <path
          clipPath={`url(#${clipPathId})`}
          fill="none"
          className={strokeClassName}
          strokeWidth={strokeWidth + (d ? 0 : 1)}
          d={dValue}
        />
      )}
      <path stroke={strokeWidth && !d ? rest.fill : 'none'} d={dValue} />
      <clipPath id={clipPathId}>
        <rect
          x={-halfStrokeWidth}
          y={halfStrokeWidth * (isCustomShape ? -1 : 1)}
          width={width + strokeWidth}
          height={width}
        />
      </clipPath>
    </svg>
  );
};

if (__DEV__) {
  FloatingArrow.displayName = 'FloatingArrow';
}
