import { useMediaQuery } from './index';
import { MatchMediaMock, testRenderHook } from '@resolid/nxt-tests';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

describe('useMediaQuery', () => {
  let matchMedia: MatchMediaMock;

  beforeEach(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('should return true when the media query matches', () => {
    const query = '(min-width: 500px)';

    matchMedia.useMediaQuery(query);

    const { result } = testRenderHook(() => useMediaQuery(query));

    expect(result.current).toBe(true);
  });

  test('should return false when the media query does not match', () => {
    const query = '(max-width: 1000px)';

    matchMedia.useMediaQuery('(max-width: 500px)');

    const { result } = testRenderHook(() => useMediaQuery(query));

    expect(result.current).toBe(false);
  });

  test('should update the result when the media query changes', () => {
    matchMedia.useMediaQuery('(max-width: 500px)');

    const query = '(min-width: 768px)';

    matchMedia.useMediaQuery(query);

    const { result } = testRenderHook(() => useMediaQuery(query));

    expect(result.current).toBe(true);
  });
});
