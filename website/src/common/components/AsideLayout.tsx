import { type SetStateAction, type Dispatch, useState, type ReactNode } from 'react';
import { createContext } from '@resolid/nxt-ui';
import { Menu } from '~/common/icons/Menu';

const [AsideLayoutStateProvider, useAsideLayoutState] = createContext<boolean>({
  name: 'AsideLayoutStateContext',
  strict: true,
});

const [AsideLayoutDispatchProvider, useAsideLayoutDispatch] = createContext<Dispatch<SetStateAction<boolean>>>({
  name: 'AsideLayoutDispatchContext',
  strict: true,
});

export { useAsideLayoutState, useAsideLayoutDispatch };

const AsideBar = () => {
  const setOpen = useAsideLayoutDispatch();

  return (
    <div
      className={
        'tablet:hidden fixed flex h-12 w-full items-center justify-between border-b bg-white/75 px-2 backdrop-blur'
      }
    >
      <button onClick={() => setOpen(true)} className={'flex items-center gap-1 p-2'}>
        <Menu size={'xs'} />
        <span>Menu</span>
      </button>
    </div>
  );
};

export const AsideLayout = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);

  return (
    <AsideLayoutDispatchProvider value={setOpened}>
      <AsideLayoutStateProvider value={opened}>
        <AsideBar />
        {children}
      </AsideLayoutStateProvider>
    </AsideLayoutDispatchProvider>
  );
};
