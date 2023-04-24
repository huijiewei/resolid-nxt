import { Switch, type SwitchProps } from '@resolid/nxt-ui';
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
