import { Slider, SliderThumb, SliderTrack, type SliderValue } from '@resolid/nxt-ui';
import { useState } from 'react';
import { Heart } from '~/common/icons/Heart';
import { HeartBroken } from '~/common/icons/HeartBroken';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 tablet:flex-row'}>
          <Slider className={'w-full tablet:w-1/2'} defaultValue={10}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
          <Slider className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 tablet:flex-row'}>
  <Slider className={'w-full tablet:w-1/2'} defaultValue={10}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
  <Slider className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
</div>`}
    />
  );
};

export const Status = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 tablet:flex-row'}>
          <Slider disabled className={'w-full tablet:w-1/2'} defaultValue={10}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
          <Slider disabled className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 tablet:flex-row'}>
  <Slider disabled className={'w-full tablet:w-1/2'} defaultValue={10}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
  <Slider disabled className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
</div>`}
    />
  );
};

export const Ticks = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 tablet:flex-row'}>
          <Slider ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]} className={'w-full tablet:w-1/2'} defaultValue={10}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
          <Slider step={2} ticks className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 tablet:flex-row'}>
  <Slider
    ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
    className={'w-full tablet:w-1/2'}
    defaultValue={10}
  >
    <SliderTrack />
    <SliderThumb />
  </Slider>
  <Slider step={2} ticks className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
</div>`}
    />
  );
};

export const Marks = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 tablet:flex-row'}>
          <Slider
            marks={[
              { value: 0, label: '0%' },
              { value: 50, label: '50%' },
              { value: 100, label: '100%' },
            ]}
            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
            className={'w-full tablet:w-1/2'}
            defaultValue={10}
          >
            <SliderTrack />
            <SliderThumb />
          </Slider>
          <Slider
            marks={[
              { value: 0, label: '0KM' },
              { value: 25, label: '25KM' },
              { value: 50, label: '50KM' },
              { value: 75, label: '75KM' },
              { value: 100, label: '100KM' },
            ]}
            ticks
            color={'success'}
            className={'w-full tablet:w-1/2'}
            defaultValue={[20, 60]}
          >
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 tablet:flex-row'}>
  <Slider
    marks={[
      { value: 0, label: '0%' },
      { value: 50, label: '50%' },
      { value: 100, label: '100%' }
    ]}
    ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
    className={'w-full tablet:w-1/2'}
    defaultValue={10}
  >
    <SliderTrack />
    <SliderThumb />
  </Slider>
  <Slider step={2} ticks className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
</div>`}
    />
  );
};

const EventDemo = () => {
  const [changeValue, setChangeValue] = useState<SliderValue>();
  const [changeEndValue, setChangeEndValue] = useState<SliderValue>();
  const [changeRangeValue, setChangeRangeValue] = useState<SliderValue>();
  const [changeEndRangeValue, setChangeEndRangeValue] = useState<SliderValue>();

  return (
    <div className={'flex flex-col gap-5 tablet:flex-row'}>
      <div className={'flex w-full flex-col gap-3 tablet:w-1/2'}>
        <div>
          <p>
            onChange value: <strong>{changeValue}</strong>
          </p>
          <p>
            onChangeEnd value: <strong>{changeEndValue}</strong>
          </p>
        </div>
        <Slider
          className={'w-full'}
          value={changeValue}
          onChange={(v) => setChangeValue(v)}
          onChangeEnd={(v) => setChangeEndValue(v)}
          defaultValue={20}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </div>
      <div className={'flex w-full  flex-col gap-3 tablet:w-1/2'}>
        <div>
          <p>
            onChange value: <strong>{Array.isArray(changeRangeValue) && changeRangeValue.join(', ')}</strong>
          </p>
          <p>
            onChangeEnd value: <strong>{Array.isArray(changeEndRangeValue) && changeEndRangeValue.join(', ')}</strong>
          </p>
        </div>
        <Slider
          color={'success'}
          className={'w-full'}
          value={changeRangeValue}
          onChange={(v) => setChangeRangeValue(v)}
          onChangeEnd={(v) => setChangeEndRangeValue(v)}
          defaultValue={[20, 60]}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </div>
    </div>
  );
};

