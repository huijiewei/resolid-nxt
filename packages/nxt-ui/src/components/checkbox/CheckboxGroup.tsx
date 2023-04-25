import { __DEV__, isInputEvent } from '@resolid/nxt-utils';
import type { PropsWithChildren } from 'react';
import { useCallback, useMemo, type ChangeEvent } from 'react';
import { useControllableState } from '../../hooks';
import { createContext } from '../../primitives';
import type { Color, Size } from '../../utils/types';

export type CheckboxBaseProps = {
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

type CheckboxGroupBaseProps = CheckboxBaseProps & {
  /**
   * Checked value
   */
  value?: (string | number)[];
};

type CheckboxGroupContext = CheckboxGroupBaseProps & {
  onChange?: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
};

const [CheckboxGroupProvider, useCheckboxGroup] = createContext<CheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
});

export { useCheckboxGroup };

export type CheckboxGroupProps = CheckboxGroupBaseProps & {
  /**
   * Default value
   */
  defaultValue?: (string | number)[];

  /**
   * onChange callback
   */
  onChange?: (value: (string | number)[]) => void;
};

export const CheckboxGroup = (props: PropsWithChildren<CheckboxGroupProps>) => {
  const { value, defaultValue = [], onChange, children, size = 'md', color = 'primary', disabled = false } = props;

  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = useCallback(
    (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
      if (!state) {
        return;
      }

      const inputEvent = isInputEvent(eventOrValue);

      const isChecked = inputEvent ? eventOrValue.target.checked : !state.includes(eventOrValue);

      const selectedValue = inputEvent ? eventOrValue.target.value : eventOrValue;

      const nextValue = isChecked
        ? [...state, selectedValue]
        : state.filter((v) => String(v) !== String(selectedValue));

      setState(nextValue);
    },
    [state, setState]
  );

  const group = useMemo(
    () => ({
      size,
      color,
      disabled,
      value: state,
      onChange: handleChange,
    }),
    [size, color, disabled, state, handleChange]
  );

  return <CheckboxGroupProvider value={group}>{children}</CheckboxGroupProvider>;
};

if (__DEV__) {
  CheckboxGroup.displayName = 'CheckboxGroup';
}
