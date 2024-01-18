import { createContext } from '@resolid/nxt-ui';

export enum AuthModalAction {
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
}

type AuthModalDispatchContext = (action: AuthModalAction) => void;

const [AuthModalDispatchProvider, useAuthModalDispatch] = createContext<AuthModalDispatchContext | undefined>({
  name: 'AuthModalDispatchContext',
  strict: false,
});

export { AuthModalDispatchProvider, useAuthModalDispatch };
