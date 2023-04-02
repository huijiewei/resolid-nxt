import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Suspense } from 'react';

import './root.css';

export default function Root() {
  return (
    <>
      <Helmet prioritizeSeoTags></Helmet>
      <Suspense>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </>
  );
}
