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
import { useEffect, useState } from 'react';
import { Moon } from '~/common/icons/Moon';
import { Sun } from '~/common/icons/Sun';
import { System } from '~/common/icons/System';

const colorModeDetails = {
  dark: {
    label: 'Dark',
    icon: <Moon size={'sm'} />,
  },
  light: {
    label: 'Light',
    icon: <Sun size={'sm'} />,
  },
  system: {
    label: 'System',
    icon: <System size={'sm'} />,
  },
};

export const ThemeSwitcher = () => {
  const { colorMode } = useColorModeState();
  const { setColorMode } = useColorModeDispatch();

  const [colorModeState, setColorModeState] = useState(colorModeDetails['system']);

  useEffect(() => {
    setColorModeState(colorModeDetails[colorMode]);
  }, [colorMode]);

  return (
    <DropdownMenu placement={'bottom'}>
      <DropdownMenuTrigger>
        <button
          aria-label={colorModeState.label}
          className={'block select-none p-2 transition-colors hover:text-link rounded'}
        >
          {colorModeState.icon}
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
            <Sun /> Light
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'dark' && 'text-link')}
          onClick={() => {
            setColorMode('dark');
          }}
        >
          <div className={'flex items-center gap-1'}>
            <Moon /> Dark
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cx('my-1', colorMode == 'system' && 'text-link')}
          onClick={() => {
            setColorMode('system');
          }}
        >
          <div className={'flex items-center gap-1'}>
            <System /> System
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
