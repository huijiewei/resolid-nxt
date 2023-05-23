import type { MutableRefObject } from 'react';
import { useIsomorphicEffect } from '../use-isomorphic-effect';

export type UseFormResetProps = {
  ref: MutableRefObject<HTMLElement | null>;
  handler: () => void;
};

const getClosestForm = (element: HTMLElement) => {
  return element.matches('textarea, input, select, button')
    ? (element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).form
    : element.closest('form');
};

export const useFormReset = ({ ref, handler }: UseFormResetProps) => {
  useIsomorphicEffect(() => {
    if (ref.current == null) {
      return;
    }

    const form = getClosestForm(ref.current);

    if (form == null) {
      return;
    }

    form.addEventListener('reset', handler, { passive: true });

    return () => {
      form.removeEventListener('reset', handler);
    };
  }, [handler, ref]);
};
