import { __DEV__, dataAttr } from '@resolid/nxt-utils';
import { cloneElement, type ReactElement } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useMenuReference } from './MenuContext';

type MenuTriggerProps = {
  children: ReactElement;
};

export const MenuTrigger = primitiveComponent<'div', MenuTriggerProps>((props, ref) => {
  const { children, ...rest } = props;

  const { setReference, getReferenceProps, opened } = useMenuReference();

  const refs = useMergedRefs(ref, setReference);

  return cloneElement(children, {
    'data-active': dataAttr(opened),
    ...getReferenceProps({
      ...rest,
      ref: refs,
    }),
  });
});

if (__DEV__) {
  MenuTrigger.displayName = 'MenuTrigger';
}
