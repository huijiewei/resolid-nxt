import { createContext } from '@resolid/nxt-ui';
import { useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { Menu } from '~/common/icons/Menu';

const [AsideLayoutStateProvider, useAsideLayoutState] = createContext<boolean>({
  name: 'AsideLayoutStateContext',
  strict: true,
});

const [AsideLayoutDispatchProvider, useAsideLayoutDispatch] = createContext<Dispatch<SetStateAction<boolean>>>({
  name: 'AsideLayoutDispatchContext',
  strict: true,
});

export { useAsideLayoutDispatch, useAsideLayoutState };

const AsideBar = () => {
  const setOpen = useAsideLayoutDispatch();

  return (
    <div
      className={
        'tablet:hidden fixed z-10 flex h-12 w-full items-center justify-between border-b bg-bg-default/75 px-2 backdrop-blur'
      }
    >
      <button onClick={() => setOpen(true)} className={'flex items-center gap-1 p-2'}>
        <Menu />
        <span>Menu</span>
      </button>
    </div>
  );
};

export const AsideLayout = ({ children }: PropsWithChildren) => {
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
