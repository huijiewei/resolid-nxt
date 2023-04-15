import { __DEV__, cx } from '@resolid/nxt-utils';
import { polymorphicComponent } from '../../primitives';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';
import type { SpinnerVariants } from './Spinner.style';
import { spinnerVariants } from './Spinner.style';

export type SpinnerProps = SpinnerVariants & {
  /**
   * Label
   * @default 'Loading…'
   */
  label?: string;
};

export const Spinner = polymorphicComponent<'span', SpinnerProps>((props, ref) => {
  const { as: Component = 'span', label = 'Loading', className, size = 'md', color = 'primary', ...rest } = props;

  return (
    <Component ref={ref} className={cx(spinnerVariants({ color, size }), className)} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Component>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}
