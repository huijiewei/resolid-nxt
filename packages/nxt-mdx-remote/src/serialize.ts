// noinspection JSUnusedGlobalSymbols

import { compile, type CompileOptions } from '@mdx-js/mdx';
import { VFile, type VFileCompatible } from 'vfile';
import { matter } from 'vfile-matter';
import { createFormattedMDXError } from './format-mdx-error';
import { removeImportsExportsPlugin } from './plugins/remove-imports-exports';
import type { MDXRemoteSerializeResult, SerializeOptions } from './types';

const getCompileOptions = (mdxOptions: SerializeOptions['mdxOptions'] = {}, rsc: boolean = false): CompileOptions => {
  const remarkPlugins = [...(mdxOptions.remarkPlugins || []), ...[removeImportsExportsPlugin]];

  return {
    ...mdxOptions,
    remarkPlugins,
    outputFormat: 'function-body',
    // Disable the importSource option for RSC to ensure there's no `useMDXComponents` implemented.
    providerImportSource: rsc ? undefined : '@mdx-js/react',
  };
};

export const serialize = async <TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
  source: VFileCompatible,
  { scope = {}, mdxOptions = {}, parseFrontmatter = false }: SerializeOptions = {},
  rsc: boolean = false,
): Promise<MDXRemoteSerializeResult<TScope, TFrontmatter>> => {
  const vfile = new VFile(source);

  if (parseFrontmatter) {
    matter(vfile, { strip: true });
  }

  let compiledMdx: VFile;

  try {
    compiledMdx = await compile(vfile, getCompileOptions(mdxOptions, rsc));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw createFormattedMDXError(error, String(vfile));
  }

  const compiledSource = String(compiledMdx);

  return {
    compiledSource,
    frontmatter: (vfile.data.matter ?? {}) as TFrontmatter,
    scope: scope as TScope,
  };
};
