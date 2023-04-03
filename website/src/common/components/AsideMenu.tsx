import { NavLink } from 'react-router-dom';
import { cx } from '@resolid/nxt-utils';

export type Menu = {
  label: string;
  path?: string;
  children?: Menu[];
};

const MenuItem = ({ menu, depth }: { menu: Menu; depth: number }) => {
  return (
    <li>
      {menu.path ? (
        <NavLink
          className={({ isActive }) => {
            return cx(
              'block py-1',
              depth == 2 && 'ps-4',
              isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 active:bg-gray-200'
            );
          }}
          to={menu.path}
        >
          {menu.label}
        </NavLink>
      ) : (
        <h5 className={depth > 1 ? 'mb-1 ps-4 font-normal text-gray-400' : 'mb-2'}>{menu.label}</h5>
      )}
      {menu.children && (
        <ul className={'space-y-1'}>
          {menu.children.map((child) => (
            <MenuItem depth={depth + 1} menu={child} key={child.label} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const AsideMenu = ({ menus }: { menus: Menu[] }) => {
  return (
    <ul className={'space-y-3 p-4'}>
      {menus.map((menu) => (
        <MenuItem menu={menu} depth={1} key={menu.label} />
      ))}
    </ul>
  );
};
