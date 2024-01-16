import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AsideLayout } from '~/common/components/AsideLayout';
import { AsideLayoutMain } from '~/common/components/AsideLayoutMain';
import { AsideLayoutSide } from '~/common/components/AsideLayoutSide';
import { BaseLayout } from '~/common/components/BaseLayout';
import { LazyLoader } from '~/common/components/LazyLoader';
import { menus } from './menus';

export default function Layout() {
  return (
    <BaseLayout>
      <AsideLayout>
        <AsideLayoutSide menus={menus} namespace={'ui'} />
        <AsideLayoutMain>
          <Suspense fallback={<LazyLoader />}>
            <Outlet />
          </Suspense>
        </AsideLayoutMain>
      </AsideLayout>
    </BaseLayout>
  );
}
