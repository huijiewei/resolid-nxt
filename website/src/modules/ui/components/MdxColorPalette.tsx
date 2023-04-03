import { isString } from '@resolid/nxt-utils';
import { theme } from '@resolid/nxt-ui/tailwind';

type Color = { name: string; value: Record<string, string> | string };

export const MdxColorPalette = () => {
  const themeColors = theme.colors;

  const colors: Color[] = Object.keys(themeColors)
    .filter((key) => !['inherit', 'current', 'transparent'].includes(key))
    .map((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const color = themeColors[key];

      return { name: key, value: color };
    });

  return (
    <div className={'flex flex-col gap-5'}>
      {colors.map((color) => (
        <div key={color.name} className={'flex flex-row gap-3'}>
          {isString(color.value) ? (
            <div className={'flex flex-row gap-3'}>
              <div
                className={'dark:(ring-1 ring-white/10) h-10 w-10 rounded ring-inset'}
                style={{
                  backgroundColor: color.value,
                }}
              />
              <div>
                <div className={'font-medium capitalize'}>{color.name}</div>
                <div className={'font-mono text-xs uppercase'}>{color.value}</div>
              </div>
            </div>
          ) : (
            <>
              <div className={'w-16 shrink-0'}>
                <div className={'flex h-10 flex-col justify-center font-medium capitalize'}>{color.name}</div>
              </div>
              <div className={'tablet:grid-cols-10 grid min-w-0 flex-1 grid-cols-5 gap-3'}>
                {Object.keys(color.value).map((key) => {
                  const value = (color.value as Record<string, string>)[key];

                  return (
                    <div key={`${color.name}-${key}`} className={'flex flex-col gap-1'}>
                      <div
                        className={'h-10 w-full rounded ring-inset dark:ring-1 dark:ring-white/10'}
                        style={{
                          backgroundColor: value,
                        }}
                      />
                      <div>
                        <div className={'font-medium capitalize'}>{key}</div>
                        <div className={'font-mono text-xs'}>{value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
