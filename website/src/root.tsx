import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Helmet prioritizeSeoTags defaultTitle={'Resolid Nxt'} titleTemplate={'%s - Resolid Nxt'}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Get your app up and running with React" />
        <meta name="keywords" content="react, react-router, tailwindcss, vite, typescript, framework" />
        <meta name="theme-color" content="#4586be" />
      </Helmet>
      <Suspense>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </>
  );
}
