import { __DEV__ } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';
import { cx } from '../../utils/cva';

const IncrementIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
      <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
    </svg>
  );
};

const DecrementIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={'1em'} height={'1em'} viewBox="0 0 20 20" fill="currentColor">
      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
  );
};

export const NumberInputControl = (props: PrimitiveProps<'button', { stepper: 'increment' | 'decrement' }, 'type'>) => {
  const { className, disabled, stepper, ...rest } = props;

  return (
    <button
      type={'button'}
      tabIndex={-1}
      disabled={disabled}
      className={cx(
        'flex w-full flex-1 select-none appearance-none items-center justify-center bg-bg-subtlest transition-colors',
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-bg-subtle active:bg-bg-muted',
        stepper == 'increment' && 'rounded-tr',
        stepper == 'decrement' && 'rounded-br',
        className,
      )}
      {...rest}
    >
      {stepper == 'increment' && <IncrementIcon />}
      {stepper == 'decrement' && <DecrementIcon />}
    </button>
  );
};

if (__DEV__) {
  NumberInputControl.displayName = 'NumberInputControl';
}
