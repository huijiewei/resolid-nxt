// noinspection JSUnusedGlobalSymbols

import { cx } from '@resolid/nxt-ui';
import { isAbsoluteUrl, isString } from '@resolid/nxt-utils';
import type { ComponentProps } from 'react';
import { ExternalLink } from '~/common/icons/ExternalLink';
import { MdxCode } from '~/common/mdx/MdxPreCode';

export const mdxComponents = {
  h1: (props: ComponentProps<'h1'>) => {
    const { className, children, ...rest } = props;

    return (
      <h1 className={cx('mb-3 mt-2 text-[1.75em] font-bold', className)} {...rest}>
        {children}
      </h1>
    );
  },
  h2: (props: ComponentProps<'h2'>) => {
    const { id, className, children, ...rest } = props;

    return (
      <h2 id={id} className={cx('group mb-3 mt-6 scroll-mt-20 text-xl font-bold', className)} {...rest}>
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
      <h3 id={id} className={cx('group mb-3 mt-6 scroll-mt-20 text-lg font-medium', className)} {...rest}>
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
    const { children, ...rest } = props;
    return <MdxCode {...rest}>{children as string}</MdxCode>;
  },
  pre: (props: ComponentProps<'pre'>) => {
    return <>{props.children}</>;
  },
  a: (props: ComponentProps<'a'>) => {
    const { children, href = '', ...rest } = props;

    const external = isAbsoluteUrl(href) && ['http', 'https'].includes(href.slice(0, href.indexOf(':')));

    return (
      <a
        className={
          'inline-flex items-center text-link hover:text-link-hovered hover:underline active:text-link-pressed'
        }
        href={href}
        title={isString(children) ? children : ''}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {children}
        {external && <ExternalLink className={'ml-0.5'} />}
      </a>
    );
  },
};
