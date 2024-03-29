import type { PropsWithChildren } from 'react';
import { ToastProvider, type ToastProviderProps } from '../toast/ToastProvider';
import { ColorModeProvider } from './ColorModeProvider';

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
