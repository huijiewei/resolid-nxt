import { ProgressBar, type ProgressBarProps } from '@resolid/nxt-ui';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<ProgressBarProps>
      componentProps={[
        {
          propName: 'color',
          control: 'color',
          options: ['primary', 'neutral', 'success', 'warning', 'danger'],
          defaultValue: 'primary',
        },
        {
          propName: 'size',
          control: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl'],
          defaultValue: 'md',
        },
        {
          propName: 'value',
          control: 'number',
        },
      ]}
      defaultProps={{ value: 52, radius: true }}
      preview={(props) => <ProgressBar {...props} />}
      snippet={`<ProgressBar {...props} />`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-3'}>
          <ProgressBar color={'neutral'} radius value={33} />
          <ProgressBar color={'primary'} radius value={66} />
          <ProgressBar color={'success'} radius value={53} />
          <ProgressBar color={'warning'} radius value={39} />
          <ProgressBar color={'danger'} radius value={79} />
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-3'}>
  <ProgressBar color={'neutral'} radius value={33} />
  <ProgressBar color={'primary'} radius value={66} />
  <ProgressBar color={'success'} radius value={53} />
  <ProgressBar color={'warning'} radius value={39} />
  <ProgressBar color={'danger'} radius value={79} />
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-3'}>
          <ProgressBar size={'xs'} radius value={33} />
          <ProgressBar size={'sm'} radius value={66} />
          <ProgressBar size={'md'} radius value={53} />
          <ProgressBar size={'lg'} label={'39%'} radius value={39} />
          <ProgressBar size={'xl'} radius value={79}>
            79%
          </ProgressBar>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-3'}>
  <ProgressBar size={'xs'} radius value={33} />
  <ProgressBar size={'sm'} radius value={66} />
  <ProgressBar size={'md'} radius value={53} />
  <ProgressBar size={'lg'} radius value={39} label={'39%'} />
  <ProgressBar size={'xl'} radius value={79}>79%</ProgressBar>
</div>`}
    />
  );
};
