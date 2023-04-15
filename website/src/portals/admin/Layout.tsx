import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';
import { LazyLoader } from '~/common/components/LazyLoader';

const Component = () => {
  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <h3>Admin Layout</h3>
      <ul>
        <li>
          <Link to={'/admin'}>Admin Home</Link>
        </li>
        <li>
          <Link to={'/admin/about'}>Admin About</Link>
        </li>
      </ul>
      <Suspense fallback={<LazyLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Component;
