import { Button, Tooltip, useDisclosure, type TooltipProps } from '@resolid/nxt-ui';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<TooltipProps>
      componentProps={[
        {
          propName: 'content',
          control: 'input',
        },
        {
          propName: 'color',
          control: 'color',
          options: ['primary', 'neutral', 'success', 'warning', 'danger'],
          defaultValue: 'neutral',
        },
        {
          propName: 'placement',
          control: 'select',
          options: [
            'auto',
            'top',
            'top-start',
            'top-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end',
            'bottom',
            'bottom-start',
            'bottom-end',
          ],
          defaultValue: 'auto',
        },
      ]}
      defaultProps={{
        content: 'Tooltip',
      }}
      preview={(props) => (
        <Tooltip {...props}>
          <Button>Button with tooltip</Button>
        </Tooltip>
      )}
      snippet={`<Tooltip {...props}>
  <Button>Button with tooltip</Button>
</Tooltip>`}
    />
  );
};

const ControlledDemo = () => {
  const { opened, toggle } = useDisclosure();

  return (
    <Tooltip opened={opened} content={'Controlled tooltip'}>
      <Button variant={'outline'} onClick={toggle}>
        Toggle tooltip
      </Button>
    </Tooltip>
  );
};

export const Controlled = () => {
  return (
    <DemoExample
      preview={ControlledDemo}
      snippet={`const ControlledDemo = () => {
  const { opened, toggle } = useDisclosure();

  return (
    <Tooltip opened={opened} content={'Controlled tooltip'}>
      <Button variant={'outline'} onClick={toggle}>
        Toggle tooltip
      </Button>
    </Tooltip>
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
            <Tooltip key={placement} placement={placement as TooltipProps['placement']} content={`${name} Tooltip`}>
              <span
                style={{ gridArea: placement == 'auto' ? 'center' : placement }}
                className={
                  'flex h-12 w-12 text-center leading-none text-sm cursor-default items-center justify-center rounded bg-bg-muted'
                }
              >
                {name}
              </span>
            </Tooltip>
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
    ['bottom-end', 'Bottom\\nEnd']
  ].map(([placement, name]) => (
    <Tooltip key={placement} placement={placement} content={\`$\{name} Tooltip\`}>
      <span
        style={{ gridArea: placement == 'auto' ? 'center' : placement }}
        className={
          'flex h-12 w-12 text-center leading-none text-sm cursor-default items-center justify-center rounded bg-bg-muted'
        }
      >
        {name}
      </span>
    </Tooltip>
  ))}
</div>`}
    />
  );
};
