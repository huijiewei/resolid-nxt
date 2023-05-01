import type { Color } from '@resolid/nxt-ui';
import { Button, Pagination } from '@resolid/nxt-ui';
import { useState } from 'react';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <Pagination
          onChange={(page) => {
            console.log(page);
          }}
          total={2120}
        />
      )}
      snippet={`<Pagination
  onChange={(page) => {
    console.log(page);
  }}
  total={2120}
/>`}
    />
  );
};

export const Disabled = () => {
  return (
    <DemoExample
      preview={() => (
        <Pagination
          disabled
          onChange={(page) => {
            console.log(page);
          }}
          total={2120}
        />
      )}
      snippet={`<Pagination
  disabled
  onChange={(page) => {
    console.log(page);
  }}
  total={2120}
/>`}
    />
  );
};

export const ShowJumper = () => {
  return (
    <DemoExample
      preview={() => (
        <Pagination
          showJumper
          onChange={(page) => {
            console.log(page);
          }}
          total={2120}
        />
      )}
      snippet={`<Pagination
  showJumper
  onChange={(page) => {
    console.log(page);
  }}
  total={2120}
/>`}
    />
  );
};

const ColorsDemo = () => {
  const [color, setColor] = useState<Color | undefined>();

  return (
    <div className={'flex flex-col gap-3'}>
      <div className={'flex gap-3'}>
        {[
          { color: 'primary', name: 'Primary' },
          { color: 'neutral', name: 'Neutral' },
          { color: 'success', name: 'Success' },
          { color: 'warning', name: 'Warning' },
          { color: 'danger', name: 'Danger' },
        ].map((item) => (
          <Button
            key={item.color}
            color={item.color as Color}
            active={color == item.color}
            onClick={() => {
              setColor(item.color as Color);
            }}
            variant={'light'}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Pagination
        color={color}
        onChange={(page) => {
          console.log(page);
        }}
        total={2120}
      />
    </div>
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => <ColorsDemo />}
      snippet={`const ColorsDemo = () => {
  const [color, setColor] = useState();

  return (
    <div className={'flex flex-col gap-3'}>
      <div className={'flex gap-3'}>
        {[
          { color: 'primary', name: 'Primary' },
          { color: 'neutral', name: 'Neutral' },
          { color: 'success', name: 'Success' },
          { color: 'warning', name: 'Warning' },
          { color: 'danger', name: 'Danger' }
        ].map((item) => (
          <Button
            key={item.color}
            color={item.color}
            active={color == item.color}
            onClick={() => {
              setColor(item.color);
            }}
            variant={'light'}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Pagination
        color={color}
        onChange={(page) => {
          console.log(page);
        }}
        total={2120}
      />
    </div>
  );
};`}
    />
  );
};
