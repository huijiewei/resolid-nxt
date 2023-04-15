import { useState } from 'react';
import { CodeHighlight } from '~/common/components/CodeHighlight';
import { Check } from '~/common/icons/Check';

export type DemoShowcaseProps<ComponentProps> = {
  componentProps: {
    propName: Extract<keyof ComponentProps, string>;
    control?: 'select' | 'input' | 'color' | 'radio' | 'number' | 'placement' | 'switch';
    options?: ComponentProps[Extract<keyof ComponentProps, string>][];
    labels?: string[];
    defaultValue?: ComponentProps[Extract<keyof ComponentProps, string>];
  }[];
  preview: (props: ComponentProps) => JSX.Element;
  snippet: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export const DemoShowcase = <T extends { [k: string]: any } = {}>({
  preview,
  snippet,
  componentProps,
}: DemoShowcaseProps<T>) => {
  const [state, setState] = useState<T>({} as T);

  const codePropsReplace = () => {
    const propsReplace = Object.keys(state)
      .map((p) => {
        return `${p}="${state[p]}"`;
      })
      .join(' ');

    return propsReplace.length > 0 ? ` ${propsReplace}` : propsReplace;
  };

  return (
    <div className={'flex min-h-[20em] flex-col laptop:flex-row w-full rounded border'}>
      <div className={'flex flex-1 flex-col p-5'}>
        <div className={'m-auto flex-grow flex items-center'}>{preview(state)}</div>
        <CodeHighlight
          className={'rounded mt-6 p-3 border overflow-x-auto scrollbar scrollbar-thin'}
          language={'jsx'}
          code={snippet.replace(' {...props}', codePropsReplace())}
        />
      </div>
      <div className={'flex-shrink-0 gap-2 p-3 min-w-[15em] laptop:border-t-0 laptop:border-s border-t'}>
        <div className={'flex justify-between'}>
          <h3 className={'font-medium text-lg mb-3'}>Playground</h3>
        </div>
        <div className={'flex flex-col gap-2'}>
          {componentProps.map((prop) => {
            if (!prop.control) {
              return null;
            }

            const propValue = state[prop.propName] ?? prop.defaultValue;

            return (
              <div
                key={prop.propName}
                className={'flex flex-row laptop:flex-col justify-between laptop:items-start items-center gap-1.5'}
              >
                <label className={'capitalize'}>{prop.propName}</label>
                {prop.control == 'select' && (
                  <select
                    className={'px-2 h-8 border rounded laptop:w-full w-auto'}
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
                  </select>
                )}

                {prop.control == 'color' && (
                  <div className={'inline-flex gap-1 justify-between w-auto laptop:w-full'}>
                    {prop.options?.map((option) => (
                      <button
                        key={`${prop.propName}-${option}`}
                        title={option}
                        style={{ backgroundColor: `rgb(var(--re-bg-${option}-emphasis)` }}
                        className={'w-8 h-8 flex items-center justify-center rounded'}
                        onClick={() => {
                          setState((prev) => ({ ...prev, [prop.propName]: option }));
                        }}
                      >
                        {propValue == option && (
                          <Check strokeWidth={'3'} className={'text-white dark:text-black'} size={'xs'} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};