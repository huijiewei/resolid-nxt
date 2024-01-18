import { useState, type PropsWithChildren } from 'react';
import { AuthUserDispatchProvider, AuthUserStateProvider } from '~/extensions/auth/AuthUserContext';
import type { SessionUser } from '~/foundation/session';

export const AuthUserProvider = ({ children, user }: PropsWithChildren<{ user: SessionUser | null }>) => {
  const [authUserState, setAuthUserState] = useState<SessionUser | null>(user);

  return (
    <AuthUserDispatchProvider
      value={{ setUser: (user) => setAuthUserState(user), resetUser: () => setAuthUserState(null) }}
    >
      <AuthUserStateProvider value={authUserState}>{children}</AuthUserStateProvider>
    </AuthUserDispatchProvider>
  );
};
