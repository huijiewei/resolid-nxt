import { type HelmetServerState } from 'react-helmet-async';

export const processHelmet = (startHtml: string, helmet: HelmetServerState | undefined): string => {
  if (!helmet) {
    return startHtml;
  }

  const heads = [
    helmet.title.toString(),
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ];

  return startHtml.replace('<!-- helmet -->', heads.join(''));
};
