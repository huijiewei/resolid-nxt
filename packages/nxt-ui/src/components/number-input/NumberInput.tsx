import { __DEV__, ariaAttr, clamp, isNumber } from '@resolid/nxt-utils';
import type { ChangeEvent, FocusEvent, ForwardedRef, KeyboardEvent, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import { assignRef, useControllableState, useEventListener, useFocus, useFormReset, useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { inputGroupStyle, inputSizeStyles } from '../input/Input.style';
import type { InputGroupContext } from '../input/InputGroupContext';
import { useInputGroup } from '../input/InputGroupContext';
import { NumberInputControl } from './NumberInputControl';

export type NumberInputHandlers = {
  increment: () => void;
  decrement: () => void;
};

export type NumberInputProps = Partial<InputGroupContext> & {
  /**
   * Value
   */
  value?: number;

  /**
   * Default value
   */
  defaultValue?: number;

  /**
   * Prefix
   */
  prefix?: ReactNode;

  /**
   * Step
   * @default 1
   */
  step?: number;

  /**
   * Min
   * @default -Infinity
   */
  min?: number;

  /**
   * Max
   * @default Infinity
   */
  max?: number;

  /**
   * Precision
   * @default 0
   */
  precision?: number;

  /**
   * Format
   */
  format?: (value: string) => string;

  /**
   * Parse
   */
  parse?: (value: string) => string;

  /**
   * Mouse Wheel
   * @default false
   */
  mouseWheel?: boolean;

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
  onChange?: (value: number | undefined) => void;

  /**
   * Hide Controls
   * @default false
   */
  hideControls?: boolean;

  /**
   * Controls Ref
   */
  controlsRef?: ForwardedRef<NumberInputHandlers | undefined>;

  /**
   * The native HTML size attribute to be passed to the input
   */
  htmlSize?: number;

  /**
   * Placeholder text
   */
  placeholder?: string;
};

const numberInputSize = {
  xs: { input: 'pr-3', control: 'w-4 text-[0.75em]' },
  sm: { input: 'pr-4', control: 'w-5 text-[0.875em]' },
  md: { input: 'pr-4', control: 'w-5' },
  lg: { input: 'pr-5', control: 'w-6' },
  xl: { input: 'pr-5', control: 'w-6' },
};

export const NumberInput = primitiveComponent<'input', NumberInputProps>((props, ref) => {
  const group = useInputGroup();

  const {
    size = group?.size ?? 'md',
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    className,
    value,
    defaultValue,
    step = 1,
    min,
    max,
    precision,
    mouseWheel = false,
    parse = (value) => value,
    format = (value) => value,
    onChange,
    onBlur,
    hideControls = false,
    controlsRef,
    prefix,
    htmlSize,
    placeholder,
    ...rest
  } = props;

  const minValue = isNumber(min) ? min : -Infinity;
  const maxValue = isNumber(max) ? max : Infinity;
  const numPrecision = precision ?? step.toString().split('.')[1]?.length ?? 0;

  const [state, setState] = useControllableState<number | undefined>({
    value,
    defaultValue: defaultValue,
    onChange,
  });

  const [inputValue, setInputValue] = useState(isNumber(state) ? state.toFixed(numPrecision) : '');

  const inputRef = useRef<HTMLInputElement>(null);
  const [focusRef, focused] = useFocus<HTMLInputElement>();

  const refs = useMergedRefs(inputRef, focusRef, ref);

  useFormReset({
    ref: inputRef,
    handler: () => {
      setState(defaultValue);
      setInputValue(isNumber(defaultValue) ? defaultValue.toFixed(numPrecision) : '');
    },
  });

  const update = useCallback(
    (next: number | undefined) => {
      if (next == state) {
        return;
      }

      setState(next);
    },
    [state, setState],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if ((event.nativeEvent as InputEvent).isComposing) {
        return;
      }

      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }

      const value = event.target.value;
      const parsed = parse(value);

      setInputValue(parsed);

      if (value == '' || value == '-') {
        update(undefined);
      } else {
        const number = parseFloat(parsed);

        if (!Number.isNaN(number)) {
          update(number);
        }
      }
    },
    [disabled, parse, readOnly, update],
  );

  const increment = useCallback(
    (incrementStep = step) => {
      if (state == undefined) {
        update(min || 0);
        setInputValue(min != undefined ? min.toFixed(numPrecision) : '0');
      } else {
        const value = clamp(state + incrementStep, [minValue, maxValue]).toFixed(numPrecision);

        update(parseFloat(value));
        setInputValue(value);
      }

      inputRef.current?.focus();
    },
    [maxValue, min, minValue, numPrecision, state, step, update],
  );

  const decrement = useCallback(
    (decrementStep = step) => {
      if (state == undefined) {
        update(min || 0);
        setInputValue(min != undefined ? min.toFixed(numPrecision) : '0');
      } else {
        const value = clamp(state - decrementStep, [minValue, maxValue]).toFixed(numPrecision);

        update(parseFloat(value));
        setInputValue(value);
      }

      inputRef.current?.focus();
    },
    [maxValue, min, minValue, numPrecision, state, step, update],
  );

  assignRef(controlsRef, { increment, decrement });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.nativeEvent.isComposing) {
        return;
      }

      if (
        event.key != null &&
        event.key.length == 1 &&
        !(event.ctrlKey || event.altKey || event.metaKey) &&
        !/^[Ee0-9+\-.]$/.test(event.key)
      ) {
        event.preventDefault();
      }

      if (event.key == 'ArrowUp') {
        event.preventDefault();
        increment((event.metaKey || event.ctrlKey ? 0.1 : event.shiftKey ? 10 : 1) * step);
      }

      if (event.key == 'ArrowDown') {
        event.preventDefault();
        decrement((event.metaKey || event.ctrlKey ? 0.1 : event.shiftKey ? 10 : 1) * step);
      }

      if (event.key == 'Home') {
        event.preventDefault();
        update(min);
      }

      if (event.key == 'End') {
        event.preventDefault();
        update(max);
      }
    },
    [decrement, increment, max, min, step, update],
  );

  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setInputValue('');
        update(undefined);
      } else {
        const parsed = parse(event.target.value[0] == '.' ? `0${event.target.value}` : event.target.value);
        const value = clamp(parseFloat(parsed), [minValue, maxValue]);

        if (!Number.isNaN(value)) {
          setInputValue(value.toFixed(numPrecision));
          update(parseFloat(value.toFixed(numPrecision)));
        } else {
          setInputValue(state != undefined ? state.toFixed(numPrecision) : '');
        }
      }

      onBlur && onBlur(event);
    },
    [maxValue, minValue, numPrecision, onBlur, parse, state, update],
  );

  useEventListener(
    'wheel',
    (event) => {
      if (!mouseWheel || !focused) {
        return;
      }

      event.preventDefault();

      const direction = Math.sign(event.deltaY);

      if (direction == -1) {
        increment();
      } else if (direction == 1) {
        decrement();
      }
    },
    inputRef,
    { passive: false },
  );

  const formattedValue = format(inputValue);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx(
        'relative isolate inline-flex items-center rounded border bg-bg-default pr-0 transition-colors',
        invalid && !focused && 'border-border-invalid',
        disabled && 'cursor-not-allowed bg-bg-subtlest opacity-50',
        !disabled && !invalid && !focused && 'hover:z-[2] hover:border-border-hovered',
        !disabled && focused && 'z-[1] border-bg-primary-emphasis ring-1 ring-bg-primary-emphasis',
        fullWidth && 'w-full',
        inputSizeStyles(!!prefix, false)[size],
        group && inputGroupStyle,
        className,
      )}
      tabIndex={-1}
      onClick={() => {
        !focused && inputRef.current?.focus();
      }}
    >
      {prefix && (
        <div className={cx('whitespace-nowrap text-fg-muted', size == 'xs' || size == 'sm' ? 'mr-1' : 'mr-2')}>
          {prefix}
        </div>
      )}
      <input
        ref={refs}
        className={cx(
          'resize-none appearance-none border-none bg-transparent p-0 text-left outline-none disabled:cursor-not-allowed',
          !hideControls && numberInputSize[size].input,
        )}
        type={'text'}
        inputMode={'decimal'}
        role={'spinbutton'}
        aria-valuemin={min}
        aria-valuemax={max}
        autoComplete={'off'}
        autoCorrect={'off'}
        aria-invalid={ariaAttr(invalid)}
        aria-readonly={ariaAttr(readOnly)}
        aria-required={ariaAttr(required)}
        aria-disabled={ariaAttr(disabled)}
        aria-valuenow={state}
        aria-valuetext={formattedValue != '' ? formattedValue : undefined}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={handleInputBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={formattedValue}
        size={htmlSize}
        placeholder={placeholder}
        {...rest}
      />
      {!hideControls && (
        <div className={cx('absolute right-0 flex h-full flex-col gap-px', numberInputSize[size].control)}>
          <NumberInputControl
            stepper={'increment'}
            onClick={(event) => {
              event.stopPropagation();
              increment();
            }}
            disabled={disabled || (state ?? 0) >= maxValue}
          />
          <NumberInputControl
            stepper={'decrement'}
            onClick={(event) => {
              event.stopPropagation();
              decrement();
            }}
            disabled={disabled || (state ?? 0) <= minValue}
          />
        </div>
      )}
    </div>
  );
});

if (__DEV__) {
  NumberInput.displayName = 'NumberInput';
}
