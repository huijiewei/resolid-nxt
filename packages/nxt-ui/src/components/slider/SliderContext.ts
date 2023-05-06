import type { ReactNode } from 'react';
import { createContext } from '../../primitives';
import type { Color, Size } from '../../utils/types';

export type SliderValue = number | [number, number];

export type SliderBaseProps = {
  /**
   * The minimum allowed value of the slider. Cannot be greater than max.
   * @default 0
   */
  min?: number;

  /**
   * The maximum allowed value of the slider. Cannot be less than min.
   * @default 100
   */
  max?: number;

  /**
   * The step in which increments/decrements have to be made
   * @default 1
   */
  step?: number;

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Reverse
   * @default false
   */
  reverse?: boolean;

  /**
   * Vertical
   * @default false
   */
  vertical?: boolean;

  /**
   * Ticks
   * @default false
   */
  ticks?: boolean | number[];

  /**
   * Masks
   */
  marks?: { value: number; label?: ReactNode }[];

  /**
   * The size of the Slider
   * @default 'md'
   */
  size?: Size;

  /**
   * Color
   * @default 'primary'
   */
  color?: Color;
};

type SliderContext = Required<Omit<SliderBaseProps, 'marks'>> & Pick<SliderBaseProps, 'marks'>;

const [SliderProvider, useSlider] = createContext<SliderContext>({
  strict: true,
  name: 'SliderContext',
});

export { SliderProvider, useSlider };
export { SliderValueProvider, useSliderValue };
export { SliderThumbProvider, useSliderThumb };

type SliderValueContext = {
  value: SliderValue;
  onChange: (value: SliderValue) => void;
  onChangeEnd: (value: SliderValue) => void;
};

const [SliderValueProvider, useSliderValue] = createContext<SliderValueContext>({
  strict: true,
  name: 'SliderValueContext',
});

type SliderThumbContext = {
  dragging: boolean;
  onThumbMouseDown: (index?: number) => void;
};

const [SliderThumbProvider, useSliderThumb] = createContext<SliderThumbContext>({
  strict: true,
  name: 'SliderThumbContext',
});
