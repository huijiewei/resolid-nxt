import { Button, Spinner, SpinnerOverlay } from '@resolid/nxt-ui';
import { useState } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { FormExample } from '~/modules/ui/components/FormExample';

const BasicDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className={'relative mx-auto w-fit p-5 shadow-md'}>
        <SpinnerOverlay blur visible={visible} />
        <form className={'flex flex-col gap-4'}>
          <FormExample />
        </form>
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
      <div className={'relative w-fit shadow-md mx-auto p-5'}>
        <SpinnerOverlay blur visible={visible} />
        <form className={'flex flex-col gap-4'}>
          <FormExample />
        </form>
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
        <div className={'relative mx-auto w-fit p-5 shadow-md'}>
          <SpinnerOverlay blur radius visible />
          <form className={'flex flex-col gap-4 rounded'}>
            <FormExample />
          </form>
        </div>
      )}
      snippet={`<div className={'relative w-fit shadow-md mx-auto p-5'}>
  <SpinnerOverlay blur radius visible />
  <form className={'flex flex-col gap-4 rounded'}>
    <FormExample />
  </form>
</div>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'relative mx-auto w-fit p-5 shadow-md'}>
          <SpinnerOverlay color={'warning'} blur radius visible />
          <form className={'flex flex-col gap-4 rounded'}>
            <FormExample />
          </form>
        </div>
      )}
      snippet={`<div className={'relative w-fit shadow-md mx-auto p-5'}>
  <SpinnerOverlay color={'warning'} blur radius visible />
  <form className={'flex flex-col gap-4 rounded'}>
    <FormExample />
  </form>
</div>`}
    />
  );
};

export const CustomerSpinner = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'relative mx-auto w-fit p-5 shadow-md'}>
          <SpinnerOverlay radius visible>
            <Spinner color={'success'} size={'xl'} />
          </SpinnerOverlay>
          <form className={'flex flex-col gap-4 rounded'}>
            <FormExample />
          </form>
        </div>
      )}
      snippet={`<div className={'relative w-fit shadow-md mx-auto p-5'}>
  <SpinnerOverlay radius visible>
    <Spinner color={'success'} size={'xl'} />
  </SpinnerOverlay>
  <form className={'flex flex-col gap-4 rounded'}>
    <FormExample />
  </form>
</div>`}
    />
  );
};
