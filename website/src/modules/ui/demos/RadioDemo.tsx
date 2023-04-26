import { Radio, RadioGroup, type RadioProps } from '@resolid/nxt-ui';
import { useState } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<RadioProps>
      componentProps={[
        {
          propName: 'size',
          control: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl'],
          defaultValue: 'md',
        },
        {
          propName: 'color',
          control: 'color',
          options: ['primary', 'neutral', 'success', 'warning', 'danger'],
          defaultValue: 'primary',
        },
        {
          propName: 'disabled',
          control: 'switch',
          defaultValue: false,
        },
        {
          propName: 'invalid',
          control: 'switch',
          defaultValue: false,
        },
        {
          propName: 'required',
          control: 'switch',
          defaultValue: false,
        },
      ]}
      preview={(props) => <Radio {...props}>Radio</Radio>}
      snippet={`<Radio {...props}>Radio</Radio>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <RadioGroup name="radioFormName">
          <div className={'flex flex-row gap-5'}>
            <Radio defaultChecked value={1}>
              Radio
            </Radio>
            <Radio color={'success'} value={2}>
              Success
            </Radio>
            <Radio color={'warning'} value={3}>
              Warning
            </Radio>
            <Radio color={'danger'} value={4}>
              Danger
            </Radio>
            <Radio color={'neutral'} value={5}>
              Neutral
            </Radio>
          </div>
        </RadioGroup>
      )}
      snippet={`<RadioGroup name="radioFormName">
  <div className={'flex flex-row gap-5'}>
    <Radio defaultChecked value={1}>
      Radio
    </Radio>
    <Radio color={'success'} value={2}>
      Success
    </Radio>
    <Radio color={'warning'} value={3}>
      Warning
    </Radio>
    <Radio color={'danger'} value={4}>
      Danger
    </Radio>
    <Radio color={'neutral'} value={5}>
      Neutral
    </Radio>
  </div>
</RadioGroup>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <RadioGroup name="radioFormName">
          <div className={'flex flex-row items-center gap-5'}>
            <Radio size={'xs'} value={'xs'}>
              Radio
            </Radio>
            <Radio size={'sm'} value={'sm'}>
              Radio
            </Radio>
            <Radio value={'md'}>Radio</Radio>
            <Radio size={'lg'} value={'lg'}>
              Radio
            </Radio>
            <Radio size={'xl'} value={'xl'}>
              Radio
            </Radio>
          </div>
        </RadioGroup>
      )}
      snippet={`<RadioGroup name="radioFormName">
  <div className={'flex flex-row items-center gap-5'}>
    <Radio size={'xs'} value={'xs'}>
      Radio
    </Radio>
    <Radio size={'sm'} value={'sm'}>
      Radio
    </Radio>
    <Radio value={'md'}>Radio</Radio>
    <Radio size={'lg'} value={'lg'}>
      Radio
    </Radio>
    <Radio size={'xl'} value={'xl'}>
      Radio
    </Radio>
  </div>
</RadioGroup>`}
    />
  );
};

const GroupDemo = () => {
  const [checkedValue, setCheckedValue] = useState<string | number>('');

  return (
    <div className={'flex flex-col gap-3'}>
      <RadioGroup
        value={checkedValue}
        onChange={(value) => {
          setCheckedValue(value);
        }}
      >
        <div className={'flex flex-row gap-5'}>
          <Radio value={'React'}>React</Radio>
          <Radio value={'Angular'}>Angular</Radio>
          <Radio value={'Svelte'}>Svelte</Radio>
          <Radio value={'Solid'}>Solid</Radio>
          <Radio value={'Vue'}>Vue</Radio>
        </div>
      </RadioGroup>
      <div>Select your favorite frameworks/libraries: {checkedValue}</div>
    </div>
  );
};

export const Group = () => {
  return (
    <DemoExample
      preview={() => <GroupDemo />}
      snippet={`const GroupDemo = () => {
  const [checkedValue, setCheckedValue] = useState('');

  return (
    <div className={'flex flex-col gap-3'}>
      <RadioGroup
        value={checkedValue}
        onChange={(value) => {
          setCheckedValue(value);
        }}
      >
        <div className={'flex flex-row gap-5'}>
          <Radio value={'React'}>React</Radio>
          <Radio value={'Angular'}>Angular</Radio>
          <Radio value={'Svelte'}>Svelte</Radio>
          <Radio value={'Solid'}>Solid</Radio>
          <Radio value={'Vue'}>Vue</Radio>
        </div>
      </RadioGroup>
      <div>Select your favorite frameworks/libraries: {checkedValue}</div>
    </div>
  );
};`}
    />
  );
};
