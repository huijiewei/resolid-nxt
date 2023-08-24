import { __DEV__, ariaAttr } from '@resolid/nxt-utils';
import { useCallback, useRef, type CSSProperties, type ChangeEvent } from 'react';
import { useControllableState, useFormReset, useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { useRadioGroup, type RadioBaseProps } from './RadioGroupContext';

export type RadioProps = RadioBaseProps & {
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
   * onChange callback
   */
  onChange?: (checked: boolean) => void;
};

const radioSizeStyles = {
  xs: { control: 'h-3 w-3', label: 'text-xs' },
  sm: { control: 'h-3.5 w-3.5', label: 'text-sm' },
  md: { control: 'h-4 w-4', label: '' },
  lg: { control: 'h-5 w-5', label: 'text-lg' },
  xl: { control: 'h-6 w-6', label: 'text-xl' },
};

const radioColorStyles = {
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

export const Radio = primitiveComponent<'input', RadioProps>((props, ref) => {
  const group = useRadioGroup();

  const {
    name = group?.name,
    size = group?.size || 'md',
    color = group?.color || 'primary',
    disabled = group?.disabled || false,
    spacing = '0.5em',
    className,
    children,

    value,
    checked,
    defaultChecked = false,
    onChange,
    required = false,
    invalid = false,
    style,
    ...rest
  } = props;

  const [state, setState] = useControllableState({
    value: group ? group.value == value : checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState(event.target.checked);

      group?.onChange(event);
    },
    [group, setState],
  );

  useFormReset({
    ref: inputRef,
    handler: () => {
      group?.onReset();
      setState(defaultChecked);
    },
  });

  const sizeStyle = radioSizeStyles[size];
  const colorStyle = radioColorStyles[color];

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
        name={name}
        className={'peer sr-only'}
        value={value}
        type={'radio'}
        checked={state}
        disabled={disabled}
        aria-disabled={ariaAttr(disabled)}
        required={required}
        onChange={handleChange}
        {...rest}
      />
      <span
        className={cx(
          'inline-flex shrink-0 select-none items-center justify-center rounded-full border-2',
          'peer-focus-visible:ring',
          invalid ? 'border-border-invalid' : state ? colorStyle.border : 'border-bg-muted',
          state ? `${colorStyle.checked} text-fg-emphasized` : 'bg-bg-default',
          disabled && 'opacity-50',
          sizeStyle.control,
          state &&
            `before:relative before:inline-block before:h-1/2 before:w-1/2 before:rounded-[50%] before:bg-current before:content-['']`,
        )}
      />
      {children && <span className={cx(sizeStyle.label, 'leading-none', disabled && 'opacity-50')}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Radio.displayName = 'Radio';
}
