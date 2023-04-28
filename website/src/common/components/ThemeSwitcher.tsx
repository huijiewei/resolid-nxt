import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useColorModeDispatch,
  useColorModeState,
} from '@resolid/nxt-ui';
import { cx } from '@resolid/nxt-utils';
import { Moon } from '~/common/icons/Moon';
import { Sun } from '~/common/icons/Sun';
import { System } from '~/common/icons/System';

export const ThemeSwitcher = () => {
  const { colorMode } = useColorModeState();
  const { setColorMode } = useColorModeDispatch();

  const colorModeTitle = {
    dark: 'Dark',
    light: 'Light',
    system: 'System',
  };

  return (
    <DropdownMenu placement={'bottom'}>
      <DropdownMenuTrigger>
        <button
          aria-label={colorModeTitle[colorMode]}
          className={'block select-none p-1 transition-colors hover:text-link'}
        >
          {colorMode == 'system' && <System size={'sm'} />}
          {colorMode == 'light' && <Sun size={'sm'} />}
          {colorMode == 'dark' && <Moon size={'sm'} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'z-50'}>
        <DropdownMenuArrow />
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'light' && 'text-link')}
          onClick={() => {
            setColorMode('light');
          }}
        >
          <div className={'flex items-center gap-1'}>
            <Sun size={'1em'} /> Light
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'dark' && 'text-link')}
          onClick={() => {
            setColorMode('dark');
          }}
        >
          <div className={'flex items-center gap-1'}>
            <Moon size={'1em'} /> Dark
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'system' && 'text-link')}
          onClick={() => {
            setColorMode('system');
          }}
        >
          <div className={'flex items-center gap-1'}>
            <System size={'1em'} /> System
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
