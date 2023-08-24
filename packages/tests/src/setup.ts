import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import { toHaveNoViolations } from './a11y/axe';

import '@testing-library/jest-dom/vitest';

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});
