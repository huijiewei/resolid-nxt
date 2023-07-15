import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import type { Size } from '../../utils/types';
import { SelectChevron } from './SelectChevron';

export type NativeSelectProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: Size;
};

const selectSizeStyles = {
  xs: {
    select: 'py-px text-sm pl-2 pr-6',
    chevron: 'w-6',
  },
  sm: {
    select: 'py-0.5 pl-2 pr-6',
    chevron: 'w-6',
  },
  md: {
    select: 'py-1 pl-3 pr-7',
    chevron: 'w-7',
  },
  lg: {
    select: 'py-1.5 pl-3 pr-8',
    chevron: 'w-8',
  },
  xl: {
    select: 'py-[7px] text-lg pl-3 pr-8',
    chevron: 'w-8',
  },
};

export const NativeSelect = primitiveComponent<'select', NativeSelectProps>((props, ref) => {
  const { size = 'md', disabled, children, className, ...rest } = props;

  const sizeStyle = selectSizeStyles[size];

  return (
    <div className={cx('relative h-fit', className)}>
      <select
        disabled={disabled}
        className={cx(
          'w-full appearance-none rounded border border-bg-muted bg-bg-default outline-none transition-colors focus:border-bg-primary-emphasis focus:ring-1 focus:ring-bg-primary-emphasis',
          sizeStyle.select,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
      <div
        className={cx(
          'pointer-events-none absolute bottom-0 right-0 top-0 flex items-center justify-center',
          sizeStyle.chevron,
        )}
      >
        <SelectChevron />
      </div>
    </div>
  );
});

if (__DEV__) {
  NativeSelect.displayName = 'NativeSelect';
}
