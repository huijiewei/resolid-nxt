import { __DEV__ } from '@resolid/nxt-utils';
import { polymorphicComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { VisuallyHidden } from '../visually-hidden/VisuallyHidden';
import type { SpinnerStyles } from './Spinner.style';
import { spinnerStyles } from './Spinner.style';

export type SpinnerProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: SpinnerStyles['size'];

  /**
   * Color
   * @default 'primary'
   */
  color?: SpinnerStyles['color'];
  /**
   * Label
   * @default 'Loading…'
   */
  label?: string;
};

export const Spinner = polymorphicComponent<'span', SpinnerProps>((props, ref) => {
  const { as: Component = 'span', label = 'Loading', className, size = 'md', color = 'primary', ...rest } = props;

  return (
    <Component ref={ref} className={cx(spinnerStyles({ color, size }), className)} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Component>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}
