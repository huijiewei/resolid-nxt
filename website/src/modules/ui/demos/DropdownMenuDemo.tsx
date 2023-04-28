import {
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuDivider,
  DropdownMenuItem,
  DropdownMenuItemTrigger,
  DropdownMenuTrigger,
} from '@resolid/nxt-ui';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Basic menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuArrow />
            <DropdownMenuItem>
              New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
            </DropdownMenuItem>
            <DropdownMenuDivider />
            <DropdownMenuItem>
              Close Window<span className={'ml-auto text-sm text-gray-500'}>⇧+⌘+W</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Close Tab<span className={'ml-auto text-sm text-gray-500'}>⌘+W</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Save As...<span className={'ml-auto text-sm text-gray-500'}>⌘+S</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      snippet={`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Basic menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuArrow />
    <DropdownMenuItem>
      New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
    </DropdownMenuItem>
    <DropdownMenuDivider />
    <DropdownMenuItem>
      Close Window<span className={'ml-auto text-sm text-gray-500'}>⇧+⌘+W</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Close Tab<span className={'ml-auto text-sm text-gray-500'}>⌘+W</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Save As...<span className={'ml-auto text-sm text-gray-500'}>⌘+S</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
    />
  );
};

export const MultipleLevel = () => {
  return (
    <DemoExample
      preview={() => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Multiple level menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuArrow />
            <DropdownMenuItem>New</DropdownMenuItem>
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuDivider />
            <DropdownMenu>
              <DropdownMenuItemTrigger>Share</DropdownMenuItemTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    console.log('You choose email');
                  }}
                >
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>SMS</DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuItemTrigger>SNS</DropdownMenuItemTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Twitter</DropdownMenuItem>
                    <DropdownMenuItem>Facebook</DropdownMenuItem>
                    <DropdownMenuItem>Mastodon</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      snippet={`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Multiple level menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuArrow />
    <DropdownMenuItem>New</DropdownMenuItem>
    <DropdownMenuItem>Open</DropdownMenuItem>
    <DropdownMenuDivider />
    <DropdownMenu>
      <DropdownMenuItemTrigger>Share</DropdownMenuItemTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            console.log('You choose email');
          }}
        >
          Email
        </DropdownMenuItem>
        <DropdownMenuItem>SMS</DropdownMenuItem>
        <DropdownMenu>
          <DropdownMenuItemTrigger>SNS</DropdownMenuItemTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Twitter</DropdownMenuItem>
            <DropdownMenuItem>Facebook</DropdownMenuItem>
            <DropdownMenuItem>Mastodon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  </DropdownMenuContent>
</DropdownMenu>`}
    />
  );
};
