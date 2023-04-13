import { createElement, useEffect, useRef, useState, type ReactElement } from 'react';

import type { RunnerOptions } from '../utils/running';
import { Runner } from './Runner';

export type UseRunnerProps = RunnerOptions & {
  disableCache?: boolean;
};

export type UseRunnerReturn = {
  element: ReactElement | null;
  error: string | null;
};

export const useRunner = ({ code, scope, disableCache }: UseRunnerProps): UseRunnerReturn => {
  const isMountRef = useRef(true);
  const elementRef = useRef<ReactElement | null>(null);

  const [state, setState] = useState<UseRunnerReturn>(() => {
    const element = createElement(Runner, {
      code,
      scope,
      onRendered: (error) => {
        if (error) {
          setState({
            element: disableCache ? null : elementRef.current,
            error: error.toString(),
          });
        } else {
          elementRef.current = element;
        }
      },
    });
    return { element, error: null };
  });

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false;
      return;
    }

    const element = createElement(Runner, {
      code,
      scope,
      onRendered: (error) => {
        if (error) {
          setState({
            element: disableCache ? null : elementRef.current,
            error: error.toString(),
          });
        } else {
          elementRef.current = element;
        }
      },
    });
    setState({ element, error: null });
  }, [code, scope, disableCache]);

  return state;
};
