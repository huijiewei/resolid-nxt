import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Radio,
  RadioGroup,
  type DrawerProps,
} from '@resolid/nxt-ui';
import { useRef, useState } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';

function BasicDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      <Drawer opened={opened} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className={'p-3'}>Drawer Body</DrawerBody>
          <DrawerFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export const Basic = () => {
  return (
    <DemoExample
      preview={() => <BasicDemo />}
      snippet={`function BasicDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      <Drawer opened={opened} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className={'p-3'}>Drawer Body</DrawerBody>
          <DrawerFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}`}
    />
  );
};

function PlacementDemo() {
  const [opened, setOpened] = useState(false);
  const [placement, setPlacement] = useState('right');

  return (
    <>
      <RadioGroup name="placement" value={placement} onChange={(value) => setPlacement(value.toString())}>
        <div className={'flex flex-row gap-5'}>
          <Radio value="top">Top</Radio>
          <Radio value="bottom">Bottom</Radio>
          <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
        </div>
      </RadioGroup>
      <br />
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      <Drawer opened={opened} placement={placement as DrawerProps['placement']} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent
          className={
            placement == 'left' || placement == 'right'
              ? 'w-11/12 tablet:w-3/5 laptop:w-1/3'
              : 'h-11/12 tablet:h-3/5 laptop:h-1/3'
          }
        >
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className={'p-3'}>Drawer Body</DrawerBody>
          <DrawerFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export const Placement = () => {
  return (
    <DemoExample
      preview={() => <PlacementDemo />}
      snippet={`function PlacementDemo() {
  const [opened, setOpened] = useState(false);
  const [placement, setPlacement] = useState('right');

  return (
    <>
      <RadioGroup name="placement" value={placement} onChange={(value) => setPlacement(value))}>
        <div className={'flex flex-row gap-5'}>
          <Radio value="top">Top</Radio>
          <Radio value="bottom">Bottom</Radio>
          <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
        </div>
      </RadioGroup>
      <br />
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      <Drawer opened={opened} placement={placement} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent
          className={
            placement == 'left' || placement == 'right'
              ? 'w-11/12 tablet:w-3/5 laptop:w-1/3'
              : 'h-11/12 tablet:h-3/5 laptop:h-1/3'
          }
        >
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className={'p-3'}>Drawer Body</DrawerBody>
          <DrawerFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}`}
    />
  );
};

const FocusDemo = () => {
  const [opened, setOpened] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <div className={'flex flex-row gap-3'}>
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      <Button color={'neutral'} ref={finalRef}>
        Receive focus on close
      </Button>
      <Drawer initialFocus={initialRef} finalFocus={finalRef} opened={opened} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent className={'w-11/12 tablet:w-3/5 laptop:w-1/5'}>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log('Submit');
            }}
          >
            <DrawerBody className={'flex flex-col gap-3 p-3'}>
              <div className={'flex flex-row items-center'}>
                <label htmlFor={'demoFormName'} className={'w-28'}>
                  Username <span className={'text-red-500'}>*</span>
                </label>
                <Input ref={initialRef} placeholder={'Username'} id={'demoFormName'} />
              </div>
              <div className={'flex flex-row items-center'}>
                <label htmlFor={'demoFormEmail'} className={'w-28'}>
                  Email <span className={'text-red-500'}>*</span>
                </label>
                <Input placeholder={'Email'} id={'demoFormEmail'} />
              </div>
            </DrawerBody>
            <DrawerFooter className={'flex gap-3 items-center justify-end'}>
              <Button type={'submit'}>Submit</Button>
              <Button color={'neutral'} onClick={() => setOpened(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export const Focus = () => {
  return (
    <DemoExample
      preview={() => <FocusDemo />}
      snippet={`const FocusDemo = () => {
  const [opened, setOpened] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <div className={'flex flex-row gap-3'}>
      <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      <Button color={'neutral'} ref={finalRef}>
        Receive focus on close
      </Button>
      <Drawer initialFocus={initialRef} finalFocus={finalRef} opened={opened} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent className={'w-11/12 tablet:w-3/5 laptop:w-1/5'}>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log('Submit');
            }}
          >
            <DrawerBody className={'flex flex-col gap-3 p-3'}>
              <div className={'flex flex-row items-center'}>
                <label htmlFor={'demoFormName'} className={'w-28'}>
                  Username <span className={'text-red-500'}>*</span>
                </label>
                <Input ref={initialRef} placeholder={'Username'} id={'demoFormName'} />
              </div>
              <div className={'flex flex-row items-center'}>
                <label htmlFor={'demoFormEmail'} className={'w-28'}>
                  Email <span className={'text-red-500'}>*</span>
                </label>
                <Input placeholder={'Email'} id={'demoFormEmail'} />
              </div>
            </DrawerBody>
            <DrawerFooter className={'flex gap-3 items-center justify-end'}>
              <Button type={'submit'}>Submit</Button>
              <Button color={'neutral'} onClick={() => setOpened(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};`}
    />
  );
};

const OverlayStylingDemo = () => {
  const OverlayBlur = () => <DrawerOverlay className="backdrop-blur-sm" />;
  const OverlayHueRotate = () => <DrawerOverlay className="backdrop-hue-rotate-30" />;

  const [opened, setOpened] = useState(false);
  const [overlay, setOverlay] = useState(<OverlayBlur />);

  return (
    <>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setOverlay(<OverlayBlur />);
            setOpened(true);
          }}
        >
          Blur Style
        </Button>
        <Button
          onClick={() => {
            setOverlay(<OverlayHueRotate />);
            setOpened(true);
          }}
        >
          Hue Rotate
        </Button>
      </div>
      <Drawer opened={opened} onClose={() => setOpened(false)}>
        {overlay}
        <DrawerContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className={'p-3'}>Drawer Body</DrawerBody>
          <DrawerFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const OverlayStyling = () => {
  return (
    <DemoExample
      preview={() => <OverlayStylingDemo />}
      snippet={`const OverlayStylingDemo = () => {
  const OverlayBlur = () => <DrawerOverlay className="backdrop-blur-sm" />;
  const OverlayHueRotate = () => <DrawerOverlay className="backdrop-hue-rotate-30" />;

  const [opened, setOpened] = useState(false);
  const [overlay, setOverlay] = useState(<OverlayBlur />);

  return (
    <>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            setOverlay(<OverlayBlur />);
            setOpened(true);
          }}
        >
          Blur Style
        </Button>
        <Button
          onClick={() => {
            setOverlay(<OverlayHueRotate />);
            setOpened(true);
          }}
        >
          Hue Rotate
        </Button>
      </div>
      <Drawer opened={opened} onClose={() => setOpened(false)}>
        {overlay}
        <DrawerContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody className={'p-3'}>Modal Body</DrawerBody>
          <DrawerFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};`}
    />
  );
};
