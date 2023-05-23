import { isBrowser } from '@resolid/nxt-utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect = isBrowser() ? useLayoutEffect : useEffect;
