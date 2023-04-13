import { isBrowser } from '@resolid/nxt-utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
