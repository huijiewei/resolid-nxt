import { Button, Switch, type SwitchProps } from '@resolid/nxt-ui';
import { useState, type FormEvent } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<SwitchProps>
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
          propName: 'readOnly',
          control: 'switch',
          defaultValue: false,
        },
      ]}
      preview={(props) => <Switch {...props}>Switch</Switch>}
      snippet={`<Switch {...props}>Switch</Switch>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-5'}>
          <Switch defaultChecked>Switch</Switch>
          <Switch defaultChecked color={'success'}>
            Success
          </Switch>
          <Switch defaultChecked color={'warning'}>
            Warning
          </Switch>
          <Switch defaultChecked color={'danger'}>
            Danger
          </Switch>
          <Switch defaultChecked color={'neutral'}>
            Neutral
          </Switch>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-5'}>
  <Switch defaultChecked>Switch</Switch>
  <Switch defaultChecked color={'success'}>
    Success
  </Switch>
  <Switch defaultChecked color={'warning'}>
    Warning
  </Switch>
  <Switch defaultChecked color={'danger'}>
    Danger
  </Switch>
  <Switch defaultChecked color={'neutral'}>
    Neutral
  </Switch>
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-5'}>
          <Switch size={'xs'}>Switch</Switch>
          <Switch size={'sm'}>Switch</Switch>
          <Switch>Switch</Switch>
          <Switch size={'lg'}>Switch</Switch>
          <Switch size={'xl'}>Switch</Switch>
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-5'}>
  <Switch size={'xs'}>Switch</Switch>
  <Switch size={'sm'}>Switch</Switch>
  <Switch>Switch</Switch>
  <Switch size={'lg'}>Switch</Switch>
  <Switch size={'xl'}>Switch</Switch>
</div>`}
    />
  );
};

const ControlledDemo = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <div className="mb-2">Airplane mode is {checked ? 'active' : 'inactive'}.</div>
      <Switch checked={checked} onChange={setChecked}>
        Airplane mode
      </Switch>
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
      <div className="mb-2">Airplane mode is {checked ? 'active' : 'inactive'}.</div>
      <Switch checked={checked} onChange={setChecked}>
        Airplane mode
      </Switch>
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
      <Switch name={'airplane'} value={'on'}>
        Airplane mode
      </Switch>
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
      <Switch name={'airplane'} value={'on'}>
        Airplane mode
      </Switch>
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
