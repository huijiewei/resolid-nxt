import { Suspense, lazy, useEffect, useState, type PropsWithChildren, type ReactNode } from 'react';
import { LazyLoader } from '~/common/components/LazyLoader';

const demos = import.meta.glob<boolean, string, { [key: string]: () => JSX.Element }>('../demos/**/*.tsx');

const SuspenseHelper = ({ fallback, children }: PropsWithChildren<{ fallback: ReactNode }>) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return <Suspense fallback={fallback}>{!mounted ? fallback : children}</Suspense>;
};

export const MdxDemo = ({ file, demo, height }: { file: string; demo: string; height?: number }) => {
  const DemoComponent = lazy(() => demos[`../demos/${file}`]().then((module) => ({ default: module[demo] })));

  return (
    <SuspenseHelper fallback={<LazyLoader height={height} />}>
      <DemoComponent />
    </SuspenseHelper>
  );
};
