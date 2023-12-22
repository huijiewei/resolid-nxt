// noinspection JSUnusedGlobalSymbols

import type { EntryContext } from './context';
import { components$ } from './context';

export const processHelmet = (startHtml: string, context: EntryContext): string => {
  const helmet = context.helmetContext?.helmet;

  if (helmet) {
    const heads = [
      helmet.title.toString(),
      helmet.priority.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
    ];

    startHtml = startHtml.replace('<!-- helmet -->', heads.join(''));
  }

  const links: string[] = [];

  const existHrefs: string[] = [];

  components$.getComponents().forEach((key) => {
    context.manifest?.[key]?.forEach((entry) => {
      if (!existHrefs.includes(entry.href)) {
        existHrefs.push(entry.href);

        if (entry.type == 'style' && !startHtml.includes(entry.href)) {
          links.push(`<link rel="stylesheet" href="${entry.href}" />`);
        }

        if (entry.type == 'script' && !startHtml.includes(entry.href)) {
          links.push(`<link rel="modulepreload" as="script" href="${entry.href}" />`);
        }
      }
    });
  });

  return startHtml.replace('<!-- links -->', links.join(''));
};
