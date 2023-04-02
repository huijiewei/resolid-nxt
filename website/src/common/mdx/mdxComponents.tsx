import type { ComponentProps } from 'react';
import { Helmet } from 'react-helmet-async';

export const mdxComponents = (module: string) => {
  return {
    h1: (props: ComponentProps<'h1'>) => {
      const { children, ...rest } = props;

      return (
        <h1 {...rest}>
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
      const { id, children, ...rest } = props;

      return (
        <h2 id={id} className={'group scroll-mt-24'} {...rest}>
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
      const { id, children, ...rest } = props;

      return (
        <h3 id={id} className={'group scroll-mt-24'} {...rest}>
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
    a: (props: ComponentProps<'a'>) => {
      return <a target="_blank" rel="noreferrer" {...props} />;
    },
  };
};
