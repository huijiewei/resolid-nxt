import { Tooltip, noScrollbarsClassName } from '@resolid/nxt-ui';
import { cx } from '@resolid/nxt-utils';
import { Suspense, useState, type MouseEventHandler } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Banner } from '~/common/components/Banner';
import { LazyLoader } from '~/common/components/LazyLoader';
import { ThemeSwitcher } from '~/common/components/ThemeSwitcher';
import { Close } from '~/common/icons/Close';
import { Github } from '~/common/icons/Github';
import { Menu } from '~/common/icons/Menu';

const NavMenu = ({ onClick }: { onClick: MouseEventHandler<HTMLAnchorElement> }) => {
  return (
    <ul className="tablet:flex-row tracking-wide tablet:max-w-none tablet:p-0 mx-auto flex max-w-xs flex-col p-4 font-medium">
      {[
        { name: 'Home', href: '', end: true },
        { name: 'Run', href: 'run' },
        { name: 'UI', href: 'ui' },
        { name: 'Forum', href: 'forum' },
        { name: 'Blog', href: 'blog' },
        { name: 'About', href: 'about' },
      ].map((link) => (
        <li key={link.name}>
          <NavLink
            end={link.end}
            to={link.href}
            onClick={onClick}
            className={({ isActive }) => {
              return cx('tablet:px-4 block p-2 hover:text-link-pressed', isActive && 'text-link');
            }}
          >
            <span>{link.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Header = () => {
  const [opened, setOpened] = useState(false);

  return (
    <header
      className={cx('fixed inset-x-0 z-20 w-full border-b bg-bg-default/75 backdrop-blur', noScrollbarsClassName)}
    >
      <nav className={'desktop:max-w-7xl mx-auto flex h-16 items-center justify-between px-4'}>
        <div className={'tablet:hidden flex flex-1'}>
          <button title={'Menu'} className={'p-2'} onClick={() => setOpened((prev) => !prev)}>
            {opened ? <Close size={'sm'} /> : <Menu size={'sm'} />}
          </button>
        </div>
        <div className={'tablet:justify-between flex flex-1 items-center justify-center'}>
          <Link to={'/'}>
            <Banner />
          </Link>
        </div>
        <div className={'flex flex-1 items-center justify-end gap-4'}>
          <div
            className={cx(
              'tablet:block tablet:relative tablet:top-0 tablet:h-auto absolute inset-x-0 top-[calc(4rem+1px)] z-20 h-screen bg-bg-default tablet:bg-inherit p-0',
              opened ? 'block' : 'hidden'
            )}
          >
            <NavMenu onClick={() => setOpened(false)} />
          </div>
          <div className={'flex flex-row items-center gap-1'}>
            <ThemeSwitcher />
            <Tooltip placement={'bottom'} content={'Go to Resolid Nxt on Github'}>
              <a
                className={'p-2 hover:text-link'}
                rel="noreferrer"
                target="_blank"
                aria-label={'Go to Resolid Nxt on Github'}
                href="https://github.com/resolid/nxt"
              >
                <Github size={'sm'} />
              </a>
            </Tooltip>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default function SiteLayout() {
  return (
    <>
      <Header />
      <div className={'pt-16'}>
        <Suspense fallback={<LazyLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
