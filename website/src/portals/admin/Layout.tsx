import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuDivider,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@resolid/nxt-ui';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, useFetcher, useLocation } from 'react-router-dom';
import { Banner } from '~/common/components/Banner';
import { LazyLoader } from '~/common/components/LazyLoader';
import { LocaleSwitcher } from '~/common/components/LocaleSwitcher';
import { ThemeSwitcher } from '~/common/components/ThemeSwitcher';
import { Logout } from '~/common/icons/Logout';
import { Settings } from '~/common/icons/Settings';
import { UserCircle } from '~/common/icons/UserCircle';
import { getLoginTo, useAuthUserDispatch, useAuthUserState } from '~/extensions/auth/AuthUserContext';
import { LocalizedLink, LocalizedNavigate } from '~/extensions/localized-link/LocalizedLink';

const AdminNavUser = () => {
  const { t } = useTranslation('common');
  const user = useAuthUserState();
  const { resetUser } = useAuthUserDispatch();
  const fetcher = useFetcher();

  if (user) {
    return (
      <DropdownMenu placement={'bottom'}>
        <DropdownMenuTrigger>
          <Button className={'gap-1 !px-1'} variant={'subtle'} color={'neutral'}>
            <Avatar size={26} src={user.avatar} name={user.nickname} />
            <span>{user.nickname}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'z-50'}>
          <DropdownMenuArrow />
          <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
          <DropdownMenuItem as={LocalizedLink} to={`profile`}>
            <UserCircle className={'me-1.5'} />
            {t('profile')}
          </DropdownMenuItem>
          <DropdownMenuItem as={LocalizedLink} to={'settings'}>
            <Settings className={'me-1.5'} />
            {t('settings')}
          </DropdownMenuItem>
          <DropdownMenuDivider />
          <DropdownMenuItem
            onClick={() => {
              fetcher.submit(null, {
                method: 'post',
                action: '/api/auth/logout',
              });

              resetUser();
            }}
          >
            <Logout className={'me-1.5'} />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
};

export const Component = () => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const user = useAuthUserState();

  if (user == null) {
    const to = getLoginTo('../login', location);
    return <LocalizedNavigate to={to} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('administration')}</title>
      </Helmet>
      <div className={'flex bg-bg-subtlest'}>
        <div className={'sticky top-0 z-30 h-screen w-52 bg-bg-default'}>
          <div className={'flex h-12 items-center justify-center border-b border-b-bg-subtle'}>
            <LocalizedLink to={'/admin'}>
              <Banner />
            </LocalizedLink>
          </div>
          <div
            className={'h-[calc(100vh-3rem)] overflow-y-scroll border-e border-e-bg-subtle scrollbar scrollbar-thin'}
          >
            <ul className={'p-4'}>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu2</li>
            </ul>
          </div>
        </div>
        <div className={'flex w-full flex-col'}>
          <header
            className={
              'sticky top-0 z-30 flex h-12 items-center justify-between border-b border-b-bg-subtle bg-bg-default px-4'
            }
          >
            <div></div>
            <div className={'flex flex-row items-center gap-1'}>
              <LocaleSwitcher />
              <ThemeSwitcher />
              <AdminNavUser />
            </div>
          </header>
          <main className={'flex-grow p-4'}>
            <Suspense fallback={<LazyLoader />}>
              <Outlet />
            </Suspense>
          </main>
          <footer
            className={
              'flex items-center justify-between border-t border-t-bg-subtle bg-bg-default p-4 text-[13px] font-medium'
            }
          >
            <div>Copyright © 2024</div>
            <div>
              Proudly made in
              <span className={'mx-1'} aria-label="China" role="img">
                🇨🇳
              </span>
              by Resolid Tech
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
