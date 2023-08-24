import { __DEV__, ariaAttr } from '@resolid/nxt-utils';
import type { ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import { useCallback, useRef } from 'react';
import { useControllableState, useFocus, useFormReset, useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { CloseButton } from '../close-button/CloseButton';
import { inputGroupStyle, inputSizeStyles } from './Input.style';
import { useInputGroup, type InputGroupContext } from './InputGroupContext';

export type InputProps = Partial<InputGroupContext> & {
  /**
   * Value
   */
  value?: string | number;

  /**
   * Default Value
   */
  defaultValue?: string | number;

  /**
   * Prefix
   */
  prefix?: ReactNode;

  /**
   * Suffix
   */
  suffix?: ReactNode;

  /**
   * Clearable
   * @default false
   */
  clearable?: boolean;

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;

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
   * ReadOnly
   * @default false
   */
  readOnly?: boolean;

  /**
   * FullWidth
   * @default false
   */
  fullWidth?: boolean;

  /**
   * onChange callback
   */
  onChange?: (value: string | number) => void;

  /**
   * onClear callback
   */
  onClear?: () => void;

  /**
   * onPressEnter callback
   */
  onPressEnter?: () => void;

  /**
   * The native HTML size attribute to be passed to the input
   */
  htmlSize?: number;

  /**
   * Placeholder text
   */
  placeholder?: string;
};

export const Input = primitiveComponent<'input', InputProps>((props, ref) => {
  const group = useInputGroup();

  const {
    size = group?.size ?? 'md',
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    clearable = false,
    className,
    value,
    defaultValue = '',
    onChange,
    onClear,
    onPressEnter,
    prefix,
    suffix,
    htmlSize,
    placeholder,
    ...rest
  } = props;

  const [state, setState] = useControllableState({ value, defaultValue: defaultValue, onChange });

  const inputRef = useRef<HTMLInputElement>(null);
  const [focusRef, focused] = useFocus();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      setState(event.target.value);
    },
    [readOnly, disabled, setState],
  );

  const handleClear = () => {
    setState('');
    onClear?.();
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (event.key == 'Enter') {
        onPressEnter && onPressEnter();
      }
    },
    [onPressEnter],
  );

  const showClearButton = clearable && state;

  const refs = useMergedRefs(inputRef, focusRef, ref);

  useFormReset({
    ref: inputRef,
    handler: () => {
      setState(defaultValue);
    },
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx(
        'relative isolate inline-flex h-fit items-center rounded border bg-bg-default transition-colors',
        invalid && !focused && 'border-border-invalid',
        disabled && 'cursor-not-allowed bg-bg-subtlest opacity-50',
        !disabled && !invalid && !focused && 'hover:z-[2] hover:border-border-hovered',
        !disabled && focused && 'z-[1] border-bg-primary-emphasis ring-1 ring-bg-primary-emphasis',
        fullWidth && 'w-full',
        inputSizeStyles(!!prefix, !!suffix)[size],
        group && inputGroupStyle,
        className,
      )}
      tabIndex={-1}
      onClick={() => {
        !focused && inputRef.current?.focus();
      }}
    >
      {prefix && (
        <div className={cx('whitespace-nowrap text-fg-subtle', size == 'xs' || size == 'sm' ? 'mr-1' : 'mr-2')}>
          {prefix}
        </div>
      )}
      <div className={'relative inline-flex grow items-center'}>
        <input
          ref={refs}
          className={cx(
            'resize-none appearance-none border-none bg-transparent text-left outline-none disabled:cursor-not-allowed',
            showClearButton ? 'w-[calc(100%-1em)]' : 'w-full',
          )}
          size={htmlSize}
          placeholder={placeholder}
          aria-invalid={ariaAttr(invalid)}
          aria-readonly={ariaAttr(readOnly)}
          aria-required={ariaAttr(required)}
          aria-disabled={ariaAttr(disabled)}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={state}
          {...rest}
        />
        {showClearButton && (
          <CloseButton
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
              inputRef.current?.focus();
            }}
            className={cx(
              'absolute rounded-full bg-bg-subtlest p-px',
              size == 'xs' || size == 'sm' ? '-right-1' : '-right-1.5',
            )}
          />
        )}
      </div>
      {suffix && (
        <div className={cx('whitespace-nowrap text-fg-subtle', size == 'xs' || size == 'sm' ? 'ml-1' : 'ml-2')}>
          {suffix}
        </div>
      )}
    </div>
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}
