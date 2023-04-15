import { Alert, AlertDescription, AlertIcon, AlertTitle, type AlertProps } from '@resolid/nxt-ui';
import { Info } from '~/common/icons/Info';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<AlertProps>
      componentProps={[
        {
          propName: 'variant',
          control: 'select',
          options: ['light', 'solid', 'outline'],
          defaultValue: 'light',
        },
        {
          propName: 'color',
          control: 'color',
          options: ['primary', 'neutral', 'success', 'warning', 'danger'],
          defaultValue: 'primary',
        },
      ]}
      preview={(props) => (
        <Alert {...props}>
          <AlertIcon>
            <Info size={'sm'} />
          </AlertIcon>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>Alert Description</AlertDescription>
        </Alert>
      )}
      snippet={`<Alert {...props}>
  <AlertIcon>
    <Info size={'sm'} />
  </AlertIcon>
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Alert Description</AlertDescription>
</Alert>`}
    />
  );
};

export const Variants = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-3'}>
          <Alert className={'w-full'}>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
          <Alert variant={'solid'} className={'w-full'}>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
          <Alert variant={'outline'} className={'w-full'}>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-3'}>
  <Alert class={'w-full'}>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
  <Alert variant={'solid'} className={'w-full'}>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
  <Alert variant={'outline'} className={'w-full'}>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
</div>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-3'}>
          <Alert className={'w-full'}>
            <AlertIcon>
              <Info size={'sm'} />
            </AlertIcon>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
          <Alert color={'success'} className={'w-full'}>
            <AlertIcon>
              <Info size={'sm'} />
            </AlertIcon>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
          <Alert color={'warning'} className={'w-full'}>
            <AlertIcon>
              <Info size={'sm'} />
            </AlertIcon>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
          <Alert color={'danger'} className={'w-full'}>
            <AlertIcon>
              <Info size={'sm'} />
            </AlertIcon>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
          <Alert color={'neutral'} className={'w-full'}>
            <AlertIcon>
              <Info size={'sm'} />
            </AlertIcon>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>Alert Description</AlertDescription>
          </Alert>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-3'}>
  <Alert class={'w-full'}>
    <AlertIcon>
      <Info size={'sm'} />
    </AlertIcon>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
  <Alert color={'success'} className={'w-full'}>
    <AlertIcon>
      <Info size={'sm'} />
    </AlertIcon>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
  <Alert color={'warning'} className={'w-full'}>
    <AlertIcon>
      <Info size={'sm'} />
    </AlertIcon>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
  <Alert color={'danger'} className={'w-full'}>
    <AlertIcon>
      <Info size={'sm'} />
    </AlertIcon>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
  <Alert color={'neutral'} className={'w-full'}>
    <AlertIcon>
      <Info size={'sm'} />
    </AlertIcon>
    <AlertTitle>Alert Title</AlertTitle>
    <AlertDescription>Alert Description</AlertDescription>
  </Alert>
</div>`}
    />
  );
};
