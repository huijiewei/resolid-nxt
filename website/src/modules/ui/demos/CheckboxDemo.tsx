import { Button, Checkbox, CheckboxGroup, type CheckboxProps } from '@resolid/nxt-ui';
import { useState, type FormEvent, type SVGAttributes } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<CheckboxProps>
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
          propName: 'indeterminate',
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
      preview={(props) => <Checkbox {...props}>Checkbox</Checkbox>}
      snippet={`<Checkbox {...props}>Checkbox</Checkbox>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-5'}>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Checkbox defaultChecked color={'success'}>
            Success
          </Checkbox>
          <Checkbox defaultChecked color={'warning'}>
            Warning
          </Checkbox>
          <Checkbox defaultChecked color={'danger'}>
            Danger
          </Checkbox>
          <Checkbox defaultChecked color={'neutral'}>
            Neutral
          </Checkbox>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-5'}>
  <Checkbox defaultChecked>Checkbox</Checkbox>
  <Checkbox defaultChecked color={'success'}>
    Success
  </Checkbox>
  <Checkbox defaultChecked color={'warning'}>
    Warning
  </Checkbox>
  <Checkbox defaultChecked color={'danger'}>
    Danger
  </Checkbox>
  <Checkbox defaultChecked color={'neutral'}>
    Neutral
  </Checkbox>
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-5'}>
          <Checkbox size={'xs'}>Checkbox</Checkbox>
          <Checkbox size={'sm'}>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox size={'lg'}>Checkbox</Checkbox>
          <Checkbox size={'xl'}>Checkbox</Checkbox>
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-5'}>
  <Checkbox size={'xs'}>Checkbox</Checkbox>
  <Checkbox size={'sm'}>Checkbox</Checkbox>
  <Checkbox>Checkbox</Checkbox>
  <Checkbox size={'lg'}>Checkbox</Checkbox>
  <Checkbox size={'xl'}>Checkbox</Checkbox>
</div>`}
    />
  );
};

const ControlledDemo = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <div className="mb-2">You are {checked ? 'subscribed' : 'unsubscribed'}.</div>
      <Checkbox checked={checked} onChange={setChecked}>
        Subscribe
      </Checkbox>
    </>
  );
};

export const Controlled = () => {
  return (
    <DemoExample
      preview={() => <ControlledDemo />}
      snippet={`const ControlledDemo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="mb-2">You are {checked ? 'subscribed' : 'unsubscribed'}.</div>
      <Checkbox checked={checked} onChange={setChecked}>
        Subscribe
      </Checkbox>
    </>
  );
};`}
    />
  );
};

const HtmlFormsDemo = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target as HTMLFormElement);

    alert(JSON.stringify(Object.fromEntries(formData), null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col items-center gap-3'}>
      <Checkbox name={'newsletter'} value={'subscribed'}>
        Subscribe
      </Checkbox>
      <div className={'flex flex-row gap-3'}>
        <Button type={'reset'} color={'neutral'} variant={'light'}>
          Reset
        </Button>
        <Button type={'submit'}>Submit</Button>
      </div>
    </form>
  );
};

export const HtmlForms = () => {
  return (
    <DemoExample
      preview={() => <HtmlFormsDemo />}
      snippet={`const HtmlFormsDemo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);

    alert(JSON.stringify(Object.fromEntries(formData), null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className={'flex items-center flex-col gap-3'}>
      <Checkbox name={'newsletter'} value={'subscribed'}>
        Subscribe
      </Checkbox>
      <div className={'flex flex-row gap-3'}>
        <Button type={'reset'} color={'neutral'} variant={'light'}>
          Reset
        </Button>
        <Button type={'submit'}>Submit</Button>
      </div>
    </form>
  );
};`}
    />
  );
};

const GroupDemo = () => {
  const [checkedValue, setCheckedValue] = useState<(string | number)[]>(['React']);

  return (
    <div className={'flex flex-col gap-3'}>
      <CheckboxGroup
        value={checkedValue}
        onChange={(value) => {
          setCheckedValue(value);
        }}
      >
        <div className={'flex flex-row gap-5'}>
          <Checkbox value={'React'}>React</Checkbox>
          <Checkbox value={'Angular'}>Angular</Checkbox>
          <Checkbox value={'Svelte'}>Svelte</Checkbox>
          <Checkbox value={'Solid'}>Solid</Checkbox>
          <Checkbox value={'Vue'}>Vue</Checkbox>
        </div>
      </CheckboxGroup>
      <div>Select your favorite frameworks/libraries: {checkedValue.join(', ')}</div>
    </div>
  );
};

export const Group = () => {
  return (
    <DemoExample
      preview={() => <GroupDemo />}
      snippet={`const GroupDemo = () => {
  const [checkedValue, setCheckedValue] = useState(['React']);

  return (
    <div className={'flex flex-col gap-3'}>
      <CheckboxGroup
        value={checkedValue}
        onChange={(value) => {
          setCheckedValue(value);
        }}
      >
        <div className={'flex flex-row gap-5'}>
          <Checkbox value={'React'}>React</Checkbox>
          <Checkbox value={'Angular'}>Angular</Checkbox>
          <Checkbox value={'Svelte'}>Svelte</Checkbox>
          <Checkbox value={'Solid'}>Solid</Checkbox>
          <Checkbox value={'Vue'}>Vue</Checkbox>
        </div>
      </CheckboxGroup>
      <div>Select your favorite frameworks/libraries: {checkedValue.join(', ')}</div>
    </div>
  );
};`}
    />
  );
};

