import { __DEV__, cx } from '@resolid/nxt-utils';
import { Children, isValidElement, type CSSProperties, type ReactElement } from 'react';
import type { PrimitiveProps } from '../../primitives';
import { toRounded } from '../../utils/radius';
import { toSized } from './Avatar.style';
import { AvatarGroupProvider, type AvatarBaseProps } from './AvatarGroupContext';

export type AvatarGroupProps = AvatarBaseProps & {
  /**
   * The limit number of visible avatars
   * @default 3
   */
  limit?: number | null;

  /**
   * The space between the avatars in the group.
   * @default '-0.75em'
   */
  spacing?: string;
};

export const AvatarGroup = (props: PrimitiveProps<'div', AvatarGroupProps>) => {
  const { className, children, style, size = 'md', radius = 'full', limit = 3, spacing = '-0.75em', ...rest } = props;

  const validChildren = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];

  const economy = limit ? validChildren.slice(0, limit) : validChildren;
  const excess = limit != null ? validChildren.length - limit : 0;

  const rounded = toRounded(radius);
  const sized = toSized(size);

  return (
    <div
      role={'group'}
      style={
        {
          ...style,
          '--spacing-var': spacing,
          '--rounded-var': rounded.value,
          '--size-var': sized.value,
        } as CSSProperties
      }
      className={cx('flex flex-row-reverse items-center justify-end', className)}
      {...rest}
    >
      {excess > 0 && (
        <span
          className={cx(
            'relative inline-flex shrink-0 items-center justify-center bg-bg-subtle text-center font-medium uppercase text-fg-default',
            sized.style,
            rounded.style,
          )}
        >{`+${excess}`}</span>
      )}
      <AvatarGroupProvider value={{ size, radius, rounded, sized }}>{economy.reverse()}</AvatarGroupProvider>
    </div>
  );
};

if (__DEV__) {
  AvatarGroup.displayName = 'AvatarGroup';
}
