import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../alert/Alert';
import { CloseButton } from '../close-button/CloseButton';
import type { ToastBaseProps } from './ToastContext';

export type ToastProps = ToastBaseProps;

const toastColorStyles = {
  neutral: (solid: boolean) =>
    solid
      ? 'hover:bg-bg-neutral-emphasis-hovered active:bg-bg-neutral-emphasis-pressed'
      : 'hover:bg-bg-neutral-hovered active:bg-bg-neutral-pressed',
  primary: (solid: boolean) =>
    solid
      ? 'hover:bg-bg-primary-emphasis-hovered active:bg-bg-primary-emphasis-pressed'
      : 'hover:bg-bg-primary-hovered active:bg-bg-primary-pressed',
  success: (solid: boolean) =>
    solid
      ? 'hover:bg-bg-success-emphasis-hovered active:bg-bg-success-emphasis-pressed'
      : 'hover:bg-bg-success-hovered active:bg-bg-success-pressed',
  warning: (solid: boolean) =>
    solid
      ? 'hover:bg-bg-warning-emphasis-hovered active:bg-bg-warning-emphasis-pressed'
      : 'hover:bg-bg-warning-hovered active:bg-bg-warning-pressed',
  danger: (solid: boolean) =>
    solid
      ? 'hover:bg-bg-danger-emphasis-hovered active:bg-bg-danger-emphasis-pressed'
      : 'hover:bg-bg-danger-hovered active:bg-bg-danger-pressed',
};

export const Toast = primitiveComponent<'div', ToastProps>((props, ref) => {
  const {
    id,
    icon,
    title,
    color = 'primary',
    variant = 'light',
    closeable = true,
    onClose,
    description,
    className,
    ...rest
  } = props;

  const titleId = id ? `${id}-title` : undefined;

  return (
    <Alert
      id={String(id)}
      ref={ref}
      className={cx('w-auto min-w-[20em] max-w-md pr-8 shadow-lg', className)}
      color={color}
      variant={variant}
      aria-labelledby={titleId}
      {...rest}
    >
      {icon && <AlertIcon>{icon}</AlertIcon>}
      <div className={'max-w-full flex-1'}>
        {title && <AlertTitle id={titleId}>{title}</AlertTitle>}
        <AlertDescription>{description}</AlertDescription>
      </div>
      {closeable && (
        <CloseButton
          onClick={onClose}
          textClassName={variant == 'solid' ? 'text-fg-emphasized' : undefined}
          statusClassName={toastColorStyles[color](variant == 'solid')}
          className={cx('absolute top-1 right-1 rounded p-0.5')}
        />
      )}
    </Alert>
  );
});

if (__DEV__) {
  Toast.displayName = 'Toast';
}
