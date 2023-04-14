import type { PropsWithChildren } from 'react';
import { ColorModeProvider, useColorModeDispatch, useColorModeState } from './ColorModeProvider';

export { useColorModeState, useColorModeDispatch };

export const NxtProvider = ({ children }: PropsWithChildren) => {
  return <ColorModeProvider>{children}</ColorModeProvider>;
};
