import { __DEV__, cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';
import { createContext } from '../../primitives';
import { alertStyles, type AlertStyles } from './Alert.styles';

type AlertContextValue = {
  /**
   * Variant
   * @default 'light'
   */
  variant?: NonNullable<AlertStyles['variant']>;
};

const [AlertProvider, useAlert] = createContext<AlertContextValue>({
  strict: true,
  name: 'AlertContext',
});

export type AlertProps = AlertContextValue & {
  /**
   * Color
   * @default 'primary'
   */
  color?: NonNullable<AlertStyles['color']>;
};

export const Alert = (props: PrimitiveProps<'div', AlertProps>) => {
  const { className, children, color = 'primary', variant = 'light', ...rest } = props;

  return (
    <AlertProvider value={{ variant }}>
      <div
        role={'alert'}
        className={cx(
          'relative flex items-center gap-2 overflow-hidden rounded border p-3',
          alertStyles({ variant, color }),
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </AlertProvider>
  );
};

if (__DEV__) {
  Alert.displayName = 'Alert';
}

export const AlertTitle = (props: PrimitiveProps<'div'>) => {
  const { className, ...rest } = props;

  return <div className={cx('font-medium', className)} {...rest} />;
};

if (__DEV__) {
  AlertTitle.displayName = 'AlertTitle';
}

export const AlertDescription = (props: PrimitiveProps<'div'>) => {
  const { className, ...rest } = props;

  const { variant } = useAlert();

  return <div className={cx(variant != 'solid' && 'text-fg-default', className)} {...rest} />;
};

if (__DEV__) {
  AlertDescription.displayName = 'AlertDescription';
}

export const AlertIcon = (props: PrimitiveProps<'span'>) => {
  const { className, ...rest } = props;

  return <span className={cx(`shrink-0`, className)} {...rest} />;
};

if (__DEV__) {
  AlertIcon.displayName = 'AlertIcon';
}
