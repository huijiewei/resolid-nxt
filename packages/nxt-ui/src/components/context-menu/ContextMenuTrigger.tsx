import { __DEV__, dataAttr } from '@resolid/nxt-utils';
import { cloneElement, useEffect, useRef, type ReactElement } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';
import { useFloatingReference } from '../floating/FloatingReferenceContext';

type ContextMenuTriggerProps = {
  children?: ReactElement;
};

export const ContextMenuTrigger = primitiveComponent<'div', ContextMenuTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { setPositionReference, opened } = useFloatingReference();
  const { open } = useFloatingDispatch();

  const contextRef = useRef<HTMLElement>();

  useEffect(() => {
    const elem = contextRef.current ?? window;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleContextMenu = (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      setPositionReference({
        getBoundingClientRect() {
          return {
            height: 0,
            width: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            right: e.clientX,
            bottom: e.clientY,
            left: e.clientX,
          };
        },
      });

      open?.();
    };

    elem.addEventListener('contextmenu', handleContextMenu);

    return () => {
      elem.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [open, setPositionReference]);

  const refs = useMergedRefs(contextRef, ref);

  if (children) {
    return cloneElement(children, {
      'data-active': dataAttr(opened),
      ref: refs,
      ...rest,
    });
  }

  return null;
});

if (__DEV__) {
  ContextMenuTrigger.displayName = 'ContextMenuTrigger';
}
