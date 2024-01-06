import type { CompileOptions } from '@mdx-js/mdx';

export interface SerializeOptions {
  scope?: Record<string, unknown>;
  mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'>;
  parseFrontmatter?: boolean;
}

export type MDXRemoteSerializeResult<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>> = {
  compiledSource: string;
  scope: TScope;
  frontmatter: TFrontmatter;
};