const IndeterminateDemo = () => {
  const [checkedItems, setCheckedItems] = useState([true, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div className={'flex flex-col gap-3'}>
      <Checkbox
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(checked) => setCheckedItems([checked, checked, checked])}
      >
        Receive all notifications
      </Checkbox>
      <div className={'flex flex-row gap-5'}>
        <Checkbox
          checked={checkedItems[0]}
          onChange={(checked) => setCheckedItems([checked, checkedItems[1], checkedItems[2]])}
        >
          Receive email notifications
        </Checkbox>
        <Checkbox
          checked={checkedItems[1]}
          onChange={(checked) => setCheckedItems([checkedItems[0], checked, checkedItems[2]])}
        >
          Receive sms notifications
        </Checkbox>
        <Checkbox
          checked={checkedItems[2]}
          onChange={(checked) => setCheckedItems([checkedItems[0], checkedItems[1], checked])}
        >
          Receive push notifications
        </Checkbox>
      </div>
    </div>
  );
};

export const Indeterminate = () => {
  return (
    <DemoExample
      preview={() => <IndeterminateDemo />}
      snippet={`const IndeterminateDemo = () => {
  const [checkedItems, setCheckedItems] = useState([true, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div className={'flex flex-col gap-3'}>
      <Checkbox
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(checked) => setCheckedItems([checked, checked, checked])}
      >
        Receive all notifications
      </Checkbox>
      <div className={'flex flex-row gap-5'}>
        <Checkbox
          checked={checkedItems[0]}
          onChange={(checked) => setCheckedItems([checked, checkedItems[1], checkedItems[2]])}
        >
          Receive email notifications
        </Checkbox>
        <Checkbox
          checked={checkedItems[1]}
          onChange={(checked) => setCheckedItems([checkedItems[0], checked, checkedItems[2]])}
        >
          Receive sms notifications
        </Checkbox>
        <Checkbox
          checked={checkedItems[2]}
          onChange={(checked) => setCheckedItems([checkedItems[0], checkedItems[1], checked])}
        >
          Receive push notifications
        </Checkbox>
      </div>
    </div>
  );
};`}
    />
  );
};

const CustomCheckboxIcon = (props: SVGAttributes<SVGElement> & { indeterminate?: boolean }) => {
  const { indeterminate, ...rest } = props;

  const d = indeterminate
    ? 'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z'
    : 'M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z';

  return (
    <svg width={'1em'} height={'1em'} viewBox={'0 0 24 24'} {...rest}>
      <path fill="currentColor" d={d} />
    </svg>
  );
};

const CustomIconDemo = () => {
  const [checkedItems, setCheckedItems] = useState([true, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div className={'flex flex-col gap-3'}>
      <Checkbox
        icon={<CustomCheckboxIcon />}
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(checked) => setCheckedItems([checked, checked])}
      >
        Indeterminate custom icon
      </Checkbox>
      <div className={'flex flex-row gap-5'}>
        <Checkbox
          icon={<CustomCheckboxIcon />}
          checked={checkedItems[0]}
          onChange={(checked) => setCheckedItems([checked, checkedItems[1]])}
        >
          Custom icon
        </Checkbox>
        <Checkbox
          icon={<CustomCheckboxIcon />}
          checked={checkedItems[1]}
          onChange={(checked) => setCheckedItems([checkedItems[0], checked])}
        >
          Custom icon
        </Checkbox>
      </div>
    </div>
  );
};

export const CustomIcon = () => {
  return (
    <DemoExample
      preview={() => <CustomIconDemo />}
      snippet={`const CustomCheckboxIcon = (props: SVGAttributes<SVGElement> & { indeterminate?: boolean }) => {
  const { indeterminate, ...rest } = props;

  const d = indeterminate
    ? 'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z'
    : 'M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z';

  return (
    <svg width={'1em'} height={'1em'} viewBox={'0 0 24 24'} {...rest}>
      <path fill="currentColor" d={d} />
    </svg>
  );
};

const CustomIconDemo = () => {
  const [checkedItems, setCheckedItems] = useState([true, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div className={'flex flex-col gap-3'}>
      <Checkbox
        icon={<CustomCheckboxIcon />}
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(checked) => setCheckedItems([checked, checked])}
      >
        Indeterminate custom icon
      </Checkbox>
      <div className={'flex flex-row gap-5'}>
        <Checkbox
          icon={<CustomCheckboxIcon />}
          checked={checkedItems[0]}
          onChange={(checked) => setCheckedItems([checked, checkedItems[1]])}
        >
          Custom icon
        </Checkbox>
        <Checkbox
          icon={<CustomCheckboxIcon />}
          checked={checkedItems[1]}
          onChange={(checked) => setCheckedItems([checkedItems[0], checked])}
        >
          Custom icon
        </Checkbox>
      </div>
    </div>
  );
};`}
    />
  );
};
