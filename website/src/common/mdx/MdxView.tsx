import { slugify } from '@resolid/nxt-utils';
import { MDXRemote, type MDXRemoteProps, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { TocSection } from '~/common/mdx/TocSection';
import type { MdxData } from '~/common/utils/mdx';

export const MdxView = <
  TScope = Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TFrontmatter extends Record<string, any> = { title: string; description: string }
>({
  source,
  data,
  components,
}: {
  source: MDXRemoteSerializeResult<TScope, TFrontmatter>;
  data: MdxData;
  components: MDXRemoteProps['components'];
}) => {
  return (
    <div className={'flex justify-between'}>
      <article className={'desktop:w-[calc(100%-14rem)] w-full max-w-none px-2'}>
        <h1 className={'mb-3 mt-2 text-[1.75em] font-bold'}>{data.matter.title}</h1>
        {data.matter.description && <p className={'my-4'}>{data.matter.description}</p>}
        <MDXRemote {...source} components={components} />
      </article>
      <nav className={'desktop:block hidden w-52'}>
        <TocSection
          toc={data.headings
            .filter((h) => h.depth == 2 || h.depth == 3)
            .map((h) => ({ depth: h.depth, text: h.value, slug: slugify(h.value) }))}
        />
      </nav>
    </div>
  );
};
