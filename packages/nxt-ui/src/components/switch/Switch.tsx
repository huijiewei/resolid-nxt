import { __DEV__, cx } from '@resolid/nxt-utils';
import type { ChangeEvent } from 'react';
import { useCallback, useRef, type CSSProperties } from 'react';
import { useControllableState, useFormReset, useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import type { Color, Size } from '../../utils/types';

export type SwitchProps = {
  /**
   * Size
   * @default 'md'
   */
  size?: Size;

  /**
   * Color
   * @default 'primary'
   */
  color?: Color;

  /**
   * Spacing
   * @default '0.5em'
   */
  spacing?: string | number;

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * ReadOnly
   * @default false
   */
  readOnly?: boolean;

  /**
   * onChange callback
   */
  onChange?: (value: boolean) => void;
};

const switchSizeStyles = {
  xs: { track: 'h-3 w-5', thumb: 'translate-x-2', label: 'text-xs leading-3' },
  sm: { track: 'h-3.5 w-6', thumb: 'translate-x-2.5', label: 'text-sm' },
  md: { track: 'h-5 w-10', thumb: 'translate-x-5', label: '' },
  lg: { track: 'h-6 w-12', thumb: 'translate-x-6', label: 'text-lg' },
  xl: { track: 'h-7 w-14', thumb: 'translate-x-7', label: 'text-xl' },
};

const switchColorStyles = {
  primary: {
    focus: 'peer-focus-visible:ring-bg-primary-emphasis/35',
    checked: 'bg-bg-primary-emphasis',
  },
  neutral: {
    focus: 'peer-focus-visible:ring-bg-neutral-emphasis/35',
    checked: 'bg-bg-neutral-emphasis',
  },
  success: {
    focus: 'peer-focus-visible:ring-bg-success-emphasis/35',
    checked: 'bg-bg-success-emphasis',
  },
  warning: {
    focus: 'peer-focus-visible:ring-bg-warning-emphasis/35',
    checked: 'bg-bg-warning-emphasis',
  },
  danger: {
    focus: 'peer-focus-visible:ring-bg-danger-emphasis/35',
    checked: 'bg-bg-danger-emphasis',
  },
};

export const Switch = primitiveComponent<'input', SwitchProps, 'role'>((props, ref) => {
  const {
    color = 'primary',
    size = 'md',
    spacing = '0.5em',
    disabled,
    readOnly,
    checked,
    defaultChecked = false,
    value,
    onChange,
    children,
    className,
    ...rest
  } = props;

  const [state, setState] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      setState(event.target.checked);
    },
    [readOnly, disabled, setState],
  );

  useFormReset({
    ref: inputRef,
    handler: () => {
      setState(defaultChecked);
    },
  });

  const sizeStyle = switchSizeStyles[size];
  const colorStyle = switchColorStyles[color];

  const refs = useMergedRefs(inputRef, ref);

  return (
    <label
      style={
        {
          '--spacing-var': `${spacing}`,
        } as CSSProperties
      }
      className={cx(
        'relative inline-flex items-center gap-[--spacing-var]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        className={'peer sr-only'}
        value={value}
        type="checkbox"
        ref={refs}
        checked={state}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        role={'switch'}
        {...rest}
      />
      <span
        className={cx(
          'inline-flex shrink-0 justify-start rounded-full p-[2px] transition-colors',
          'peer-focus-visible:ring',
          colorStyle.focus,
          sizeStyle.track,
          state ? colorStyle.checked : 'bg-bg-muted',
          disabled && 'opacity-50',
        )}
      >
        <span
          className={cx(
            'aspect-square h-full rounded-[inherit] bg-bg-default transition-transform',
            state && sizeStyle.thumb,
          )}
        />
      </span>
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}
