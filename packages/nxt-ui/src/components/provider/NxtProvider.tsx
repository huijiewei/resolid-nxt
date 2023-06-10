import type { PropsWithChildren } from 'react';
import { ToastProvider, type ToastProviderProps } from '../toast/ToastProvider';
import { ColorModeProvider, useColorModeDispatch, useColorModeState } from './ColorModeProvider';

export { useColorModeDispatch, useColorModeState };

export type NxtProviderProps = {
  toastOptions?: ToastProviderProps;
};

export const NxtProvider = ({ children, toastOptions }: PropsWithChildren<NxtProviderProps>) => {
  return (
    <ColorModeProvider>
      <ToastProvider {...toastOptions}>{children}</ToastProvider>
    </ColorModeProvider>
  );
};
