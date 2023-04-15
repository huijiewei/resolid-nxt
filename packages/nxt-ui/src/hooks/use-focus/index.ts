import { useRef, useState, type RefObject } from 'react';
import { useEventListener } from '../use-event-listener';

export const useFocus = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [focused, setFocused] = useState(false);

  useEventListener('focus', () => setFocused(true), ref);
  useEventListener('blur', () => setFocused(false), ref);

  return [ref, focused];
};
