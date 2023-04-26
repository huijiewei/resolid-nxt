import { __DEV__, isInputEvent } from '@resolid/nxt-utils';
import { useCallback, useMemo, type ChangeEvent, type PropsWithChildren } from 'react';
import { useControllableState } from '../../hooks';
import { createContext } from '../../primitives';
import type { Color, Size } from '../../utils/types';

export type RadioBaseProps = {
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
   * Disabled
   * @default false
   */
  disabled?: boolean;
};

type RadioGroupBaseProps = RadioBaseProps & {
  /**
   * The name of the input field in a radio
   */
  name?: string;

  /**
   * Value
   */
  value?: string | number;
};

type RadioGroupContextValue = RadioGroupBaseProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
};

const [RadioGroupProvider, useRadioGroup] = createContext<RadioGroupContextValue>({
  name: 'RadioGroupContext',
  strict: false,
});

export { useRadioGroup };

type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * Defaut value
   */
  defaultValue?: string | number;

  /**
   * onChange callback
   */
  onChange?: (value: string | number) => void;
};

export const RadioGroup = (props: PropsWithChildren<RadioGroupProps>) => {
  const { color, size, children, disabled, value, name, defaultValue = '', onChange } = props;

  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
      const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

      setState(nextValue);
    },
    [setState]
  );

  const group = useMemo(
    () => ({
      name,
      size,
      color,
      onChange: handleChange,
      value: state,
      disabled,
    }),
    [name, size, color, handleChange, state, disabled]
  );

  return <RadioGroupProvider value={group}>{children}</RadioGroupProvider>;
};

if (__DEV__) {
  RadioGroup.displayName = 'RadioGroup';
}
