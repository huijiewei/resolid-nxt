import type { PropsWithChildren } from 'react';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <div className={'p-4'}>{children}</div>;
};
