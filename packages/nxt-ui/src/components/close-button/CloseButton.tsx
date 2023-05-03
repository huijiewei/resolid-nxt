import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';

export const CloseButton = primitiveComponent<'button'>((props, ref) => {
  const { className, disabled, children, ...rest } = props;
  return (
    <button
      disabled={disabled}
      ref={ref}
      className={cx(
        'flex shrink-0 appearance-none items-center justify-center text-fg-muted outline-none transition-colors',
        !disabled && 'hover:bg-bg-subtle focus-visible:ring active:bg-bg-muted',
        className
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
