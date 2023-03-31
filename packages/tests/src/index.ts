import { render, renderHook } from '@testing-library/react';

import { mockImage } from './mocks/image';
import MatchMediaMock from './mocks/machMedia';

export * from './a11y/a11y';

export { MatchMediaMock, mockImage };

export const testRender = render;

export const testRenderHook = renderHook;
