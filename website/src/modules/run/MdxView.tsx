import { useLoaderData } from '@resolid/nxt-run';
import { server$ } from '@resolid/nxt-run/server';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MdxView } from '~/common/mdx/MdxView';
import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { getMdxFileName, mdxHeaders, responseMdx, serializeMdx } from '~/common/utils/mdx';
import { getLocale } from '~/extensions/localized-link/localizedLinkUtils';
import { DEFAULT_LOCALE } from '~/i18n';

const mdxComponents = {
  ...shared,
};

export const loader = server$(async ({ params, request }) => {
  const cwd = process.cwd();
  const filePath = join(cwd, 'docs/run', params.category ?? 'getting-started');

  let file = join(filePath, getMdxFileName(params.document ?? '', getLocale(request), DEFAULT_LOCALE));

  if (!existsSync(file)) {
    file = join(filePath, getMdxFileName(params.document ?? ''));
  }

  if (!existsSync(file)) {
    throw new Response('Not Found', { status: 404 });
  }

  const mdx = await serializeMdx(readFileSync(file, 'utf-8'), { document: file.replace(cwd, 'website') });

  return responseMdx(mdx);
});

export const headers = server$(() => {
  return mdxHeaders;
});

export const Component = () => {
  const { mdx } = useLoaderData<typeof loader>();
  const { t } = useTranslation('site');

  return (
    <>
      <Helmet>
        <title>
          {mdx.data.matter.title ?? ''} - {t('menu.run')}
        </title>
      </Helmet>
      <MdxView source={mdx.source} data={mdx.data} components={mdxComponents} />
    </>
  );
};
