import { Button, Overlay } from '@resolid/nxt-ui';
import { useState } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';

const BasicDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={'relative flex h-32 items-center justify-center'}>
        {visible && <Overlay />}
        <Button color={visible ? 'danger' : 'success'}>
          {!visible ? 'This is a button to click at will' : 'After the overlay is visible, it cannot be clicked'}
        </Button>
      </div>

      <div className={'mt-3 flex justify-center'}>
        <Button onClick={() => setVisible((v) => !v)}>Toggle Overlay</Button>
      </div>
    </>
  );
};

export const Basic = () => {
  return (
    <DemoExample
      preview={() => <BasicDemo />}
      snippet={`const BasicDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={'relative flex h-32 items-center justify-center'}>
        {visible && <Overlay />}
        <Button color={visible ? 'danger' : 'success'}>
          {!visible ? 'This is a button to click at will' : 'After the overlay is visible, it cannot be clicked'}
        </Button>
      </div>

      <div className={'mt-3 flex justify-center'}>
        <Button onClick={() => setVisible((v) => !v)}>Toggle Overlay</Button>
      </div>
    </>
  );
};`}
    />
  );
};

export const Rounded = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'relative flex h-32 items-center justify-center'}>
          <Overlay radius />
          <Button>Rounded Overlay</Button>
        </div>
      )}
      snippet={`<div className={'relative flex h-32 items-center justify-center'}>
  <Overlay radius />
  <Button>Rounded Overlay</Button>
</div>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-col gap-3'}>
          <div className={'relative flex h-20 items-center justify-center'}>
            <Overlay color={'neutral'} />
            <Button>Neutral Overlay</Button>
          </div>
          <div className={'relative flex h-20 items-center justify-center'}>
            <Overlay color={'primary'} />
            <Button>Primary Overlay</Button>
          </div>
          <div className={'relative flex h-20 items-center justify-center'}>
            <Overlay color={'success'} />
            <Button>Success Overlay</Button>
          </div>
          <div className={'relative flex h-20 items-center justify-center'}>
            <Overlay color={'warning'} />
            <Button>Warning Overlay</Button>
          </div>
          <div className={'relative flex h-20 items-center justify-center'}>
            <Overlay color={'danger'} />
            <Button>Danger Overlay</Button>
          </div>
        </div>
      )}
      snippet={`<div className={'flex flex-col gap-3'}>
  <div className={'relative flex h-20 items-center justify-center'}>
    <Overlay color={'neutral'} />
    <Button>Neutral Overlay</Button>
  </div>
  <div className={'relative flex h-20 items-center justify-center'}>
    <Overlay color={'primary'} />
    <Button>Primary Overlay</Button>
  </div>
  <div className={'relative flex h-20 items-center justify-center'}>
    <Overlay color={'success'} />
    <Button>Success Overlay</Button>
  </div>
  <div className={'relative flex h-20 items-center justify-center'}>
    <Overlay color={'warning'} />
    <Button>Warning Overlay</Button>
  </div>
  <div className={'relative flex h-20 items-center justify-center'}>
    <Overlay color={'danger'} />
    <Button>Danger Overlay</Button>
  </div>
</div>`}
    />
  );
};

export const Blur = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'relative flex h-32 items-center justify-center'}>
          <Overlay blur />
          <Button>Blur Overlay</Button>
        </div>
      )}
      snippet={`<div className={'relative flex h-32 items-center justify-center'}>
  <Overlay blur />
  <Button>Blur Overlay</Button>
</div>`}
    />
  );
};
