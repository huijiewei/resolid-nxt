import { Button, NumberInput, type NumberInputHandlers, type NumberInputProps } from '@resolid/nxt-ui';
import { useRef, useState } from 'react';
import { Minus } from '~/common/icons/Minus';
import { Plus } from '~/common/icons/Plus';
import { UserCircle } from '~/common/icons/UserCircle';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<NumberInputProps>
      componentProps={[
        {
          propName: 'size',
          control: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl'],
          defaultValue: 'md',
        },
        {
          propName: 'step',
          control: 'number',
          defaultValue: 1,
        },
        {
          propName: 'min',
          control: 'number',
        },
        {
          propName: 'max',
          control: 'number',
        },
        {
          propName: 'precision',
          control: 'number',
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
        {
          propName: 'readOnly',
          control: 'switch',
          defaultValue: false,
        },
        {
          propName: 'fullWidth',
          control: 'switch',
          defaultValue: false,
        },
      ]}
      defaultProps={{
        placeholder: 'Basic usage',
      }}
      preview={(props) => <NumberInput {...props} />}
      snippet={`<NumberInput {...props} />`}
    />
  );
};

export const Limit = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <NumberInput min={10} />
          <NumberInput max={10} />
          <NumberInput min={10} max={20} />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <NumberInput min={10} />
  <NumberInput max={10} />
  <NumberInput min={10} max={20} />
</div>`}
    />
  );
};

export const Format = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <NumberInput
            parse={(value) => value.replace(/\$\s?|(,*)/g, '')}
            format={(value) => (!Number.isNaN(value) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ')}
          />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <NumberInput
    parse={(value) => value.replace(/\\$\\s?|(,*)/g, '')}
    format={(value) => (!Number.isNaN(value) ? \`$ $\{value}\`.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') : '$ ')}
  />
</div>`}
    />
  );
};

export const MouseWheel = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <NumberInput mouseWheel />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <NumberInput mouseWheel />
</div>`}
    />
  );
};

export const Prefix = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <NumberInput prefix={<UserCircle size={'1em'} />} />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <NumberInput prefix={<UserCircle size={'1em'} />} />
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-5'}>
          <NumberInput size={'xs'} />
          <NumberInput size={'sm'} />
          <NumberInput size={'md'} />
          <NumberInput size={'lg'} />
          <NumberInput size={'xl'} />
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-5'}>
  <NumberInput size={'xs'} />
  <NumberInput size={'sm'} />
  <NumberInput size={'md'} />
  <NumberInput size={'lg'} />
  <NumberInput size={'xl'} />
</div>`}
    />
  );
};

const ControlledDemo = () => {
  const [value, setValue] = useState<number>();

  return (
    <>
      <div className="mb-2">Input Value: {value}</div>
      <NumberInput value={value} onChange={(value) => setValue(value)} placeholder="Controlled demo" />
    </>
  );
};

export const Controlled = () => {
  return (
    <DemoExample
      preview={() => <ControlledDemo />}
      snippet={`const ControlledDemo = () => {
  const [value, setValue] = useState();

  return (
    <>
      <div className="mb-2">Input Value: {value}</div>
      <NumberInput value={value} onChange={(value) => setValue(value)} placeholder="Controlled demo" />
    </>
  );
};`}
    />
  );
};

const CustomControlDemo = () => {
  const controls = useRef<NumberInputHandlers | undefined>();

  return (
    <div className={'flex gap-1'}>
      <Button
        onClick={() => controls.current?.decrement()}
        color={'neutral'}
        variant={'light'}
        className={'aspect-square !px-0'}
      >
        <Minus size={'1em'} />
      </Button>

      <NumberInput hideControls controlsRef={controls} onChange={(value) => console.log(value)} />

      <Button
        onClick={() => controls.current?.increment()}
        color={'neutral'}
        variant={'light'}
        className={'aspect-square !px-0'}
      >
        <Plus size={'1em'} />
      </Button>
    </div>
  );
};

export const CustomControl = () => {
  return (
    <DemoExample
      preview={() => <CustomControlDemo />}
      snippet={`const CustomControlDemo = () => {
  const controls = useRef();

  return (
    <div className={'flex gap-1'}>
      <Button
        onClick={() => controls.current.decrement()}
        color={'neutral'}
        variant={'light'}
        className={'aspect-square !px-0'}
      >
        <Minus size={'1em'} />
      </Button>

      <NumberInput hideControls controlsRef={controls} onChange={(value) => console.log(value)} />

      <Button
        onClick={() => controls.current.increment()}
        color={'neutral'}
        variant={'light'}
        className={'aspect-square !px-0'}
      >
        <Plus size={'1em'} />
      </Button>
    </div>
  );
};`}
    />
  );
};