export const Event = () => {
  return (
    <DemoExample
      preview={EventDemo}
      snippet={`const EventDemo = () => {
  const [changeValue, setChangeValue] = useState();
  const [changeEndValue, setChangeEndValue] = useState();
  const [changeRangeValue, setChangeRangeValue] = useState();
  const [changeEndRangeValue, setChangeEndRangeValue] = useState();

  return (
    <div className={'flex flex-col gap-5 tablet:flex-row'}>
      <div className={'flex w-full flex-col gap-3 tablet:w-1/2'}>
        <div>
          <p>
            onChange value: <strong>{changeValue}</strong>
          </p>
          <p>
            onChangeEnd value: <strong>{changeEndValue}</strong>
          </p>
        </div>
        <Slider
          className={'w-full'}
          value={changeValue}
          onChange={(v) => setChangeValue(v)}
          onChangeEnd={(v) => setChangeEndValue(v)}
          defaultValue={20}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </div>
      <div className={'flex w-full  flex-col gap-3 tablet:w-1/2'}>
        <div>
          <p>
            onChange value: <strong>{changeRangeValue && changeRangeValue.join(', ')}</strong>
          </p>
          <p>
            onChangeEnd value: <strong>{changeEndRangeValue && changeEndRangeValue.join(', ')}</strong>
          </p>
        </div>
        <Slider
          color={'success'}
          className={'w-full'}
          value={changeRangeValue}
          onChange={(v) => setChangeRangeValue(v)}
          onChangeEnd={(v) => setChangeEndRangeValue(v)}
          defaultValue={[20, 60]}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </div>
    </div>
  );
};`}
    />
  );
};

export const Reverse = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 tablet:flex-row'}>
          <Slider
            reverse
            marks={[
              { value: 0, label: '0%' },
              { value: 50, label: '50%' },
              { value: 100, label: '100%' },
            ]}
            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
            className={'w-full tablet:w-1/2'}
            defaultValue={30}
          >
            <SliderTrack />
            <SliderThumb />
          </Slider>
          <Slider
            reverse
            marks={[
              { value: 0, label: '0%' },
              { value: 50, label: '50%' },
              { value: 100, label: '100%' },
            ]}
            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
            className={'w-full tablet:w-1/2'}
            defaultValue={[20, 60]}
          >
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 tablet:flex-row'}>
  <Slider
    reverse
    marks={[
      { value: 0, label: '0%' },
      { value: 50, label: '50%' },
      { value: 100, label: '100%' }
    ]}
    ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
    className={'w-full tablet:w-1/2'}
    defaultValue={30}
  >
    <SliderTrack />
    <SliderThumb />
  </Slider>
  <Slider
    reverse
    marks={[
      { value: 0, label: '0%' },
      { value: 50, label: '50%' },
      { value: 100, label: '100%' }
    ]}
    ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
    className={'w-full tablet:w-1/2'}
    defaultValue={[20, 60]}
  >
    <SliderTrack />
    <SliderThumb />
  </Slider>
</div>`}
    />
  );
};

export const Vertical = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex gap-10'}>
          <Slider vertical className={'h-52'} defaultValue={10}>
            <SliderTrack />
            <SliderThumb />
          </Slider>

          <Slider
            color={'success'}
            vertical
            marks={[
              { value: 0, label: '0%' },
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
            ]}
            className={'h-52'}
            defaultValue={[20, 60]}
          >
            <SliderTrack />
            <SliderThumb />
          </Slider>
          <Slider ticks vertical className={'h-52'} defaultValue={[20, 60]}>
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex gap-10'}>
  <Slider vertical className={'h-52'} defaultValue={10}>
    <SliderTrack />
    <SliderThumb />
  </Slider>

  <Slider
    color={'success'}
    vertical
    marks={[
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' }
    ]}
    className={'h-52'}
    defaultValue={[20, 60]}
  >
    <SliderTrack />
    <SliderThumb />
  </Slider>
  <Slider ticks vertical className={'h-52'} defaultValue={[20, 60]}>
    <SliderTrack />
    <SliderThumb />
  </Slider>
</div>`}
    />
  );
};

export const Custom = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-5 tablet:flex-row'}>
          <Slider ticks className={'w-full tablet:w-1/2'} defaultValue={10}>
            <SliderTrack />
            <SliderThumb className={'border p-0.5 text-sm'}>
              <Heart />
            </SliderThumb>
          </Slider>
          <Slider className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
            <SliderTrack />
            <SliderThumb className={'border p-0.5 text-sm'}>
              {(index) => (index == 0 ? <Heart /> : <HeartBroken />)}
            </SliderThumb>
          </Slider>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-5 tablet:flex-row'}>
  <Slider ticks className={'w-full tablet:w-1/2'} defaultValue={10}>
    <SliderTrack />
    <SliderThumb className={'border p-0.5 text-sm'}>
      <Heart />
    </SliderThumb>
  </Slider>
  <Slider className={'w-full tablet:w-1/2'} defaultValue={[20, 60]}>
    <SliderTrack />
    <SliderThumb className={'border p-0.5 text-sm'}>
      {(index) => (index === 0 ? <Heart /> : <HeartBroken />)}
    </SliderThumb>
  </Slider>
</div>`}
    />
  );
};
