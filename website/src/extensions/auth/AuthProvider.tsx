import { useState, type PropsWithChildren } from 'react';
import { AuthAction, AuthDispatchProvider } from '~/extensions/auth/AuthContext';
import { AuthModal } from '~/extensions/auth/AuthModal';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authActionState, setAuthActionState] = useState<AuthAction>(AuthAction.NONE);

  const setAction = (action: AuthAction) => {
    setAuthActionState(action);
  };

  const resetAction = () => {
    setAuthActionState(AuthAction.NONE);
  };

  return (
    <AuthDispatchProvider value={{ setAction, resetAction }}>
      {children}
      <AuthModal opened={authActionState == AuthAction.MODAL} />
    </AuthDispatchProvider>
  );
};
