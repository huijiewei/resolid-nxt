import { cx } from '@resolid/nxt-ui';
import { useTranslation } from 'react-i18next';
import { useAsideLayoutDispatch } from '~/common/components/AsideLayoutContext';
import { LocalizedNavLink } from '~/extensions/localized-link/LocalizedLink';

export type Menu = {
  label: string;
  path?: string;
  children?: Menu[];
};

const MenuItem = ({ menu, depth, namespace }: { menu: Menu; depth: number; namespace: string }) => {
  const setOpen = useAsideLayoutDispatch();
  const { t } = useTranslation(namespace);

  return (
    <li>
      {menu.path ? (
        <LocalizedNavLink
          className={({ isActive }) => {
            return cx(
              'block py-1',
              depth == 2 && 'ps-4',
              isActive ? 'bg-bg-primary' : 'hover:bg-bg-subtle active:bg-bg-muted',
            );
          }}
          onClick={() => setOpen(false)}
          to={menu.path}
        >
          {t(menu.label)}
        </LocalizedNavLink>
      ) : (
        <h5 className={depth > 1 ? 'mb-1 ps-4 font-normal' : 'mb-2 font-medium'}>{t(menu.label)}</h5>
      )}
      {menu.children && (
        <ul className={'space-y-1'}>
          {menu.children.map((child) => (
            <MenuItem depth={depth + 1} menu={child} namespace={namespace} key={child.label} />
          ))}
        </ul>
      )}
    </li>
  );
};

export type AsideLayoutMenuProps = {
  menus: Menu[];
  namespace: string;
};

export const AsideLayoutMenu = ({ menus, namespace }: AsideLayoutMenuProps) => {
  return (
    <ul className={'space-y-3 p-4'}>
      {menus.map((menu) => (
        <MenuItem menu={menu} depth={1} key={menu.label} namespace={namespace} />
      ))}
    </ul>
  );
};
