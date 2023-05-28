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
        'scrollbar scrollbar-thin overflow-y-auto overflow-x-hidden overscroll-contain',
        'fixed bottom-0 top-16 w-56 border-e bg-bg-default tablet:bg-inherit',
        'tablet:z-0 z-10',
        'tablet:translate-x-0 transition-transform duration-200',
        opened ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav role={'navigation'} className={'relative'}>
        <CloseButton onClick={() => setOpened(false)} className={'tablet:hidden fixed end-2 top-2 p-2'} />
        <AsideLayoutMenu menus={menus} namespace={namespace} />
      </nav>
    </aside>
  );
};
