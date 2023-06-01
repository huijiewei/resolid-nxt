import remarkHeadings, { type Heading } from '@vcarl/remark-headings';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { VFile } from 'vfile';

export const getMdxFileName = (document: string, lang?: string, fallbackLng?: string) => {
  if (!lang || lang == fallbackLng) {
    return `${document}.mdx`;
  }

  return `${document}.${lang}.mdx`;
};

export type MdxData = {
  matter: { title?: string; description?: string };
  headings: Heading[];
};

export const serializeMdx = async (
  source: string,
  scope?: Record<string, unknown>
): Promise<{ source: MDXRemoteSerializeResult; data: MdxData }> => {
  const vfile = new VFile(source);

  const mdxSource = await serialize(vfile, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm, remarkHeadings],
      format: 'mdx',
    },
    scope: scope,
  });

  return { source: mdxSource, data: vfile.data as MdxData };
};
