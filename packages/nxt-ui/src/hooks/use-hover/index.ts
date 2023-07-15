import { useRef, useState, type RefObject } from 'react';
import { useEventListener } from '../use-event-listener';

export const useHover = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [hovered, setHovered] = useState(false);

  useEventListener(
    'mouseenter',
    () => {
      setHovered(true);
    },
    ref,
  );
  useEventListener(
    'mouseleave',
    () => {
      setHovered(false);
    },
    ref,
  );

  return [ref, hovered];
};
