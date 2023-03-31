import { render, renderHook } from '@testing-library/react';

import { mockImage } from './mocks/image';

export * from './a11y/a11y';

export const mocks = {
  image: mockImage,
};

export const testRender = render;

export const testRenderHook = renderHook;
