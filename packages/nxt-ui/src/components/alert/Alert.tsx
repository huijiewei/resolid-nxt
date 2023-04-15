import { cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';
import { createContext } from '../../primitives';
import { alertVariants, type AlertVariants } from './Alert.styles';

type AlertContextValue = {
  variant: AlertVariants['variant'];
};

const [AlertProvider, useAlert] = createContext<AlertContextValue>({
  strict: true,
  name: 'AlertContext',
});

export type AlertProps = AlertVariants;

export const Alert = (props: PrimitiveProps<'div', AlertProps>) => {
  const { className, children, color, variant, ...rest } = props;

  return (
    <AlertProvider value={{ variant }}>
      <div role={'alert'} className={cx(alertVariants({ color, variant }), className)} {...rest}>
        {children}
      </div>
    </AlertProvider>
  );
};

export const AlertTitle = (props: PrimitiveProps<'div'>) => {
  const { className, ...rest } = props;

  return <div className={cx('font-medium', className)} {...rest} />;
};

export const AlertDescription = (props: PrimitiveProps<'div'>) => {
  const { className, ...rest } = props;

  const { variant } = useAlert();

  return <div className={cx(variant != 'solid' && 'text-fg-default', className)} {...rest} />;
};

export const AlertIcon = (props: PrimitiveProps<'span'>) => {
  const { className, ...rest } = props;

  return <span className={cx(`shrink-0`, className)} {...rest} />;
};
