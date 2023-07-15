import { testA11y, testRender } from '@resolid/nxt-tests';
import { describe, expect, test } from 'vitest';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from './Alert';

describe('Alert', () => {
  test('passes a11y test', async () => {
    await testA11y(
      <Alert>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>,
    );
  });

  test("should have role='alert'", async () => {
    const { getByRole } = testRender(
      <Alert>
        <AlertIcon />
        <AlertTitle>Alert title</AlertTitle>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>,
    );

    expect(getByRole('alert')).toBeInTheDocument();
  });
});
