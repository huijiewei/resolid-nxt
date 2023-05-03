import { __DEV__, cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';
import type { InputGroupContext } from './InputGroupContext';
import { InputGroupProvider } from './InputGroupContext';

export type InputGroupProps = Partial<InputGroupContext>;

export const InputGroup = (props: PrimitiveProps<'div', InputGroupProps>) => {
  const { children, className, size = 'md', ...rest } = props;

  return (
    <div className={cx('relative flex w-full items-stretch', className)} {...rest}>
      <InputGroupProvider value={{ size }}>{children}</InputGroupProvider>
    </div>
  );
};

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}
