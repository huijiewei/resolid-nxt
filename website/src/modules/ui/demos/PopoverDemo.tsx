import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  type PopoverProps,
} from '@resolid/nxt-ui';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-5'}>
          <Popover>
            <PopoverTrigger>
              <Button>Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Header</PopoverHeader>
              <PopoverBody>Body</PopoverBody>
              <PopoverFooter>Footer</PopoverFooter>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button>No Arrow</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>Header</PopoverHeader>
              <PopoverBody>Body</PopoverBody>
              <PopoverFooter>Footer</PopoverFooter>
            </PopoverContent>
          </Popover>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-5'}>
  <Popover>
    <PopoverTrigger>
      <Button>Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Header</PopoverHeader>
      <PopoverBody>Body</PopoverBody>
      <PopoverFooter>Footer</PopoverFooter>
    </PopoverContent>
  </Popover>
  <Popover>
    <PopoverTrigger>
      <Button>No Arrow</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>Header</PopoverHeader>
      <PopoverBody>Body</PopoverBody>
      <PopoverFooter>Footer</PopoverFooter>
    </PopoverContent>
  </Popover>
</div>`}
    />
  );
};

export const Focus = () => {
  return (
    <DemoExample
      preview={() => (
        <Popover closeOnBlur={false} placement={'right'}>
          {({ opened, close }) => (
            <>
              <PopoverTrigger>
                <Button>{opened ? 'Close' : 'Open'} Form</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Popover Form</PopoverHeader>
                <PopoverBody>
                  <form className={'flex flex-col gap-3'}>
                    <div className={'flex gap-5 items-center justify-between'}>
                      <label htmlFor={'firstName'}>First name</label>
                      <input id={'firstName'} value={'John'} className={'border rounded px-3 py-1.5'} />
                    </div>
                    <div className={'flex gap-5 items-center justify-between'}>
                      <label htmlFor={'lastName'}>Last name</label>
                      <input id={'lastName'} value={'Smith'} className={'border rounded px-3 py-1.5'} />
                    </div>
                  </form>
                </PopoverBody>
                <PopoverFooter className={'flex items-center justify-center gap-5'}>
                  <Button>Save</Button>
                  <Button color={'neutral'} onClick={close}>
                    Cancel
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </>
          )}
        </Popover>
      )}
      snippet={`<Popover closeOnBlur={false} placement={'right'}>
  {({ opened, close }) => (
    <>
      <PopoverTrigger>
        <Button>{opened ? 'Close' : 'Open'} Form</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Popover Form</PopoverHeader>
        <PopoverBody>
          <form className={'flex flex-col gap-3'}>
            <div className={'flex gap-5 items-center justify-between'}>
              <label htmlFor={'firstName'}>First name</label>
              <input id={'firstName'} value={'John'} className={'border rounded px-3 py-1.5'} />
            </div>
            <div className={'flex gap-5 items-center justify-between'}>
              <label htmlFor={'lastName'}>Last name</label>
              <input id={'lastName'} value={'Smith'} className={'border rounded px-3 py-1.5'} />
            </div>
          </form>
        </PopoverBody>
        <PopoverFooter className={'flex items-center justify-center gap-5'}>
          <Button>Save</Button>
          <Button color={'neutral'} onClick={close}>
            Cancel
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </>
  )}
</Popover>`}
    />
  );
};

const ControlledDemo = () => {
  const { opened, open, close } = useDisclosure();

  return (
    <Popover opened={opened} placement={'right'}>
      <PopoverTrigger>
        <Button onMouseEnter={open} onMouseLeave={close}>
          Hover open
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Header</PopoverHeader>
        <PopoverBody>Body</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const Controlled = () => {
  return (
    <DemoExample
      preview={() => <ControlledDemo />}
      snippet={`const ControlledDemo = () => {
  const { opened, open, close } = useDisclosure();

  return (
    <Popover opened={opened} placement={'right'}>
      <PopoverTrigger>
        <Button onMouseEnter={open} onMouseLeave={close}>
          Hover open
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Header</PopoverHeader>
        <PopoverBody>Body</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};`}
    />
  );
};

export const Placement = () => {
  return (
    <DemoExample
      preview={() => (
        <div
          className={'mx-auto grid w-fit gap-2'}
          style={{
            gridTemplateAreas:
              '".           top-start     top         top-end       .            "' +
              '"left-start  .             .           .             right-start  "' +
              '"left        .             center      .             right        "' +
              '"left-end    .             .           .             right-end    "' +
              '".           bottom-start  bottom      bottom-end    .            "',
          }}
        >
          {[
            ['top-start', 'Top\nStart'],
            ['top', 'Top'],
            ['top-end', 'Top\nEnd'],
            ['left-start', 'Left\nStart'],
            ['left', 'Left'],
            ['left-end', 'Left\nEnd'],
            ['auto', 'Auto'],
            ['right-start', 'Right\nStart'],
            ['right', 'Right'],
            ['right-end', 'Right\nEnd'],
            ['bottom-start', 'Bottom\nStart'],
            ['bottom', 'Bottom'],
            ['bottom-end', 'Bottom\nEnd'],
          ].map(([placement, name]) => (
            <Popover key={placement} placement={placement as PopoverProps['placement']}>
              <PopoverTrigger>
                <button
                  style={{ gridArea: placement == 'auto' ? 'center' : placement }}
                  className={
                    'flex h-12 w-12 text-center leading-tight text-sm cursor-default items-center justify-center rounded bg-bg-subtle hover:bg-bg-subtlest active:bg-bg-muted'
                  }
                >
                  {name}
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Header</PopoverHeader>
                <PopoverBody>{name} Popover</PopoverBody>
                <PopoverFooter>Footer</PopoverFooter>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      )}
      snippet={`<div
  className={'mx-auto grid w-fit gap-2'}
  style={{
    gridTemplateAreas:
      '".           top-start     top         top-end       .            "' +
      '"left-start  .             .           .             right-start  "' +
      '"left        .             center      .             right        "' +
      '"left-end    .             .           .             right-end    "' +
      '".           bottom-start  bottom      bottom-end    .            "',
  }}
>
  {[
    ['top-start', 'Top\\nStart'],
    ['top', 'Top'],
    ['top-end', 'Top\\nEnd'],
    ['left-start', 'Left\\nStart'],
    ['left', 'Left'],
    ['left-end', 'Left\\nEnd'],
    ['auto', 'Auto'],
    ['right-start', 'Right\\nStart'],
    ['right', 'Right'],
    ['right-end', 'Right\\nEnd'],
    ['bottom-start', 'Bottom\\nStart'],
    ['bottom', 'Bottom'],
    ['bottom-end', 'Bottom\\nEnd'],
  ].map(([placement, name]) => (
    <Popover key={placement} placement={placement as PopoverProps['placement']}>
      <PopoverTrigger>
        <button
          style={{ gridArea: placement == 'auto' ? 'center' : placement }}
          className={
            'flex h-12 w-12 text-center leading-tight text-sm cursor-default items-center justify-center rounded bg-bg-subtle hover:bg-bg-subtlest active:bg-bg-muted'
          }
        >
          {name}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Header</PopoverHeader>
        <PopoverBody>{name} Popover</PopoverBody>
        <PopoverFooter>Footer</PopoverFooter>
      </PopoverContent>
    </Popover>
  ))}
</div>`}
    />
  );
};
