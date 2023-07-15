import { __DEV__, clamp, cx } from '@resolid/nxt-utils';
import { useCallback, useMemo, useRef, useState, type MouseEvent, type TouchEvent } from 'react';
import { useControllableState, useMove } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import {
  SliderProvider,
  SliderThumbProvider,
  SliderValueProvider,
  type SliderBaseProps,
  type SliderValue,
} from './SliderContext';

export type { SliderValue };

export type SliderProps = SliderBaseProps & {
  /**
   * The value of the slider in controlled mode
   */
  value?: SliderValue;

  /**
   * Default value
   */
  defaultValue?: SliderValue;

  /**
   * When the slider value changes (by dragging or clicking)
   */
  onChange?: (value: SliderValue) => void;

  /**
   * When the user is done selecting a new value (by dragging or clicking)
   */
  onChangeEnd?: (value: SliderValue) => void;
};

export const Slider = primitiveComponent<'input', SliderProps>((props, ref) => {
  const {
    className,
    children,
    color = 'primary',
    size = 'md',
    value,
    defaultValue = 0,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    reverse = false,
    vertical = false,
    disabled = false,
    ticks = false,
    marks,
    ...rest
  } = props;

  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const context = useMemo(
    () => ({
      reverse,
      vertical,
      disabled,
      color,
      size,
      step,
      min,
      max,
      ticks,
      marks,
    }),
    [reverse, vertical, disabled, color, size, step, min, max, ticks, marks],
  );

  const valueContext = useMemo(
    () => ({
      value: state,
      onChange: (value: SliderValue) => {
        setState(value);
      },
      onChangeEnd: (value: SliderValue) => {
        onChangeEnd && onChangeEnd(value);
      },
    }),
    [onChangeEnd, setState, state],
  );

  const [thumbIndex, setThumbIndex] = useState<number | undefined>(undefined);

  const valueRef = useRef(state);

  const handleMoveChange = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (!disabled) {
        const dx = (vertical ? y : x) * (max - min);
        const next = (dx != 0 ? Math.round((reverse ? max - dx : dx) / step) * step : reverse ? max : 0) + min;

        const value: SliderValue = Array.isArray(state)
          ? thumbIndex == 1
            ? [state[0], clamp(next, [state[0], max])]
            : [clamp(next, [min, state[1]]), state[1]]
          : clamp(next, [min, max]);

        setState(value);

        valueRef.current = value;
      }
    },
    [disabled, vertical, max, min, reverse, step, state, thumbIndex, setState],
  );

  const [moveRef, active] = useMove(handleMoveChange, { onScrubEnd: () => onChangeEnd?.(valueRef.current) });

  const thumbContext = useMemo(
    () => ({
      dragging: active,
      onThumbMouseDown: (index?: number) => setThumbIndex(index),
    }),
    [active],
  );

  const handleTrackMouseDownCapture = useCallback(
    (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      if (!Array.isArray(state)) {
        return;
      }

      const element = moveRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();

        const changePosition =
          event.type == 'mousedown'
            ? vertical
              ? (event as MouseEvent).nativeEvent.clientY
              : (event as MouseEvent).nativeEvent.clientX
            : vertical
            ? (event as TouchEvent).nativeEvent.touches[0].clientY
            : (event as TouchEvent).nativeEvent.touches[0].clientX;

        const rw = vertical ? rect.height : rect.width;

        const dx = (Math.min(Math.max(changePosition - (vertical ? rect.top : rect.left), 0), rw) / rw) * (max - min);

        const changeValue = (dx != 0 ? Math.round((reverse ? max - dx : dx) / step) * step : reverse ? max : 0) + min;

        const nearestHandle = Math.abs(state[0] - changeValue) > Math.abs(state[1] - changeValue) ? 1 : 0;

        setThumbIndex(nearestHandle);
      }
    },
    [max, min, moveRef, reverse, state, step, vertical],
  );

  return (
    <SliderProvider value={context}>
      <SliderValueProvider value={valueContext}>
        <SliderThumbProvider value={thumbContext}>
          <div
            ref={moveRef}
            tabIndex={-1}
            className={cx(
              'relative flex touch-none select-none items-center outline-none',
              vertical ? 'w-fit touch-pan-y px-3' : 'h-fit touch-pan-x py-3',
              marks && (vertical ? 'my-2 mr-3' : 'mx-2 mb-3'),
              className,
            )}
            onTouchStartCapture={handleTrackMouseDownCapture}
            onTouchEndCapture={() => {
              setThumbIndex(undefined);
            }}
            onMouseDownCapture={handleTrackMouseDownCapture}
            onMouseUpCapture={() => {
              setThumbIndex(undefined);
            }}
          >
            {children}
            {Array.isArray(state) ? (
              <>
                <input
                  tabIndex={-1}
                  type={'hidden'}
                  readOnly
                  value={state[0]}
                  className={'sr-only'}
                  ref={ref}
                  {...rest}
                />
                <input
                  tabIndex={-1}
                  type={'hidden'}
                  readOnly
                  value={state[1]}
                  className={'sr-only'}
                  ref={ref}
                  {...rest}
                />
              </>
            ) : (
              <input tabIndex={-1} type={'hidden'} readOnly value={state} className={'sr-only'} ref={ref} {...rest} />
            )}
          </div>
        </SliderThumbProvider>
      </SliderValueProvider>
    </SliderProvider>
  );
});

if (__DEV__) {
  Slider.displayName = 'Slider';
}
