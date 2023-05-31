import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import type { PrismTheme } from '../code/CodeBlock';
import { useRunner, type UseRunnerProps } from '../runner/useRunner';
import { LiveContext } from './LiveContext';

export type LiveProviderProps = Omit<UseRunnerProps, 'code'> & {
  code?: string;
  theme: PrismTheme;
  language?: string;
  children?: ReactNode;
  transformCode?: (code: string) => string;
};

export const LiveProvider = ({
  children,
  code: initialCode = '',
  transformCode,
  language = 'jsx',
  theme,
  ...rest
}: LiveProviderProps) => {
  const [code, onChange] = useState(initialCode);

  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    ...rest,
  });

  useEffect(() => {
    onChange(initialCode);
  }, [initialCode]);

  return (
    <LiveContext.Provider value={{ element, error, code, onChange, language, theme }}>{children}</LiveContext.Provider>
  );
};
