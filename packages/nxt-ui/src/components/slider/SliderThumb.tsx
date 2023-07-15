import { __DEV__, ariaAttr, clamp, cx, runIfFn } from '@resolid/nxt-utils';
import { useCallback, type KeyboardEvent, type ReactNode } from 'react';
import { useFocus, useHover, useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import type { Color } from '../../utils/types';
import { Tooltip } from '../tooltip/Tooltip';
import { SliderColorStyles } from './Slider.style';
import { useSlider, useSliderThumb, useSliderValue, type SliderValue } from './SliderContext';

type SliderThumbButtonProps = {
  value: number;
  max: number;
  min: number;
  color: Color;
  vertical: boolean;
  reverse: boolean;
  index?: number;
} & SliderThumbChild;

type SliderThumbChild = {
  children?: ReactNode | ((index: number | undefined) => ReactNode);
};

const SliderThumbButton = primitiveComponent<'button', SliderThumbButtonProps>((props, ref) => {
  const { className, disabled, color, value, max, min, vertical, reverse, children, index, ...rest } = props;

  const [focusRef, focus] = useFocus();
  const [hoverRef, hover] = useHover();

  const refs = useMergedRefs(ref, hoverRef, focusRef);
  const { dragging, onThumbMouseDown } = useSliderThumb();

  const colorStyle = SliderColorStyles[color];

  return (
    <Tooltip opened={focus || hover || dragging} placement={vertical ? 'right' : 'top'} content={value}>
      <button
        disabled={disabled}
        tabIndex={0}
        aria-disabled={ariaAttr(disabled)}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        role={'slider'}
        ref={refs}
        onMouseDown={(event) => {
          event.stopPropagation();
          onThumbMouseDown(index);
        }}
        onTouchStart={(event) => {
          event.stopPropagation();
          onThumbMouseDown(index);
        }}
        onClick={(event) => event.stopPropagation()}
        className={cx(
          'absolute z-[2] touch-none select-none rounded-full bg-white outline-none transition-transform',
          `focus-visible:z-10 focus-visible:ring disabled:border-bg-muted`,
          colorStyle.thumb,
          !disabled && 'hover:scale-110',
          vertical ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
          vertical
            ? reverse
              ? 'translate-y-1/2'
              : '-translate-y-1/2'
            : reverse
            ? 'translate-x-1/2'
            : '-translate-x-1/2',
          !children && 'aspect-square border-3',
          !children && (vertical ? 'w-1/2' : 'h-1/2 w-fit'),
          className,
        )}
        {...rest}
      >
        {runIfFn(children, index)}
      </button>
    </Tooltip>
  );
});

export const SliderThumb = primitiveComponent<'button', SliderThumbChild, 'value' | 'color'>((props, ref) => {
  const { className, ...rest } = props;

  const { max, min, color, step, reverse, disabled, vertical } = useSlider();
  const { value, onChange, onChangeEnd } = useSliderValue();

  const handelKeyDown = useCallback(
    (event: KeyboardEvent, index?: number) => {
      if (event.code == 'ArrowDown' || event.key == 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();

        const next: SliderValue = Array.isArray(value)
          ? index == 0
            ? [clamp(reverse ? value[0] - step : value[0] + step, [min, value[1]]), value[1]]
            : [value[0], clamp(reverse ? value[1] - step : value[1] + step, [value[0], max])]
          : clamp(reverse ? value - step : value + step, [min, max]);

        onChange(next);
        onChangeEnd(next);

        return;
      }

      if (event.code == 'ArrowUp' || event.key == 'ArrowLeft') {
        event.preventDefault();
        event.stopPropagation();

        const next: SliderValue = Array.isArray(value)
          ? index == 0
            ? [clamp(reverse ? value[0] + step : value[0] - step, [min, value[1]]), value[1]]
            : [value[0], clamp(reverse ? value[1] + step : value[1] - step, [value[0], max])]
          : clamp(reverse ? value + step : value - step, [min, max]);

        onChange(next);
        onChangeEnd(next);

        return;
      }

      if (event.code == 'Home') {
        event.preventDefault();
        event.stopPropagation();

        const next: SliderValue = Array.isArray(value) ? (index == 0 ? [min, value[1]] : [value[0], value[0]]) : min;

        onChange(next);
        onChangeEnd(next);
      }

      if (event.code == 'End') {
        event.preventDefault();
        event.stopPropagation();

        const next: SliderValue = Array.isArray(value) ? (index == 0 ? [value[1], value[1]] : [value[0], max]) : max;

        onChange(next);
        onChangeEnd(next);
      }
    },
    [value, reverse, step, min, max, onChange, onChangeEnd],
  );

  const styleAttr = vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left';

  if (Array.isArray(value)) {
    return (
      <>
        <SliderThumbButton
          ref={ref}
          className={className}
          disabled={disabled}
          value={value[0]}
          max={value[1]}
          index={0}
          min={min}
          vertical={vertical}
          reverse={reverse}
          style={{
            [styleAttr]: (value[0] / max) * 100 + '%',
          }}
          onKeyDown={(event) => {
            handelKeyDown(event, 0);
          }}
          color={color}
          {...rest}
        />
        <SliderThumbButton
          ref={ref}
          className={className}
          disabled={disabled}
          value={value[1]}
          max={max}
          min={value[0]}
          index={1}
          vertical={vertical}
          reverse={reverse}
          style={{
            [styleAttr]: (value[1] / max) * 100 + '%',
          }}
          onKeyDown={(event) => {
            handelKeyDown(event, 1);
          }}
          color={color}
          {...rest}
        />
      </>
    );
  } else {
    return (
      <SliderThumbButton
        ref={ref}
        className={className}
        disabled={disabled}
        value={value}
        max={max}
        min={min}
        vertical={vertical}
        reverse={reverse}
        style={{
          [styleAttr]: (value / max) * 100 + '%',
        }}
        onKeyDown={(event) => {
          handelKeyDown(event);
        }}
        color={color}
        {...rest}
      />
    );
  }
});

if (__DEV__) {
  SliderThumb.displayName = 'SliderThumb';
}
