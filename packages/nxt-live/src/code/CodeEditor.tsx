import type { Language, PrismTheme } from '@resolid/nxt-prism';
import { useCallback, useMemo, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import Editor from 'react-simple-code-editor';
import { CodeBlock } from './CodeBlock';

type EditorProps = ComponentPropsWithoutRef<typeof Editor>;

export type CodeEditorProps = Partial<Omit<EditorProps, 'defaultValue' | 'value' | 'onValueChange' | 'onChange'>> & {
  value?: string;
  defaultValue?: string;
  language?: Language;
  theme: PrismTheme;
  onChange?: (value: string) => void;
};

export const CodeEditor = ({
  defaultValue,
  value: controlledValue,
  language = 'jsx',
  theme,
  highlight,
  padding = 10,
  onChange,
  ...rest
}: CodeEditorProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;

  const highlightCode = useCallback(
    (code: string) => (
      <CodeBlock language={language} theme={theme} noWrapper>
        {code}
      </CodeBlock>
    ),
    [language, theme],
  );

  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  const handleChange = useCallback(
    (code: string) => {
      if (!isControlled) setUncontrolledValue(code);
      onChangeRef.current?.(code);
    },
    [isControlled],
  );

  const style = useMemo(() => ({ ...theme.plain, ...rest.style }), [theme.plain, rest.style]);

  return (
    <Editor
      {...rest}
      highlight={highlight || highlightCode}
      padding={padding}
      value={isControlled ? controlledValue : uncontrolledValue}
      onValueChange={handleChange}
      style={style}
    />
  );
};
