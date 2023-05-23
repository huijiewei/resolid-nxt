import { useCallback, useRef, type DependencyList } from 'react';
import { useIsomorphicEffect } from '../use-isomorphic-effect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCallbackRef = <T extends (...args: any[]) => any>(
  callback: T | undefined,
  deps: DependencyList = []
): T => {
  const ref = useRef(callback);

  useIsomorphicEffect(() => {
    ref.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => ref.current?.(...args)) as T, deps);
};
