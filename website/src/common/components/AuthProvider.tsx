import { createContext } from '@resolid/nxt-ui';
import { useState, type PropsWithChildren } from 'react';
import { AuthModal } from '~/common/components/AuthModal';

export enum AuthAction {
  NONE,
  MODAL,
  DIRECT,
}

type AuthDispatchContext = {
  setAction: (action: AuthAction) => void;
  resetAction: () => void;
};

const [AuthDispatchProvider, useAuthDispatch] = createContext<AuthDispatchContext>({
  name: 'AuthDispatchContext',
  strict: true,
});

export { useAuthDispatch };

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
