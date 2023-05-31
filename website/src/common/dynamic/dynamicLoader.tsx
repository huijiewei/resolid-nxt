import { __DEV__ } from '@resolid/nxt-utils';
import { Suspense, lazy, type ComponentType } from 'react';

type DynamicLoaderProps = {
  loader: () => Promise<{ default: ComponentType }>;
  fallback: JSX.Element;
};

export const dynamicLoader = ({ loader, fallback }: DynamicLoaderProps) => {
  const Lazy = lazy(loader);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LoaderComponent = (props: any) => {
    return (
      <Suspense fallback={fallback}>
        <Lazy {...props} />
      </Suspense>
    );
  };

  if (__DEV__) {
    LoaderComponent.displayName = 'LoaderComponent';
  }

  return LoaderComponent;
};
