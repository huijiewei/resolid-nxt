import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import ResolidBanner from '~/assets/images/resolid-banner.svg';

export const Component = () => {
  return (
    <>
      <header className={'fixed inset-x-0 z-10 w-full border-b border-gray-100 bg-white/80 backdrop-blur'}>
        <nav className={'desktop:max-w-7xl mx-auto flex items-center justify-between p-4'}>
          <div className={'flex flex-row items-center'}>
            <img height={32} width={129} alt={'Resolid Nxt'} src={ResolidBanner} />
          </div>
        </nav>
      </header>
      <div className={'desktop:max-w-7xl mx-auto pt-16'}>
        <main>
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
};
