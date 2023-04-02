import type { SVGAttributes } from 'react';
import { cx, isNumber } from '@resolid/nxt-utils';

export type IconProps = SVGAttributes<SVGElement> & { size?: number | string };

export const Icon = (props: IconProps) => {
  const {
    fill = 'none',
    viewBox = '1 1 22 22',
    stroke = 'currentColor',
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    children,
    className = '',
    size = '1em',
    ...rest
  } = props;

  return (
    <svg
      fill={fill}
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={cx(isNumber(size) ? `h-${size} w-${size}` : `h-[${size}] w-[${size}]`, className)}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};
