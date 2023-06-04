import { slugify } from '@resolid/nxt-utils';
import { MDXRemote, type MDXRemoteProps, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useTranslation } from 'react-i18next';
import { Edit } from '~/common/icons/Edit';
import { Github } from '~/common/icons/Github';
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
  const { t } = useTranslation('site');

  return (
    <div className={'flex justify-between'}>
      <article className={'desktop:w-[calc(100%-14rem)] w-full max-w-none px-2'}>
        <div className={'flex flex-row items-center justify-between mb-3 mt-2'}>
          <h1 className={'text-[1.75em] font-bold'}>{data.matter.title}</h1>
          {data.links.source && (
            <a
              className={'hover:underline inline-flex flex-row items-center'}
              target={'_blank'}
              href={data.links.source}
              rel="noreferrer"
            >
              <Github className={'me-1'} />
              {t('link.viewSource')}
            </a>
          )}
        </div>
        {data.matter.description && <p className={'my-4'}>{data.matter.description}</p>}
        <MDXRemote {...source} components={components} />
        <p className={'my-4'}>
          <a
            className={'hover:underline inline-flex flex-row items-center'}
            target={'_blank'}
            href={data.links.document}
            rel="noreferrer"
          >
            <Edit className={'mr-1'} />
            {t('link.editPage')}
          </a>
        </p>
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
