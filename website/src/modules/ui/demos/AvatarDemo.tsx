import { Avatar, AvatarBadge, AvatarGroup } from '@resolid/nxt-ui';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3'}>
          <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
          <Avatar name={'Alex Suprun'} src={''} />
          <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
          <Avatar name={'Linh Le'} src={''} />
          <Avatar src={'https://nxt.resolid.tech/images/a003.jpg'} />
          <Avatar src={''} />
        </div>
      )}
      snippet={`<div className={'grid grid-cols-4 gap-3'}>
  <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
  <Avatar name={'Alex Suprun'} src={''} />
  <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
  <Avatar name={'Linh Le'} src={''} />
  <Avatar src={'https://nxt.resolid.tech/images/a003.jpg'} />
  <Avatar src={''} /></div>`}
    />
  );
};

export const Sizes = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3 items-center'}>
          <Avatar size={'xs'} name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
          <Avatar size={'sm'} name={'Alex Suprun'} src={''} />
          <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
          <Avatar size={'lg'} src={''} />
          <Avatar size={'xl'} name={'Linh Le'} src={''} />
          <Avatar size={128} src={'https://nxt.resolid.tech/images/a002.jpg'} />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3 items-center'}>
  <Avatar size={'xs'} name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
  <Avatar size={'sm'} name={'Alex Suprun'} src={''} />
  <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
  <Avatar size={'lg'} src={''} />
  <Avatar size={'xl'} name={'Linh Le'} src={''} />
  <Avatar size={128} src={'https://nxt.resolid.tech/images/a002.jpg'} />
</div>`}
    />
  );
};

export const Rounded = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3 items-center'}>
          <Avatar radius={'sm'} name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
          <Avatar radius name={'Alex Suprun'} src={''} />
          <Avatar radius={'lg'} src={'https://nxt.resolid.tech/images/a004.jpg'} />
          <Avatar radius={'xl'} src={''} />
          <Avatar radius={10} src={'https://nxt.resolid.tech/images/a003.jpg'} />
          <Avatar name={'Linh Le'} src={''} />
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3 items-center'}>
  <Avatar radius={'sm'} name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
  <Avatar radius name={'Alex Suprun'} src={''} />
  <Avatar radius={'lg'} src={'https://nxt.resolid.tech/images/a004.jpg'} />
  <Avatar radius={'xl'} src={''} />
  <Avatar radius={10} src={'https://nxt.resolid.tech/images/a003.jpg'} />
  <Avatar name={'Linh Le'} src={''} />
</div>`}
    />
  );
};

export const Badge = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3 items-center'}>
          <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'}>
            <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-success-emphasis'} />
          </Avatar>
          <Avatar name={'Alex Suprun'} src={''}>
            <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-warning-emphasis'} />
          </Avatar>
          <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'}>
            <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-danger-emphasis'} />
          </Avatar>
          <Avatar src={''}>
            <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-primary-emphasis'} />
          </Avatar>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-3 items-center'}>
  <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'}>
    <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-success-emphasis'} />
  </Avatar>
  <Avatar name={'Alex Suprun'} src={''}>
    <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-warning-emphasis'} />
  </Avatar>
  <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'}>
    <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-danger-emphasis'} />
  </Avatar>
  <Avatar src={''}>
    <AvatarBadge className={'border-[3px] h-5 w-5 border-bg-subtle bg-bg-primary-emphasis'} />
  </Avatar>
</div>`}
    />
  );
};

export const Group = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-5 items-center'}>
          <AvatarGroup limit={5}>
            <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
            <Avatar name={'Alex Suprun'} src={''} />
            <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
            <Avatar name={'Linh Le'} src={''} />
            <Avatar src={'https://nxt.resolid.tech/images/a003.jpg'} />
            <Avatar src={''} />
          </AvatarGroup>
          <AvatarGroup size={'lg'} limit={7}>
            <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
            <Avatar name={'Alex Suprun'} src={''} />
            <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
            <Avatar name={'Linh Le'} src={''} />
            <Avatar src={'https://nxt.resolid.tech/images/a003.jpg'} />
            <Avatar src={''} />
          </AvatarGroup>
        </div>
      )}
      snippet={`<div className={'flex flex-row gap-5 items-center'}>
  <AvatarGroup limit={5}>
    <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
    <Avatar name={'Alex Suprun'} src={''} />
    <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
    <Avatar name={'Linh Le'} src={''} />
    <Avatar src={'https://nxt.resolid.tech/images/a003.jpg'} />
    <Avatar src={''} />
  </AvatarGroup>
  <AvatarGroup size={'lg'} limit={7}>
    <Avatar name={'Alexander Hipp'} src={'https://nxt.resolid.tech/images/a001.jpg'} />
    <Avatar name={'Alex Suprun'} src={''} />
    <Avatar src={'https://nxt.resolid.tech/images/a004.jpg'} />
    <Avatar name={'Linh Le'} src={''} />
    <Avatar src={'https://nxt.resolid.tech/images/a003.jpg'} />
    <Avatar src={''} />
  </AvatarGroup>
</div>`}
    />
  );
};
