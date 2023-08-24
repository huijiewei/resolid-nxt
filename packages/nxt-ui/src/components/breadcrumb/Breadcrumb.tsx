import { __DEV__ } from '@resolid/nxt-utils';
import type { ReactElement } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';

export type BreadcrumbProps = {
  /**
   * The visual separator between each breadcrumb item
   * @default "/"
   */
  separator?: string | ReactElement;

  /**
   * The left and right margin applied to the separator
   * @default '0.5rem'
   */
  spacing?: string | number;
};

export const Breadcrumb = primitiveComponent<'nav', BreadcrumbProps>((props, ref) => {
  const { children, className, separator = '/', spacing = '0.5rem', ...rest } = props;

  const validChildren = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
  const count = validChildren.length;

  const clones = validChildren.map((child, index) => {
    return cloneElement(child, {
      separator,
      spacing,
      lastChild: count === index + 1,
    });
  });

  return (
    <nav ref={ref} aria-label="breadcrumb" className={cx('block', className)} {...rest}>
      <ol>{clones}</ol>
    </nav>
  );
});

if (__DEV__) {
  Breadcrumb.displayName = 'Breadcrumb';
}
