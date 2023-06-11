import { useRouteLoaderData } from 'react-router-dom';
import { type SessionUser } from '~/foundation/session';

export const useSessionUser = () => {
  const { user } = useRouteLoaderData('root') as { user: SessionUser | null };

  return user;
};
