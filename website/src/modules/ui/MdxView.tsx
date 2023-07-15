import { useLoaderData } from '@resolid/nxt-run';
import { server$ } from '@resolid/nxt-run/server';
import { kebabCase } from '@resolid/nxt-utils';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getLocale } from '~/common/components/LocalizedLink';
import { MdxView } from '~/common/mdx/MdxView';
import { mdxComponents as shared } from '~/common/mdx/mdxComponents';
import { getMdxFileName, mdxHeaders, responseMdx, serializeMdx } from '~/common/utils/mdx';
import { DEFAULT_LOCALE } from '~/i18n';
import { MdxColorPalette } from '~/modules/ui/components/MdxColorPalette';
import { MdxDemo } from '~/modules/ui/components/MdxDemo';
import { MdxPropsTable } from '~/modules/ui/components/MdxPropsTable';

const mdxComponents = {
  ...shared,
  ColorPalette: MdxColorPalette,
  Demo: MdxDemo,
  PropsTable: MdxPropsTable,
};

export const loader = server$(async ({ params, request }) => {
  const cwd = process.cwd();

  const filePath = join(cwd, 'docs/ui', params.document ? 'documents' : 'components');

  let file = join(
    filePath,
    getMdxFileName(params.document ?? params.component ?? '', getLocale(request), DEFAULT_LOCALE),
  );

  if (!existsSync(file)) {
    file = join(filePath, getMdxFileName(params.document ?? params.component ?? ''));
  }

  if (!existsSync(file)) {
    throw new Response('Not Found', { status: 404 });
  }

  let source = readFileSync(file, 'utf-8');
  let sourcePath;
  const scope: Record<string, unknown> = {};

  if (params.component) {
    const matches = source.matchAll(/<PropsTable.*?component={['"](\w+)['"]}\s*\/>/gi);

    for (const match of matches) {
      const componentName = match[1];
      const propsFile = join(cwd, 'docs/ui/props', `${componentName}.json`);

      if (existsSync(propsFile)) {
        const scopeName = `componentProps${componentName}`;
        const json = JSON.parse(readFileSync(propsFile, 'utf-8'));

        if (kebabCase(componentName) == params.component) {
          sourcePath = `packages/nxt-ui/src/components${json.path}`;
        }

        scope[scopeName] = json.props;
        source = source.replace(match[0], match[0].replace('/>', `componentProps={${scopeName}} />`));
      }
    }
  }

  const mdx = await serializeMdx(source, { source: sourcePath, document: file.replace(cwd, 'website') }, scope);

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
          {mdx.data.matter.title ?? ''} - {t('menu.ui')}
        </title>
      </Helmet>
      <MdxView source={mdx.source} data={mdx.data} components={mdxComponents} />
    </>
  );
};
