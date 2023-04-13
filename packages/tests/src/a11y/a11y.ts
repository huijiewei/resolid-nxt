import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { isValidElement, type ReactElement } from 'react';
import { expect } from 'vitest';
import { axe, type AxeConfigureOptions } from './axe';

export const testA11y = async (
  ui: ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: AxeConfigureOptions } = {}
) => {
  const { axeOptions, ...rest } = options;
  const container = isValidElement(ui) ? render(ui, rest).container : ui;
  const results = await axe(container as HTMLElement, axeOptions);

  expect(results).toHaveNoViolations();
};
