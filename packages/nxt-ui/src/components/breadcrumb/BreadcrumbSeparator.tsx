import { __DEV__ } from '@resolid/nxt-utils';
import { type CSSProperties } from 'react';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';

type BreadcrumbSeparatorProps = {
  spacing?: string | number;
};

export const BreadcrumbSeparator = primitiveComponent<'span', BreadcrumbSeparatorProps>((props, ref) => {
  const { spacing, className, ...rest } = props;

  return (
    <span
      ref={ref}
      style={
        {
          '--spacing-var': `${spacing}`,
        } as CSSProperties
      }
      className={cx(`mx-[--spacing-var]`, className)}
      role="presentation"
      {...rest}
    />
  );
});

if (__DEV__) {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
}
