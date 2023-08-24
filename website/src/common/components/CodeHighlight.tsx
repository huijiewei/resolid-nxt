import { Highlight, Prism, nightOwl, nightOwlLight, type Language } from '@resolid/nxt-prism';
import { cx, useColorModeState } from '@resolid/nxt-ui';
import type { ComponentProps } from 'react';

export type CodeHighlightProps = Omit<ComponentProps<'pre'>, 'children' | 'style'> & {
  language: Language;
  code: string;
};

export const CodeHighlight = (props: CodeHighlightProps) => {
  const { className: preClassName, code, language, ...rest } = props;
  const { darkMode } = useColorModeState();
  return (
    <Highlight
      code={code?.replace(/\n$/, '')}
      theme={darkMode ? nightOwl : nightOwlLight}
      language={language}
      prism={Prism}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            translate={'no'}
            className={cx(className, 'whitespace-pre-wrap text-sm', preClassName)}
            style={style}
            {...rest}
          >
            {tokens.map((line, idx) => {
              return (
                <div key={idx} {...getLineProps({ line })}>
                  {line.map((token, key) => {
                    return <span key={key} {...getTokenProps({ token })} />;
                  })}
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
};
