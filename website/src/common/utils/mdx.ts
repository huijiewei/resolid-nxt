import type { MDXRemoteSerializeResult } from '@resolid/nxt-mdx-remote';
import { serialize } from '@resolid/nxt-mdx-remote/serialize';
import remarkHeadings, { type Heading } from '@vcarl/remark-headings';
import { json } from 'react-router-dom';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { VFile } from 'vfile';

const MDX_CACHE_CONTROL = 'max-age=300, stale-while-revalidate=604800';
const MDX_GITHUB_URL = 'https://github.com/huijiewei/resolid-nxt/blob/main';

export const getMdxFileName = (document: string, lang?: string | null, fallbackLng?: string) => {
  if (!lang || lang == fallbackLng) {
    return `${document}.mdx`;
  }

  return `${document}.${lang}.mdx`;
};

export type MdxData = {
  matter: { title?: string; description?: string };
  headings: Heading[];
  links: {
    source?: string;
    document: string;
  };
};

export const serializeMdx = async (
  source: string,
  paths: { source?: string; document: string },
  scope?: Record<string, unknown>,
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

  return {
    source: mdxSource,
    data: {
      ...vfile.data,
      links: {
        source: paths.source && `${MDX_GITHUB_URL}/${paths.source}`,
        document: `${MDX_GITHUB_URL}/${paths.document}`,
      },
    } as MdxData,
  };
};

export const mdxHeaders = {
  'Cache-Control': MDX_CACHE_CONTROL,
  Vary: 'Cookie',
};

export const responseMdx = (mdx: { source: MDXRemoteSerializeResult; data: MdxData }) => {
  return json({ mdx }, { headers: { 'Cache-Control': MDX_CACHE_CONTROL } });
};
