import { __DEV__, clamp, cx } from '@resolid/nxt-utils';
import { useCallback, useMemo } from 'react';
import { primitiveComponent } from '../../primitives';
import { SliderColorStyles } from './Slider.style';
import { useSlider, useSliderValue } from './SliderContext';

const generateTicks = (count: number, [begin, end]: [number, number]): number[] => {
  const e10 = Math.sqrt(50);
  const e5 = Math.sqrt(10);
  const e2 = Math.sqrt(2);

  let n;
  let ticks;

  let start = begin;
  let stop = end;

  if (start === stop && count > 0) {
    return [start];
  }

  const increment = (stop - start) / Math.max(0, count);
  const power = Math.floor(Math.log(increment) / Math.LN10);
  const error = increment / 10 ** power;

  let step =
    power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * 10 ** power
      : -(10 ** -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);

  if (step === 0 || !Number.isFinite(step)) {
    return [];
  }

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));

    for (let i = 0; i < n; i += 1) {
      ticks[i] = (start + i) * step;
    }
  } else {
    step = -step;
    start = Math.ceil(start * step);
    stop = Math.floor(stop * step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));

    for (let i = 0; i < n; i += 1) {
      ticks[i] = (start + i) / step;
    }
  }

  return ticks;
};

export const SliderTrack = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;

  const { color, step, ticks, marks, min, reverse, vertical, max, disabled } = useSlider();
  const { value } = useSliderValue();

  const colorStyle = SliderColorStyles[color].track;

  const tickMemo = useMemo(() => {
    if (Array.isArray(ticks)) {
      return ticks;
    }

    if (ticks) {
      const count = clamp((max - min) / step, [5, 20]);

      return generateTicks(count, [min, max]).filter((t) => t != min && t != max);
    }

    return undefined;
  }, [max, min, step, ticks]);

  const inValueRange = useCallback(
    (position: number) => {
      return Array.isArray(value)
        ? position >= value[0] && position <= value[1]
        : reverse
        ? value == max
          ? position > value
          : position >= value
        : value == max
        ? position <= value
        : position < value;
    },
    [reverse, value, max],
  );

  const trackStyle = useMemo(
    () =>
      Array.isArray(value)
        ? {
            [vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left']: (value[0] / max) * 100 + '%',
            [vertical ? 'height' : 'width']: ((value[1] - value[0]) / max) * 100 + '%',
          }
        : { [vertical ? 'height' : 'width']: reverse ? ((max - value) / max) * 100 + '%' : (value / max) * 100 + '%' },
    [max, reverse, value, vertical],
  );

  const translateStyle = (value: number) => {
    return value != min && value != max
      ? vertical
        ? '-translate-y-1/2'
        : '-translate-x-1/2'
      : reverse
      ? value == min && (vertical ? '-translate-y-full' : '-translate-x-full')
      : value == max && (vertical ? '-translate-y-full' : '-translate-x-full');
  };

  return (
    <>
      <div
        ref={ref}
        className={cx('relative rounded bg-bg-subtle', vertical ? 'h-full w-1' : 'h-1 w-full', className)}
        {...rest}
      >
        <div
          className={cx('absolute rounded', vertical ? 'w-full' : 'h-full', disabled ? 'bg-bg-muted' : colorStyle.bg)}
          style={trackStyle}
        />
        {tickMemo && (
          <div className={vertical ? 'h-full' : 'w-full'}>
            {tickMemo.map((tick) => {
              const tickTranslate = translateStyle(tick);

              return (
                <div
                  key={tick}
                  className={cx(
                    'absolute',
                    inValueRange(tick) ? colorStyle.bg : 'bg-bg-subtle',
                    vertical ? '-left-3/4 h-px w-1.5' : '-top-3/4 h-1.5 w-px',
                    tickTranslate,
                  )}
                  style={{
                    [vertical ? 'top' : 'left']: ((reverse ? max - tick : tick) / max) * 100 + '%',
                  }}
                />
              );
            })}
          </div>
        )}
        {marks && (
          <div className={vertical ? 'h-full' : 'w-full'}>
            {marks.map((mark) => {
              const markTranslate = translateStyle(mark.value);

              return (
                <div
                  key={mark.value}
                  className={cx('absolute z-[2] flex', vertical ? 'flex-col' : 'flex-row')}
                  style={{
                    [vertical ? 'top' : 'left']: ((reverse ? max - mark.value : mark.value) / max) * 100 + '%',
                  }}
                >
                  <div
                    className={cx(
                      'h-2 w-2 rounded-full border-2 bg-bg-default',
                      vertical ? '-translate-x-1/4' : '-translate-y-1/4',
                      inValueRange(mark.value) ? colorStyle.mark : 'border-bg-subtle',
                      markTranslate,
                    )}
                  />
                  {mark.label && (
                    <div
                      className={cx(
                        'absolute text-sm leading-none text-fg-muted',
                        vertical ? 'left-3' : 'top-3',
                        markTranslate,
                      )}
                    >
                      {mark.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
});

if (__DEV__) {
  SliderTrack.displayName = 'SliderTrack';
}
