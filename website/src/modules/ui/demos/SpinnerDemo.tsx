import { Spinner, type SpinnerProps } from '@resolid/nxt-ui';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<SpinnerProps>
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
      ]}
      preview={(props) => <Spinner {...props} />}
      snippet={`<Spinner {...props} />`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Spinner size={'xs'} />
          <Spinner size={'sm'} />
          <Spinner />
          <Spinner size={'lg'} />
          <Spinner size={'xl'} />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Spinner size={'xs'} />
  <Spinner size={'sm'} />
  <Spinner />
  <Spinner size={'lg'} />
  <Spinner size={'xl'} />
</div>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Spinner />
          <Spinner color={'success'} />
          <Spinner color={'warning'} />
          <Spinner color={'danger'} />
          <Spinner color={'neutral'} />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Spinner />
  <Spinner color={'success'} />
  <Spinner color={'warning'} />
  <Spinner color={'danger'} />
  <Spinner color={'neutral'} />
</div>`}
    />
  );
};
