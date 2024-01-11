import { Button, Checkbox, cx, Input, NativeSelect, NumberInput, type PrimitiveProps } from '@resolid/nxt-ui';
import { isBoolean } from '@resolid/nxt-utils';
import { useState, type ElementType, type JSX } from 'react';
import { CodeHighlight } from '~/common/components/CodeHighlight';
import { Check } from '~/common/icons/Check';

export type DemoShowcaseProps<ComponentProps extends Record<string, unknown>, Tag extends ElementType = ElementType> = {
  componentProps: {
    propName: Extract<keyof ComponentProps, string>;
    control?: 'select' | 'input' | 'color' | 'radio' | 'number' | 'placement' | 'switch';
    options?: ComponentProps[Extract<keyof ComponentProps, string>][];
    labels?: string[];
    defaultValue?: ComponentProps[Extract<keyof ComponentProps, string>];
  }[];
  defaultProps?: Partial<PrimitiveProps<Tag, ComponentProps>>;
  preview: (props: ComponentProps) => JSX.Element;
  snippet: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export const DemoShowcase = <T extends { [k: string]: any } = {}>({
  preview,
  snippet,
  componentProps,
  defaultProps = {},
}: DemoShowcaseProps<T>) => {
  const [state, setState] = useState<T>(defaultProps as T);

  const codePropsReplace = () => {
    const propsReplace = Object.keys(state)
      .map((propName) => {
        const propValue = state[propName];

        const prop = componentProps.find((p) => p.propName == propName);

        if (propValue == prop?.defaultValue) {
          return null;
        }

        if (isBoolean(propValue)) {
          return propName;
        }

        if (prop?.control == 'number') {
          return `${propName}={${propValue}}`;
        }

        return `${propName}="${propValue}"`;
      })
      .filter(Boolean)
      .join(' ');

    return propsReplace.length > 0 ? ` ${propsReplace}` : propsReplace;
  };

  return (
    <div className={'flex min-h-[20em] w-full flex-col rounded border laptop:flex-row'}>
      <div className={'flex flex-1 flex-col p-5'}>
        <div className={'flex flex-grow items-center justify-center'}>{preview(state)}</div>
        <CodeHighlight
          className={'mt-6 overflow-x-auto rounded border p-3 scrollbar scrollbar-thin'}
          language={'jsx'}
          code={snippet.replace(' {...props}', codePropsReplace())}
        />
      </div>
      <div className={'min-w-[15em] flex-shrink-0 gap-2 border-t p-3 laptop:border-s laptop:border-t-0'}>
        <div className={'flex justify-between'}>
          <h3 className={'mb-3 text-lg font-medium'}>Playground</h3>
        </div>
        <div className={'flex flex-col gap-2'}>
          {componentProps.map((prop) => {
            if (!prop.control) {
              return null;
            }

            const propValue = state[prop.propName] ?? prop.defaultValue;

            return (
              <label
                key={prop.propName}
                className={cx(
                  'flex items-center justify-between gap-1.5',
                  prop.control == 'switch' ? 'flex-row' : 'flex-row laptop:flex-col laptop:items-start',
                )}
              >
                <div className={'capitalize'}>{prop.propName}</div>
                {prop.control == 'select' && (
                  <NativeSelect
                    className={'laptop:w-full'}
                    value={(propValue || '') as string}
                    onChange={(e) => {
                      setState((prev) => ({ ...prev, [prop.propName]: e.target.value }));
                    }}
                  >
                    {prop.options?.map((option) => (
                      <option key={`${prop.propName}-${option}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </NativeSelect>
                )}

                {prop.control == 'color' && (
                  <div className={'inline-flex w-auto justify-between gap-1 laptop:w-full'}>
                    {prop.options?.map((option) => (
                      <Button
                        key={`${prop.propName}-${option}`}
                        title={option}
                        color={option}
                        className={'aspect-square !px-0'}
                        onClick={() => {
                          setState((prev) => ({ ...prev, [prop.propName]: option }));
                        }}
                      >
                        {propValue == option && <Check strokeWidth={'3'} className={'text-fg-emphasized'} />}
                      </Button>
                    ))}
                  </div>
                )}

                {prop.control == 'switch' && (
                  <Checkbox
                    checked={propValue}
                    onChange={(value) => {
                      setState((prev) => ({ ...prev, [prop.propName]: value }));
                    }}
                  />
                )}

                {prop.control == 'input' && (
                  <Input
                    className={'w-auto laptop:w-full'}
                    type="text"
                    value={propValue}
                    onChange={(value) => {
                      setState((prev) => ({ ...prev, [prop.propName]: value }));
                    }}
                  />
                )}

                {prop.control == 'number' && (
                  <NumberInput
                    className={'w-auto laptop:w-full'}
                    value={propValue}
                    onChange={(value) => {
                      setState((prev) => ({ ...prev, [prop.propName]: value }));
                    }}
                  />
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
