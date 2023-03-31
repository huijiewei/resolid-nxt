import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './a11y/axe';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});
