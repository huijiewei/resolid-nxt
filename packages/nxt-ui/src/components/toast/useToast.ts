import { useToastDispatch, type ToastId, type ToastOptions } from './ToastContext';

export type { ToastId, ToastOptions };

export const useToast = useToastDispatch;
