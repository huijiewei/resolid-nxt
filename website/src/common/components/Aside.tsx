import { AsideMenu, type Menu } from './AsideMenu';

export const Aside = (props: { menus: Menu[] }) => {
  return (
    <aside
      className={
        'scrollbar scrollbar-thin fixed bottom-0 top-16 w-60 overflow-y-auto overflow-x-hidden overscroll-contain'
      }
    >
      <nav role={'navigation'}>
        <AsideMenu menus={props.menus} />
      </nav>
    </aside>
  );
};
