import { __DEV__, ariaAttr } from '@resolid/nxt-utils';
import type { ReactElement } from 'react';
import { cloneElement, useCallback, useRef, type CSSProperties, type ChangeEvent } from 'react';
import { useControllableState, useFormReset, useIsomorphicEffect, useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { useCheckboxGroup, type CheckboxBaseProps } from './CheckboxGroupContext';
import { CheckboxIcon } from './CheckboxIcon';

export type CheckboxProps = CheckboxBaseProps & {
  /**
   * Value
   */
  value?: string | number;

  /**
   * Required
   * @default false
   */
  required?: boolean;

  /**
   * Invalid
   * @default false
   */
  invalid?: boolean;

  /**
   * Spacing
   * @default '0.5em'
   */
  spacing?: string | number;

  /**
   * Indeterminate
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Icon
   * @default CheckboxIcon
   */
  icon?: ReactElement;

  /**
   * onChange callback
   */
  onChange?: (checked: boolean) => void;
};

const checkboxSizeStyles = {
  xs: { control: 'h-3 w-3', label: 'text-xs', icon: 'text-[0.45rem]' },
  sm: { control: 'h-3.5 w-3.5', label: 'text-sm', icon: 'text-[0.5rem]' },
  md: { control: 'h-4 w-4', label: '', icon: 'text-[0.625rem]' },
  lg: { control: 'h-5 w-5', label: 'text-lg', icon: 'text-[0.75rem]' },
  xl: { control: 'h-6 w-6', label: 'text-xl', icon: 'text-[0.875rem]' },
};

const checkboxColorStyles = {
  primary: {
    focus: 'peer-focus-visible:ring-bg-primary-emphasis/35',
    checked: 'bg-bg-primary-emphasis',
    border: 'border-bg-primary-emphasis',
  },
  neutral: {
    focus: 'peer-focus-visible:ring-bg-neutral-emphasis/35',
    checked: 'bg-bg-neutral-emphasis',
    border: 'border-bg-neutral-emphasis',
  },
  success: {
    focus: 'peer-focus-visible:ring-bg-success-emphasis/35',
    checked: 'bg-bg-success-emphasis',
    border: 'border-bg-success-emphasis',
  },
  warning: {
    focus: 'peer-focus-visible:ring-bg-warning-emphasis/35',
    checked: 'bg-bg-warning-emphasis',
    border: 'border-bg-warning-emphasis',
  },
  danger: {
    focus: 'peer-focus-visible:ring-bg-danger-emphasis/35',
    checked: 'bg-bg-danger-emphasis',
    border: 'border-bg-danger-emphasis',
  },
};

export const Checkbox = primitiveComponent<'input', CheckboxProps>((props, ref) => {
  const group = useCheckboxGroup();

  const {
    size = group?.size || 'md',
    color = group?.color || 'primary',
    disabled = group?.disabled || false,
    spacing = '0.5em',
    className,
    children,
    icon = <CheckboxIcon />,

    value,
    checked,
    defaultChecked = false,
    indeterminate,
    onChange,
    required = false,
    invalid = false,
    style,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useControllableState({
    value: group?.value && value ? group.value.includes(value) : checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState(indeterminate ? true : event.target.checked);

      group?.onChange(event);
    },
    [group, indeterminate, setState],
  );

  useIsomorphicEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  useFormReset({
    ref: inputRef,
    handler: () => {
      setState(defaultChecked);
      group?.onReset();
    },
  });

  useIsomorphicEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const notInSync = inputRef.current.checked !== state;

    if (notInSync) {
      setState(inputRef.current.checked);
    }
  }, [setState, state]);

  const sizeStyle = checkboxSizeStyles[size];
  const colorStyle = checkboxColorStyles[color];

  const clonedIcon = cloneElement(icon, {
    indeterminate: indeterminate,
    className: cx(sizeStyle.icon, 'transition-opacity', state || indeterminate ? 'opacity-1' : 'opacity-0'),
  });

  const refs = useMergedRefs(inputRef, ref);

  return (
    <label
      style={
        {
          '--spacing-var': `${spacing}`,
          ...style,
        } as CSSProperties
      }
      className={cx(
        'relative inline-flex items-center gap-[--spacing-var]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        ref={refs}
        className={'peer sr-only'}
        value={value}
        type="checkbox"
        checked={state}
        disabled={disabled}
        aria-disabled={ariaAttr(disabled)}
        required={required}
        aria-invalid={ariaAttr(invalid)}
        onChange={handleChange}
        {...rest}
      />
      <div
        className={cx(
          'inline-flex shrink-0 select-none items-center justify-center rounded border-2 transition-colors',
          'peer-focus-visible:ring',
          invalid ? 'border-border-invalid' : state || indeterminate ? colorStyle.border : 'border-bg-muted',
          state || indeterminate ? `${colorStyle.checked} text-fg-emphasized` : 'bg-bg-default',
          disabled && 'opacity-50',
          sizeStyle.control,
        )}
      >
        {clonedIcon}
      </div>
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}
