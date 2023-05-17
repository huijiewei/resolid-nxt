import { Button, Input, InputAddon, InputGroup, Tooltip, type InputProps } from '@resolid/nxt-ui';
import { useState } from 'react';
import { Info } from '~/common/icons/Info';
import { UserCircle } from '~/common/icons/UserCircle';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<InputProps>
      componentProps={[
        {
          propName: 'size',
          control: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl'],
          defaultValue: 'md',
        },
        {
          propName: 'clearable',
          control: 'switch',
          defaultValue: false,
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
      preview={(props) => <Input {...props} />}
      snippet={`<Input {...props} />`}
    />
  );
};

export const PrefixSuffix = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Input clearable prefix={<UserCircle />} />
          <Input clearable disabled suffix={<Info />} />
          <Input clearable prefix={'Name'} />
          <Input clearable suffix={'.com'} />
          <Input
            clearable
            prefix={<UserCircle />}
            suffix={
              <Tooltip placement="top" content={'Tooltip'}>
                <span>
                  <Info />
                </span>
              </Tooltip>
            }
          />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Input clearable prefix={<UserCircle />} />
  <Input clearable suffix={<Info />} />
  <Input clearable prefix={'Name'} />
  <Input clearable suffix={'.com'} />
  <Input
    clearable
    prefix={<UserCircle />}
    suffix={
      <Tooltip placement="top" content={'Tooltip'}>
        <span>
          <Info />
        </span>
      </Tooltip>
    }
  />
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-3'}>
          <Input size={'xs'} />
          <Input size={'sm'} />
          <Input size={'md'} />
          <Input size={'lg'} />
          <Input size={'xl'} />
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-3'}>
  <Input size={'xs'} />
  <Input size={'sm'} />
  <Input size={'md'} />
  <Input size={'lg'} />
  <Input size={'xl'} />
</div>`}
    />
  );
};

export const Group = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-3'}>
          <InputGroup>
            <Input />
            <InputAddon>.com</InputAddon>
          </InputGroup>
          <InputGroup>
            <InputAddon>https://</InputAddon>
            <Input />
            <InputAddon>.com</InputAddon>
          </InputGroup>
          <InputGroup>
            <Input />
            <InputAddon>@</InputAddon>
            <Input />
            <InputAddon>.com</InputAddon>
          </InputGroup>
          <InputGroup>
            <InputAddon>FistName</InputAddon>
            <InputAddon>LastName</InputAddon>
            <Input className={'w-16'} />
            <Input />
          </InputGroup>
          <InputGroup>
            <InputAddon>https://</InputAddon>
            <Input />
            <InputAddon>.</InputAddon>
            <Input />
            <InputAddon>.com</InputAddon>
          </InputGroup>
          <InputGroup>
            <InputAddon as={'select'}>
              <option value={'https'}>https</option>
              <option value={'http'}>http</option>
            </InputAddon>
            <InputAddon>://</InputAddon>
            <Input />
            <InputAddon>.com</InputAddon>
          </InputGroup>
          <InputGroup>
            <Input />
            <InputAddon as={Button} variant={'light'} color={'neutral'}>
              Search
            </InputAddon>
          </InputGroup>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-3'}>
  <InputGroup>
    <Input />
    <InputAddon>.com</InputAddon>
  </InputGroup>
  <InputGroup>
    <InputAddon>https://</InputAddon>
    <Input />
    <InputAddon>.com</InputAddon>
  </InputGroup>
  <InputGroup>
    <Input />
    <InputAddon>@</InputAddon>
    <Input />
    <InputAddon>.com</InputAddon>
  </InputGroup>
  <InputGroup>
    <InputAddon>FirstName</InputAddon>
    <InputAddon>LastName</InputAddon>
    <Input className={'w-16'} />
    <Input />
  </InputGroup>
  <InputGroup>
    <InputAddon>https://</InputAddon>
    <Input />
    <InputAddon>.</InputAddon>
    <Input />
    <InputAddon>.com</InputAddon>
  </InputGroup>
  <InputGroup>
    <InputAddon as={'select'}>
      <option value={'https'}>https</option>
      <option value={'http'}>http</option>
    </InputAddon>
    <InputAddon>://</InputAddon>
    <Input />
    <InputAddon>.com</InputAddon>
  </InputGroup>
  <InputGroup>
    <Input />
    <InputAddon as={Button} variant={'light'} color={'neutral'}>
      Search
    </InputAddon>
  </InputGroup>
</div>`}
    />
  );
};

const ControlledDemo = () => {
  const [value, setValue] = useState<string | number>('');

  return (
    <>
      <div className="mb-2">Input Value: {value}</div>
      <Input value={value} onChange={(value) => setValue(value)} placeholder="Controlled demo" />
    </>
  );
};

export const Controlled = () => {
  return (
    <DemoExample
      preview={() => <ControlledDemo />}
      snippet={`const ControlledDemo = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <div className="mb-2">Input Value: {value}</div>
      <Input value={value} onChange={(value) => setValue(value)} placeholder="Controlled demo" />
    </>
  );
};`}
    />
  );
};
