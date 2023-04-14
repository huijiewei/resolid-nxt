import { useColorModeDispatch, useColorModeState } from '@resolid/nxt-ui';
import { Moon } from '~/common/icons/Moon';
import { Sun } from '~/common/icons/Sun';

export const ThemeSwitcher = () => {
  const { darkMode } = useColorModeState();
  const { setColorMode } = useColorModeDispatch();

  return (
    <button
      onClick={() => setColorMode(darkMode ? 'light' : 'dark')}
      title={'Change Color Theme'}
      className={'p-2 hover:text-link'}
    >
      {darkMode ? <Sun size={'sm'} /> : <Moon size={'sm'} />}
    </button>
  );
};
