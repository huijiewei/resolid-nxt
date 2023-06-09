import { Button, ButtonGroup, type ButtonProps } from '@resolid/nxt-ui';
import { Check } from '~/common/icons/Check';
import { Github } from '~/common/icons/Github';
import { Menu } from '~/common/icons/Menu';
import { Moon } from '~/common/icons/Moon';
import { Plus } from '~/common/icons/Plus';
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
            <Sun className={'me-1.5'} />
            Sun
          </Button>
          <Button variant={'outline'}>
            <Moon className={'me-1.5'} />
            Moon
          </Button>
          <Button variant={'light'}>
            Menu
            <Menu className={'ms-1.5'} />
          </Button>
          <Button className={'aspect-square !px-0'}>
            <Menu />
          </Button>
          <Button className={'aspect-square !px-0'} variant={'outline'} color={'neutral'}>
            <Github />
          </Button>
          <Button className={'aspect-square !px-0'} variant={'light'} color={'warning'}>
            <System />
          </Button>
          <Button className={'aspect-square !px-0'} variant={'subtle'} color={'success'}>
            <Check />
          </Button>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3'}>
  <Button>
    <Sun className={'me-1.5'} />
    Sun
  </Button>
  <Button variant={'outline'}>
    <Moon className={'me-1.5'} />
    Moon
  </Button>
  <Button variant={'light'}>
    Menu
    <Menu className={'ms-1.5'} />
  </Button>
  <Button className={'aspect-square !px-0'}>
    <Menu />
  </Button>
  <Button className={'aspect-square !px-0'} variant={'outline'} color={'neutral'}>
    <Github />
  </Button>
  <Button className={'aspect-square !px-0'} variant={'light'} color={'warning'}>
    <System />
  </Button>
  <Button className={'aspect-square !px-0'} variant={'subtle'} color={'success'}>
    <Check />
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

export const Grouping = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row items-center gap-3'}>
          <ButtonGroup>
            <Button>Save</Button>
            <Button className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup disabled>
            <Button>Save</Button>
            <Button className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>Save</Button>
            <Button variant="outline" className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button>Save</Button>
            <Button color={'neutral'} className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="outline">
            <Button>Save</Button>
            <Button className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="light">
            <Button>Save</Button>
            <Button className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup vertical>
            <Button>Save</Button>
            <Button color={'success'} className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup vertical variant="outline">
            <Button>Save</Button>
            <Button className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
          <ButtonGroup vertical variant="light">
            <Button>Save</Button>
            <Button className={'aspect-square !px-0'}>
              <Plus />
            </Button>
          </ButtonGroup>
        </div>
      )}
      snippet={`<div className={'flex flex-row items-center gap-3'}>
  <ButtonGroup>
    <Button>Save</Button>
    <Button className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup disabled>
    <Button>Save</Button>
    <Button className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button>Save</Button>
    <Button variant="outline" className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button>Save</Button>
    <Button color={'neutral'} className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup variant="outline">
    <Button>保存</Button>
    <Button className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup variant="light">
    <Button>Save</Button>
    <Button className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup vertical>
    <Button>Save</Button>
    <Button color={'success'} className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup vertical variant="outline">
    <Button>Save</Button>
    <Button className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
  <ButtonGroup vertical variant="light">
    <Button>Save</Button>
    <Button className={'aspect-square !px-0'}>
      <Plus />
    </Button>
  </ButtonGroup>
</div>`}
    />
  );
};
