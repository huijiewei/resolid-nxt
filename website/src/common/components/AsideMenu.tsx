import { NavLink } from 'react-router-dom';
import { cx } from '@resolid/nxt-utils';

export type Menu = {
  label: string;
  path?: string;
  children?: Menu[];
};

const MenuItem = (props: { menu: Menu; depth: number }) => {
  return (
    <li>
      {props.menu.path ? (
        <NavLink
          className={({ isActive }) => {
            return cx(
              `block py-1 pl-${props.depth * 2}`,
              isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 active:bg-gray-200'
            );
          }}
          to={props.menu.path}
        >
          {props.menu.label}
        </NavLink>
      ) : (
        <h5 className={props.depth > 1 ? `mb-1 font-normal text-gray-400 pl-${props.depth * 2}` : 'mb-2'}>
          {props.menu.label}
        </h5>
      )}
      {props.menu.children && (
        <ul className={'space-y-1'}>
          {props.menu.children.map((child) => (
            <MenuItem depth={props.depth + 1} menu={child} key={child.label} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const AsideMenu = (props: { menus: Menu[] }) => {
  return (
    <ul className={'space-y-3 p-4'}>
      {props.menus.map((menu) => (
        <MenuItem menu={menu} depth={1} key={menu.label} />
      ))}
    </ul>
  );
};
