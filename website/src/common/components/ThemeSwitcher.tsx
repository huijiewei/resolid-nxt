import {
  Button,
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
import { useTranslation } from 'react-i18next';
import { Moon } from '~/common/icons/Moon';
import { Sun } from '~/common/icons/Sun';
import { System } from '~/common/icons/System';

const colorModes = {
  light: {
    label: 'colorMode.light',
    icon: Sun,
  },
  dark: {
    label: 'colorMode.dark',
    icon: Moon,
  },
  system: {
    label: 'colorMode.system',
    icon: System,
  },
};

type ColorMode = keyof typeof colorModes;

export const ThemeSwitcher = () => {
  const { t } = useTranslation();

  const { colorMode } = useColorModeState();
  const { setColorMode } = useColorModeDispatch();

  const [colorModeState, setColorModeState] = useState(colorModes['system']);

  useEffect(() => {
    setColorModeState(colorModes[colorMode]);
  }, [colorMode]);

  return (
    <DropdownMenu placement={'bottom'}>
      <DropdownMenuTrigger>
        <Button
          aria-label={t('changeColorMode') || 'Change Color Mode'}
          color={'neutral'}
          variant={'subtle'}
          className={'aspect-square !px-0'}
        >
          <colorModeState.icon size={'sm'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'z-50'}>
        <DropdownMenuArrow />
        {Object.keys(colorModes).map((key) => {
          const mode = colorModes[key as ColorMode];

          return (
            <DropdownMenuItem
              key={key}
              className={cx('my-1', colorMode == key && 'text-link')}
              onClick={() => {
                setColorMode(key as ColorMode);
              }}
            >
              <mode.icon className={'me-1.5'} />
              {t(mode.label)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
