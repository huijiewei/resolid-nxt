import { Button, type ButtonProps } from '@resolid/nxt-ui';
import { Check } from '~/common/icons/Check';
import { Github } from '~/common/icons/Github';
import { Menu } from '~/common/icons/Menu';
import { Moon } from '~/common/icons/Moon';
import { Sun } from '~/common/icons/Sun';
import { System } from '~/common/icons/System';
import { DemoExample } from '~/modules/ui/components/DemoExample';
import { DemoShowcase } from '~/modules/ui/components/DemoShowcase';

export const Usage = () => {
  return (
    <DemoShowcase<ButtonProps>
      componentProps={[
        {
          propName: 'size',
          control: 'select',
          options: ['xs', 'sm', 'md', 'lg', 'xl'],
          defaultValue: 'md',
        },
        {
          propName: 'variant',
          control: 'select',
          options: ['solid', 'outline', 'light', 'subtle', 'link'],
          defaultValue: 'solid',
        },
        {
          propName: 'color',
          control: 'color',
          options: ['primary', 'neutral', 'success', 'warning', 'danger'],
          defaultValue: 'primary',
        },
        {
          propName: 'disabled',
          control: 'switch',
          defaultValue: false,
        },
        {
          propName: 'active',
          control: 'switch',
          defaultValue: false,
        },
        {
          propName: 'fullWidth',
          control: 'switch',
          defaultValue: false,
        },
      ]}
      preview={(props) => <Button {...props}>Button</Button>}
      snippet={`<Button {...props}>Button</Button>`}
    />
  );
};

export const Variants = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Button>Solid</Button>
          <Button variant={'outline'}>Outline</Button>
          <Button variant={'light'}>Light</Button>
          <Button variant={'subtle'}>Subtle</Button>
          <Button variant={'link'}>Link</Button>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Button>Solid</Button>
  <Button variant={'outline'}>Outline</Button>
  <Button variant={'light'}>Light</Button>
  <Button variant={'subtle'}>Subtle</Button>
  <Button variant={'link'}>Link</Button>
</div>`}
    />
  );
};

export const Colors = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Button>Primary</Button>
          <Button color={'success'}>Success</Button>
          <Button color={'warning'}>Warning</Button>
          <Button color={'danger'}>Danger</Button>
          <Button color={'neutral'}>Neutral</Button>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Button>Primary</Button>
  <Button color={'success'}>Success</Button>
  <Button color={'warning'}>Warning</Button>
  <Button color={'danger'}>Danger</Button>
  <Button color={'neutral'}>Neutral</Button>
</div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-3'}>
          <Button size={'xs'}>Button</Button>
          <Button size={'sm'}>Button</Button>
          <Button>Button</Button>
          <Button size={'lg'}>Button</Button>
          <Button size={'xl'}>Button</Button>
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-3'}>
  <Button size={'xs'}>Button</Button>
  <Button size={'sm'}>Button</Button>
  <Button>Button</Button>
  <Button size={'lg'}>Button</Button>
  <Button size={'xl'}>Button</Button>
</div>`}
    />
  );
};

export const WithIcon = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Button>
            <Sun size={'xs'} className={'me-1.5'} />
            Sun
          </Button>
          <Button variant={'outline'}>
            <Moon size={'xs'} className={'me-1.5'} />
            Moon
          </Button>
          <Button variant={'light'}>
            Menu
            <Menu size={'xs'} className={'ms-1.5'} />
          </Button>
          <Button className={'aspect-square !px-0'}>
            <Menu size={'xs'} />
          </Button>
          <Button className={'aspect-square !px-0'} variant={'outline'} color={'neutral'}>
            <Github size={'xs'} />
          </Button>
          <Button className={'aspect-square !px-0'} variant={'light'} color={'warning'}>
            <System size={'xs'} />
          </Button>
          <Button className={'aspect-square !px-0'} variant={'subtle'} color={'success'}>
            <Check size={'xs'} />
          </Button>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Button>
    <Sun size={'xs'} className={'me-1.5'} />
    Sun
  </Button>
  <Button variant={'outline'}>
    <Moon size={'xs'} className={'me-1.5'} />
    Moon
  </Button>
  <Button variant={'light'}>
    Menu
    <Menu size={'xs'} className={'ms-1.5'} />
  </Button>
  <Button className={'aspect-square !px-0'}>
    <Menu size={'xs'} />
  </Button>
  <Button className={'aspect-square !px-0'} variant={'outline'} color={'neutral'}>
    <Github size={'xs'} />
  </Button>
  <Button className={'aspect-square !px-0'} variant={'light'} color={'warning'}>
    <System size={'xs'} />
  </Button>
  <Button className={'aspect-square !px-0'} variant={'subtle'} color={'success'}>
    <Check size={'xs'} />
  </Button>
</div>`}
    />
  );
};

export const LoadingState = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button loading loadingText={'Loading'}>
            Loading
          </Button>
          <Button active>Active</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Button disabled>Disabled</Button>
  <Button loading>Loading</Button>
  <Button loading loadingText={'Loading'}>
    Loading
  </Button>
  <Button active>Active</Button>
  <Button fullWidth>Full Width</Button>
</div>`}
    />
  );
};
