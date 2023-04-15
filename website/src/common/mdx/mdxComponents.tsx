import { cx } from '@resolid/nxt-utils';
import type { ComponentProps } from 'react';
import { Helmet } from 'react-helmet-async';
import { MdxCode } from '~/common/mdx/MdxPreCode';

export const mdxComponents = (module: string) => {
  return {
    h1: (props: ComponentProps<'h1'>) => {
      const { className, children, ...rest } = props;

      return (
        <h1 className={cx('mb-3 mt-2 text-[1.75em] font-bold', className)} {...rest}>
          <Helmet>
            <title>
              {children} - {module}
            </title>
          </Helmet>
          {children}
        </h1>
      );
    },
    h2: (props: ComponentProps<'h2'>) => {
      const { id, className, children, ...rest } = props;

      return (
        <h2 id={id} className={cx('group mb-3 mt-6 scroll-mt-24 text-xl font-bold', className)} {...rest}>
          {children}
          <a
            tabIndex={-1}
            className={'ml-2 text-green-500 opacity-0 transition-opacity group-hover:opacity-100'}
            aria-hidden={true}
            href={`#${id}`}
          >
            #
          </a>
        </h2>
      );
    },
    h3: (props: ComponentProps<'h3'>) => {
      const { id, className, children, ...rest } = props;

      return (
        <h3 id={id} className={cx('group mb-3 mt-6 scroll-mt-24 text-lg font-medium', className)} {...rest}>
          {children}
          <a
            tabIndex={-1}
            className={'ml-2 text-green-500 opacity-0 transition-opacity group-hover:opacity-100'}
            aria-hidden={true}
            href={`#${id}`}
          >
            #
          </a>
        </h3>
      );
    },
    h4: (props: ComponentProps<'h4'>) => {
      const { className, children, ...rest } = props;

      return (
        <h4 className={cx('mb-3 mt-6 font-medium', className)} {...rest}>
          {children}
        </h4>
      );
    },
    ul: (props: ComponentProps<'ul'>) => {
      const { className, children, ...rest } = props;

      return (
        <ul className={cx('my-4 list-disc ps-6', className)} {...rest}>
          {children}
        </ul>
      );
    },
    ol: (props: ComponentProps<'ol'>) => {
      const { className, children, ...rest } = props;

      return (
        <ol className={cx('my-4 list-decimal ps-6', className)} {...rest}>
          {children}
        </ol>
      );
    },
    li: (props: ComponentProps<'li'>) => {
      const { className, children, ...rest } = props;

      return (
        <li className={cx('my-1 ps-1', className)} {...rest}>
          {children}
        </li>
      );
    },
    p: (props: ComponentProps<'p'>) => {
      const { className, children, ...rest } = props;
      return (
        <p className={cx('my-4', className)} {...rest}>
          {children}
        </p>
      );
    },
    code: (props: ComponentProps<'code'>) => {
      return <MdxCode {...props} />;
    },
    pre: (props: ComponentProps<'pre'>) => {
      return <>{props.children}</>;
    },
    a: (props: ComponentProps<'a'>) => {
      const { children, ...rest } = props;

      return (
        <a target="_blank" rel="noreferrer" {...rest}>
          {children}
        </a>
      );
    },
  };
};
