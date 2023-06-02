import { useLoaderData } from '@resolid/nxt-run';
import { server$ } from '@resolid/nxt-run/server';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MdxView } from '~/common/mdx/MdxView';
import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { getMdxFileName, responseMdx, serializeMdx } from '~/common/utils/mdx';
import { i18n } from '~/i18n';
import { MdxColorPalette } from '~/modules/ui/components/MdxColorPalette';
import { MdxDemo } from '~/modules/ui/components/MdxDemo';
import { MdxPropsTable } from '~/modules/ui/components/MdxPropsTable';

const mdxComponents = {
  ...shared,
  ColorPalette: MdxColorPalette,
  Demo: MdxDemo,
  PropsTable: MdxPropsTable,
};

export const loader = server$(async ({ params }) => {
  const cwd = process.cwd();

  const filePath = join(cwd, 'docs/ui', params.document ? 'documents' : 'components');

  let file = join(
    filePath,
    getMdxFileName(params.document ?? params.component ?? '', params.lang, i18n.fallbackLng as string)
  );

  if (!existsSync(file)) {
    file = join(filePath, getMdxFileName(params.document ?? params.component ?? ''));
  }

  if (!existsSync(file)) {
    throw new Response('Not Found', { status: 404 });
  }

  let source = readFileSync(file, 'utf-8');
  const scope: Record<string, unknown> = {};

  if (params.component) {
    const matches = source.matchAll(/<PropsTable.*?component={['"](\w+)['"]}\s*\/>/gi);

    for (const match of matches) {
      const propsFile = join(cwd, 'docs/ui/props', `${match[1]}.json`);

      if (existsSync(propsFile)) {
        const scopeName = `componentProps${match[1]}`;
        scope[scopeName] = JSON.parse(readFileSync(propsFile, 'utf-8'));
        source = source.replace(match[0], match[0].replace('/>', `componentProps={${scopeName}} />`));
      }
    }
  }

  const mdx = await serializeMdx(source, scope);

  return responseMdx(mdx);
});

export const Component = () => {
  const { mdx } = useLoaderData<typeof loader>();
  const { t } = useTranslation('site');

  return (
    <>
      <Helmet>
        <title>
          {mdx.data.matter.title ?? ''} - {t('menu.ui')}
        </title>
      </Helmet>
      <MdxView source={mdx.source} data={mdx.data} components={mdxComponents} />
    </>
  );
};
