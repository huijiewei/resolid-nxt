import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  type ModalProps,
} from '@resolid/nxt-ui';
import { useRef, useState } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { FormExample } from '~/modules/ui/components/FormExample';

function BasicDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}`}
    />
  );
};

function CenteredDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal opened={opened} centered onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const Centered = () => {
  return (
    <DemoExample
      preview={() => <CenteredDemo />}
      snippet={`function CenteredDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal opened={opened} centered onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}`}
    />
  );
};

function UnlockScrollDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal lockScroll={false} opened={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const UnlockScroll = () => {
  return (
    <DemoExample
      preview={() => <UnlockScrollDemo />}
      snippet={`function UnlockScrollDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal lockScroll={false} opened={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}`}
    />
  );
};

const ModalBodyContent = () => {
  return (
    <>
      <p>
        Apple in January 2023 overhauled the 14-inch and 16-inch MacBook Pro models, adding next-generation M2 Pro and
        M2 Max chips, increased maximum memory, longer battery life, HDMI 2.1 with 8K display support, faster Wi-Fi 6E,
        and Bluetooth 5.3 support.
      </p>
      <p>
        The 2023 MacBook Pro models have received no design changes and continue to come in 14.2-inch and 16.2-inch size
        options with mini-LED displays. Changes are all internal, focused primarily around the updated M-series chips.
      </p>
      <p>
        Apple&apos;s new M2 Pro chip offers up to a 12-core CPU and up to a 19-core GPU, while the M2 Max chip offers a
        12-core CPU and up to a 38-core GPU. The CPU in both chips includes eight performance cores and four efficiency
        cores, although the scaled-down M2 Pro in the base model of the 14-inch MacBook Pro comes with six performance
        cores and four efficiency cores.
      </p>
      <p>
        The M2 Pro supports up to 32GB unified memory, while the M2 Max supports up to 96GB unified memory, an
        improvement over the prior 64GB maximum with the M1 Max. The M2 Pro features 200GB/s unified memory bandwidth,
        while the M2 Max features 400GB/s unified memory bandwidth.
      </p>
      <p>
        The M2 Pro&apos;s GPU speeds are up to 30 percent faster than the M1 Pro for improvements in image processing
        performance gaming, while the M2 Max GPU speeds are up to 30 percent faster than the M1 Max. The M2 Pro and M2
        Max continue to feature a 16-core Neural Engine.
      </p>
      <p>
        The 14- and 16-inch MacBook Pro models feature a Liquid Retina XDR display, which is a mini-LED display with up
        to 1000 nits sustained brightness, 1600 nits peak brightness, and a 1,000,000:1 contrast ratio. The 14-inch
        MacBook Pro has a resolution of 3024-by-1964 at 254 pixels per inch, and the 16-inch model has a resolution of
        3456-by-2234 at 254 pixels per inch.
      </p>
      <p>
        There are slim 3.5mm bezels at the sides and the top, and the top of the display also features a notch design
        that houses a 1080p webcam. Both displays come equipped with ProMotion technology, which supports adaptive
        refresh rates ranging from 24Hz to 120Hz. Other display technologies include P3 Wide color for true-to-life
        colors and True Tone, which shifts the white balance of the display to match the lighting in the room.
      </p>
      <p>
        Design wise, the M2 MacBook Pro models are identical to the prior-generation M1 MacBook Pro models, with silver
        and space gray color options available. There&apos;s an all-black keyboard with a full-sized row of function
        keys, along with a Touch ID button with a circular fingerprint sensor. Touch ID is used unlock the Mac,
        authenticate purchases, and replace passwords. Below the keyboard, there&apos;s a large Force Touch trackpad.
      </p>
      <p>
        Apple is using the same rearchitected thermal design that provides sustained performance while keeping the
        machine cool and quiet even with the more powerful M2 Pro and M2 Max chips.
      </p>
      <p>
        There are multiple ports included with both MacBook Pro models, including an SDXC card slot, an HDMI 2.1 port,
        three USB-C Thunderbolt 4 ports, a 3.5mm headphone jack with support for high-impedance headphones, and a
        MagSafe 3 port that enables a fast charging feature providing a 50 percent charge within 30 minutes. New this
        year is the HDMI 2.1 port that provides support for 8K displays up to 60Hz and 4K displays up to 240Hz.
      </p>
      <p>
        The 16-inch MacBook Pro uses a 140W power adapter while the 14-inch models ship with either 67W or 96W power
        adapter depending on CPU configuration, and both machines can charge over either USB-C or MagSafe.
      </p>
      <p>
        There are fast SSDs inside the MacBook Pro models, which are configurable with up to 8TB storage space in both
        models.
      </p>
      <p>
        Thanks to the new M2 Pro and M2 Max chips, the MacBook Pro models feature even longer battery life. The 14-inch
        MacBook Pro lasts for up to 18 hours when watching movies and up to 12 hours when browsing the web. The 16-inch
        MacBook Pro lasts for up to 22 hours when watching movies and 15 hours when browsing the web.
      </p>
      <p>
        Other features include Wi-Fi 6E and Bluetooth 5.3 support, with Wi-Fi 6E offering faster wireless connectivity
        and lower latency through the 6GHz band. The MacBook Pro models also include a six-speaker sound system with two
        tweeters, four force-cancelling woofers, and wide stereo sound.
      </p>
      <p>
        The 14-inch MacBook Pro is priced starting at $1,999, while the 16-inch MacBook Pro is priced starting at
        $2,499, with pricing unchanged compared to the prior-generation machines.
      </p>
    </>
  );
};

const ScrollBehaviorDemo = () => {
  const [opened, setOpened] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState('inside');

  return (
    <>
      <RadioGroup value={scrollBehavior} onChange={(value) => setScrollBehavior(value.toString())}>
        <div className={'mb-3 flex flex-row gap-5'}>
          <Radio value="inside">Inside</Radio>
          <Radio value="outside">Outside</Radio>
        </div>
      </RadioGroup>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal
        scrollBehavior={scrollBehavior as ModalProps['scrollBehavior']}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>M2 Pro and M2 Max MacBook Pros</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={'flex flex-col gap-3'}>
            <ModalBodyContent />
          </ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const ScrollBehavior = () => {
  return (
    <DemoExample
      preview={() => <ScrollBehaviorDemo />}
      snippet={`const ScrollBehaviorDemo = () => {
  const [opened, setOpened] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState('inside');

  return (
    <>
      <RadioGroup value={scrollBehavior} onChange={(value) => setScrollBehavior(value)}>
        <div className={'mb-3 flex flex-row gap-5'}>
          <Radio value="inside">Inside</Radio>
          <Radio value="outside">Outside</Radio>
        </div>
      </RadioGroup>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal
        scrollBehavior={scrollBehavior}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <ModalOverlay />
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>M2 Pro and M2 Max MacBook Pros</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={'flex flex-col gap-3'}>
            <ModalBodyContent />
          </ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};`}
    />
  );
};

const FocusDemo = () => {
  const [opened, setOpened] = useState(false);
  const finalRef = useRef(null);

  return (
    <div className={'flex flex-row gap-3'}>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Button color={'neutral'} ref={finalRef}>
        Receive focus on close
      </Button>
      <Modal initialFocus={1} finalFocus={finalRef} opened={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-fit'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log('Submit');
            }}
          >
            <ModalBody className={'flex flex-col gap-4'}>
              <FormExample />
            </ModalBody>
            <ModalFooter className={'flex gap-3 items-center justify-end'}>
              <Button type={'submit'}>Submit</Button>
              <Button color={'neutral'} onClick={() => setOpened(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export const Focus = () => {
  return (
    <DemoExample
      preview={() => <FocusDemo />}
      snippet={`const FocusDemo = () => {
  const [opened, setOpened] = useState(false);
  const finalRef = useRef(null);

  return (
    <div className={'flex flex-row gap-3'}>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Button color={'neutral'} ref={finalRef}>
        Receive focus on close
      </Button>
      <Modal initialFocus={1} finalFocus={finalRef} opened={opened} onClose={() => setOpened(false)}>
        <ModalOverlay />
        <ModalContent className={'w-fit'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log('Submit');
            }}
          >
            <ModalBody className={'flex flex-col gap-4'}>
              <FormExample />
            </ModalBody>
            <ModalFooter className={'flex gap-3 items-center justify-end'}>
              <Button type={'submit'}>Submit</Button>
              <Button color={'neutral'} onClick={() => setOpened(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};`}
    />
  );
};

const OverlayStylingDemo = () => {
  const OverlayBlur = () => <ModalOverlay className="backdrop-blur-sm" />;
  const OverlayHueRotate = () => <ModalOverlay className="backdrop-hue-rotate-30" />;

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
      <Modal opened={opened} onClose={() => setOpened(false)}>
        {overlay}
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const OverlayStyling = () => {
  return (
    <DemoExample
      preview={() => <OverlayStylingDemo />}
      snippet={`const OverlayStylingDemo = () => {
  const OverlayBlur = () => <ModalOverlay className="backdrop-blur-sm" />;
  const OverlayHueRotate = () => <ModalOverlay className="backdrop-hue-rotate-30" />;

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
      <Modal opened={opened} onClose={() => setOpened(false)}>
        {overlay}
        <ModalContent className={'w-11/12 tablet:w-3/5 laptop:w-1/3'}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Modal Body</ModalBody>
          <ModalFooter className={'flex items-center justify-center gap-5'}>
            <Button onClick={() => setOpened(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};`}
    />
  );
};
