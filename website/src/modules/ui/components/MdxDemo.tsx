import { lazy, Suspense } from 'react';

const demos = import.meta.glob<boolean, string, { [key: string]: () => JSX.Element }>('../demos/**/*.tsx');

export const MdxDemo = ({ file, demo }: { file: string; demo: string }) => {
  const DemoComponent = lazy(() => demos[`../demos/${file}`]().then((module) => ({ default: module[demo] })));

  return (
    <Suspense>
      <DemoComponent />
    </Suspense>
  );
};
