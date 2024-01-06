// noinspection JSUnusedGlobalSymbols

import * as mdx from '@mdx-js/react';
import { useEffect, useMemo, useState, type ComponentProps, type ElementType } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import './idle-callback-polyfill';
import type { MDXRemoteSerializeResult } from './types';

type RequestIdleCallbackHandle = number;
type RequestIdleCallbackOptions = {
  timeout?: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

export type MDXRemoteProps<
  TScope = Record<string, unknown>,
  TFrontmatter = Record<string, unknown>,
> = MDXRemoteSerializeResult<TScope, TFrontmatter> & {
  components?: ComponentProps<typeof mdx.MDXProvider>['components'];
  lazy?: boolean;
};

export type { MDXRemoteSerializeResult };

export const MDXRemote = <TScope, TFrontmatter>({
  compiledSource,
  frontmatter,
  scope,
  components = {},
  lazy,
}: MDXRemoteProps<TScope, TFrontmatter>) => {
  const [isReadyToRender, setIsReadyToRender] = useState(!lazy || typeof window === 'undefined');

  useEffect(() => {
    if (lazy) {
      const handle = window.requestIdleCallback(() => {
        setIsReadyToRender(true);
      });
      return () => window.cancelIdleCallback(handle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Content: ElementType = useMemo(() => {
    const fullScope = Object.assign(
      {
        opts: {
          ...mdx,
          ...jsxRuntime,
        },
      },
      { frontmatter },
      scope,
    );

    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);

    const hydrateFn = Reflect.construct(Function, keys.concat(`${compiledSource}`));

    return hydrateFn.apply(hydrateFn, values).default;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, compiledSource]);

  if (!isReadyToRender) {
    return <div dangerouslySetInnerHTML={{ __html: '' }} suppressHydrationWarning />;
  }

  const content = (
    <mdx.MDXProvider components={components}>
      <Content />
    </mdx.MDXProvider>
  );

  return lazy ? <div>{content}</div> : content;
};
