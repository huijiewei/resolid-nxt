import { __DEV__, dataAttr } from '@resolid/nxt-utils';
import { cloneElement, type ReactElement } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useFloatingReference } from './FloatingReferenceContext';

type FloatingTriggerProps = {
  children: ReactElement;
};

export const FloatingTrigger = primitiveComponent<'div', FloatingTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { setReference, getReferenceProps, opened } = useFloatingReference();

  const refs = useMergedRefs(setReference, ref);

  return cloneElement(children, {
    'data-active': dataAttr(opened),
    ref: refs,
    ...getReferenceProps({
      ...rest,
    }),
  });
});

if (__DEV__) {
  FloatingTrigger.displayName = 'FloatingTrigger';
}
