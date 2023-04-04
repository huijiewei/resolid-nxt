import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '@resolid/nxt-utils';

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
