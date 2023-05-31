import { type ComponentType } from 'react';
import { LazyLoader } from '~/common/components/LazyLoader';
import { dynamicLoader } from '~/common/dynamic/dynamicLoader';

const demos = import.meta.glob<boolean, string, { [key: string]: ComponentType }>('../demos/**/*.tsx');

export const MdxDemo = ({ file, demo, height }: { file: string; demo: string; height?: number }) => {
  const Demo = dynamicLoader({
    loader: async () => ({ default: (await demos[`../demos/${file}`]())[demo] }),
    fallback: <LazyLoader height={height} />,
  });

  return <Demo />;
};
