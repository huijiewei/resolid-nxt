import { __DEV__ } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';

export type CloseButtonProps = {
  textClassName?: string;
  statusClassName?: string;
};

export const CloseButton = primitiveComponent<'button', CloseButtonProps, 'type'>((props, ref) => {
  const {
    className,
    disabled,
    textClassName = 'text-fg-muted',
    statusClassName = 'hover:bg-bg-subtle active:bg-bg-muted',
    children,
    ...rest
  } = props;
  return (
    <button
      type={'button'}
      disabled={disabled}
      ref={ref}
      className={cx(
        'flex shrink-0 appearance-none items-center justify-center outline-none transition-colors',
        textClassName,
        !disabled && `focus-visible:ring ${statusClassName}`,
        className,
      )}
      {...rest}
    >
      {children || (
        <svg
          width={'1em'}
          height={'1em'}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </button>
  );
});

if (__DEV__) {
  CloseButton.displayName = 'CloseButton';
}
