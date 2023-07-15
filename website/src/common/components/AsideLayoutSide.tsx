import { CloseButton } from '@resolid/nxt-ui';
import { cx } from '@resolid/nxt-utils';
import { useAsideLayoutDispatch, useAsideLayoutState } from '~/common/components/AsideLayout';
import { AsideLayoutMenu, type AsideLayoutMenuProps } from './AsideLayoutMenu';

export const AsideLayoutSide = ({ menus, namespace }: AsideLayoutMenuProps) => {
  const opened = useAsideLayoutState();
  const setOpened = useAsideLayoutDispatch();

  return (
    <aside
      className={cx(
        'overflow-y-auto overflow-x-hidden overscroll-contain scrollbar scrollbar-thin',
        'fixed bottom-0 top-16 w-56 border-e bg-bg-default tablet:bg-inherit',
        'z-10 tablet:z-0',
        'transition-transform duration-200 tablet:translate-x-0',
        opened ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <nav role={'navigation'} className={'relative'}>
        <CloseButton onClick={() => setOpened(false)} className={'fixed end-2 top-2 p-2 tablet:hidden'} />
        <AsideLayoutMenu menus={menus} namespace={namespace} />
      </nav>
    </aside>
  );
};
