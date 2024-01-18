// noinspection JSUnusedGlobalSymbols

import { type Router } from '@remix-run/router';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

export const RunClient = ({ router }: { router: Router }) => {
  return (
    <HelmetProvider>
      <RouterProvider future={{ v7_startTransition: true }} router={router} fallbackElement={null} />
    </HelmetProvider>
  );
};
