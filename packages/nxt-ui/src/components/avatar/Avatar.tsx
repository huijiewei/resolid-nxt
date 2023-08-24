import { __DEV__ } from '@resolid/nxt-utils';
import { type CSSProperties, type HTMLAttributeReferrerPolicy, type ReactElement } from 'react';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { toRounded } from '../../utils/radius';
import { toColored, toSized } from './Avatar.style';
import type { AvatarBaseProps } from './AvatarGroupContext';
import { useAvatarGroup } from './AvatarGroupContext';
import { AvatarImage } from './AvatarImage';

export type AvatarProps = AvatarBaseProps & {
  /**
   * The image url of the Avatar
   */
  src?: string;

  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string;

  /**
   * Avatar name
   */
  name?: string;

  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';

  /**
   * Fallback when name, and src is not specified.
   * @default 'DefaultIcon'
   * @type ReactElement
   */
  fallback?: ReactElement;

  /**
   * Defining which referrer is sent when fetching the resource.
   * @type HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: HTMLAttributeReferrerPolicy;

  /**
   * Function called when image failed to load
   */
  onError?: () => void;
};

export const Avatar = primitiveComponent<'div', AvatarProps>((props, ref) => {
  const group = useAvatarGroup();

  const {
    className,
    children,
    name,
    src,
    srcSet,
    loading,
    referrerPolicy,
    radius = group?.radius ?? 'full',
    size = group?.size ?? 'md',
    onError,
    style,
    ...rest
  } = props;

  const rounded = group ? group.rounded : toRounded(radius);
  const sized = group ? group.sized : toSized(size);
  const colored = toColored(name);

  return (
    <div
      ref={ref}
      style={
        {
          ...style,
          '--rounded-var': !group ? rounded.value : undefined,
          '--size-var': !group ? sized.value : undefined,
          '--color-bg-var': colored.value?.split(',')[0],
          '--color-text-var': colored.value?.split(',')[1],
        } as CSSProperties
      }
      className={cx(
        'relative inline-flex shrink-0 items-center justify-center text-center align-top font-medium uppercase',
        colored.style,
        rounded.style,
        sized.style,
        group && 'border-2 border-bg-default [&:not(:first-child)]:mr-[--spacing-var]',
        className,
      )}
      {...rest}
    >
      <AvatarImage
        rounded={rounded.style}
        name={name}
        src={src}
        referrerPolicy={referrerPolicy}
        srcSet={srcSet}
        loading={loading}
        onError={onError}
      />
      {children}
    </div>
  );
});

if (__DEV__) {
  Avatar.displayName = 'Avatar';
}
