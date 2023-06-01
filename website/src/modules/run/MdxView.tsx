import { useLoaderData } from '@resolid/nxt-run';
import { server$ } from '@resolid/nxt-run/server';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MdxView } from '~/common/mdx/MdxView';
import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { getMdxFileName, serializeMdx } from '~/common/utils/mdx';
import { i18n } from '~/i18n';

const mdxComponents = {
  ...shared,
};

export const loader = server$(async ({ params }) => {
  const filePath = join(process.cwd(), 'docs/run', params.category ?? 'getting-started');

  let file = join(filePath, getMdxFileName(params.document ?? '', params.lang, i18n.fallbackLng as string));

  if (!existsSync(file)) {
    file = join(filePath, getMdxFileName(params.document ?? ''));
  }

  if (!existsSync(file)) {
    throw new Response('Not Found', { status: 404 });
  }

  return await serializeMdx(readFileSync(file, 'utf-8'));
});

export const Component = () => {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation('site');

  return (
    <>
      <Helmet>
        <title>
          {data.data.matter.title ?? ''} - {t('menu.run')}
        </title>
      </Helmet>
      <MdxView source={data.source} data={data.data} components={mdxComponents} />
    </>
  );
};