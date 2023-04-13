import { cx } from '@resolid/nxt-utils';
import { useAsideLayoutDispatch, useAsideLayoutState } from '~/common/components/AsideLayout';
import { Close } from '~/common/icons/Close';
import { AsideMenu, type Menu } from './AsideMenu';

export const Aside = (props: { menus: Menu[] }) => {
  const opened = useAsideLayoutState();
  const setOpened = useAsideLayoutDispatch();

  return (
    <aside
      className={cx(
        'scrollbar scrollbar-thin overflow-y-auto overflow-x-hidden overscroll-contain',
        'fixed bottom-0 top-16 w-56 border-e bg-white',
        'tablet:z-0 z-10',
        'tablet:translate-x-0 transition-transform duration-200',
        opened ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav role={'navigation'} className={'relative'}>
        <button onClick={() => setOpened(false)} className={'tablet:hidden fixed end-3 top-3 p-2'}>
          <Close size={'xs'} />
        </button>
        <AsideMenu menus={props.menus} />
      </nav>
    </aside>
  );
};
