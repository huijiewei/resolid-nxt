import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { LazyLoader } from '~/common/components/LazyLoader';
import { LocalizedLink } from '~/common/components/LocalizedLink';

export default function AdminLayout() {
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <h3>Admin Layout</h3>
      <ul>
        <li>
          <LocalizedLink to={'/admin'}>Admin Home</LocalizedLink>
        </li>
        <li>
          <LocalizedLink to={'/admin/about'}>Admin About</LocalizedLink>
        </li>
      </ul>
      <Suspense fallback={<LazyLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
