import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuDivider,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuItemTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from '@resolid/nxt-ui';
import { useState } from 'react';
import { Check } from '~/common/icons/Check';
import { Dot } from '~/common/icons/Dot';
import { DemoExample } from '~/modules/ui/components/DemoExample';

export const Basic = () => {
  return (
    <DemoExample
      preview={() => (
        <div className={'flex flex-row gap-3 items-center'}>
          <ContextMenu>
            <ContextMenuTrigger>
              <div className={'block border-dotted border-2 border-bg-muted select-none rounded p-10'}>
                Right click here.
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
              </ContextMenuItem>
              <ContextMenuItem>
                New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
              </ContextMenuItem>
              <ContextMenuItem>
                New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
              </ContextMenuItem>
              <ContextMenuDivider />
              <ContextMenuItem>
                Close Window<span className={'ml-auto text-sm text-fg-subtle'}>⇧+⌘+W</span>
              </ContextMenuItem>
              <ContextMenuItem>
                Close Tab<span className={'ml-auto text-sm text-fg-subtle'}>⌘+W</span>
              </ContextMenuItem>
              <ContextMenuItem>
                Save As...<span className={'ml-auto text-sm text-fg-subtle'}>⌘+S</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <div>Right click on the page!</div>
          <ContextMenu>
            <ContextMenuTrigger />
            <ContextMenuContent>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem disabled>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
              <ContextMenuDivider />
              <ContextMenuItem>
                Save As...<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+S</span>
              </ContextMenuItem>
              <ContextMenuItem>Print</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      )}
      snippet={`<ContextMenu>
  <ContextMenuTrigger>
    <Button>Basic menu</Button>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuArrow />
    <ContextMenuItem>
      New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
    </ContextMenuItem>
    <ContextMenuItem>
      New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
    </ContextMenuItem>
    <ContextMenuItem>
      New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
    </ContextMenuItem>
    <ContextMenuDivider />
    <ContextMenuItem>
      Close Window<span className={'ml-auto text-sm text-fg-subtle'}>⇧+⌘+W</span>
    </ContextMenuItem>
    <ContextMenuItem>
      Close Tab<span className={'ml-auto text-sm text-fg-subtle'}>⌘+W</span>
    </ContextMenuItem>
    <ContextMenuItem>
      Save As...<span className={'ml-auto text-sm text-fg-subtle'}>⌘+S</span>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
    />
  );
};

export const MultipleLevel = () => {
  return (
    <DemoExample
      preview={() => (
        <ContextMenu>
          <ContextMenuTrigger>
            <div className={'block border-dotted border-2 border-bg-muted select-none rounded p-10 text-center'}>
              Right click here.
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>New</ContextMenuItem>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuDivider />
            <ContextMenu>
              <ContextMenuItemTrigger>Share</ContextMenuItemTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => {
                    console.log('Email');
                  }}
                >
                  Email
                </ContextMenuItem>
                <ContextMenuItem>SMS</ContextMenuItem>
                <ContextMenu>
                  <ContextMenuItemTrigger>SNS</ContextMenuItemTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Twitter</ContextMenuItem>
                    <ContextMenuItem>Facebook</ContextMenuItem>
                    <ContextMenuItem>Mastodon</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </ContextMenuContent>
            </ContextMenu>
          </ContextMenuContent>
        </ContextMenu>
      )}
      snippet={`<ContextMenu>
  <ContextMenuTrigger>
    <div className={'block border-dotted border-2 border-bg-muted select-none rounded p-10 text-center'}>
      Right click here.
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>New</ContextMenuItem>
    <ContextMenuItem>Open</ContextMenuItem>
    <ContextMenuDivider />
    <ContextMenu>
      <ContextMenuItemTrigger>Share</ContextMenuItemTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            console.log('You choose email');
          }}
        >
          Email
        </ContextMenuItem>
        <ContextMenuItem>SMS</ContextMenuItem>
        <ContextMenu>
          <ContextMenuItemTrigger>SNS</ContextMenuItemTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Twitter</ContextMenuItem>
            <ContextMenuItem>Facebook</ContextMenuItem>
            <ContextMenuItem>Mastodon</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ContextMenuContent>
    </ContextMenu>
  </ContextMenuContent>
</ContextMenu>`}
    />
  );
};

const ComplexDemo = () => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [account, setAccount] = useState('Jack Slovakia');

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={'block border-dotted border-2 border-bg-muted select-none rounded p-10 text-center'}>
          Right click here.
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            console.log('New Tab');
          }}
        >
          New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            console.log('New Window');
          }}
        >
          New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem
          onClick={() => {
            console.log('Close Window');
          }}
        >
          Close Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+W</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            console.log('Close Tab');
          }}
        >
          Close Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+W</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            console.log('Save As...');
          }}
        >
          Save As...<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+S</span>
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenu>
          <ContextMenuItemTrigger>Share</ContextMenuItemTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                console.log('Email');
              }}
            >
              Email
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                console.log('SMS');
              }}
            >
              SMS
            </ContextMenuItem>
            <ContextMenu>
              <ContextMenuItemTrigger>SNS</ContextMenuItemTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Twitter</ContextMenuItem>
                <ContextMenuItem>Facebook</ContextMenuItem>
                <ContextMenuItem>Mastodon</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenuDivider />
        <ContextMenuItem
          onClick={() => {
            console.log('Print');
          }}
        >
          Print<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+P</span>
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuCheckboxItem
          checked={bookmarksChecked}
          onChange={(checked) => setBookmarksChecked(checked as boolean)}
        >
          <ContextMenuItemIndicator>
            <Check />
          </ContextMenuItemIndicator>
          Show Bookmarks<div className="ml-auto pl-5 text-sm text-fg-subtle">⌘+B</div>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={urlsChecked} onChange={(checked) => setUrlsChecked(checked as boolean)}>
          <ContextMenuItemIndicator>
            <Check />
          </ContextMenuItemIndicator>
          Show Full URLs
        </ContextMenuCheckboxItem>
        <ContextMenuDivider />
        <ContextMenuRadioGroup value={account} onChange={(value) => setAccount(value.toString())}>
          <ContextMenuGroupLabel>Account</ContextMenuGroupLabel>
          <ContextMenuRadioItem value={'Jack Slovakia'}>
            <ContextMenuItemIndicator>
              <Dot />
            </ContextMenuItemIndicator>
            Jack Slovakia
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value={'Rose DeWitt Bukater'}>
            <ContextMenuItemIndicator>
              <Dot />
            </ContextMenuItemIndicator>
            Rose DeWitt Bukater
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuDivider />
        <ContextMenuItem>Developer Tools</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const Complex = () => {
  return (
    <DemoExample
      preview={() => <ComplexDemo />}
      snippet={`const ComplexDemo = () => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [account, setAccount] = useState('Jack Slovakia');

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={'block border-dotted border-2 border-bg-muted select-none rounded p-10 text-center'}>
          Right click here.
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            console.log('New Tab');
          }}
        >
          New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            console.log('New Window');
          }}
        >
          New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem
          onClick={() => {
            console.log('Close Window');
          }}
        >
          Close Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+W</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            console.log('Close Tab');
          }}
        >
          Close Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+W</span>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            console.log('Save As...');
          }}
        >
          Save As...<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+S</span>
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenu>
          <ContextMenuItemTrigger>Share</ContextMenuItemTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                console.log('Email');
              }}
            >
              Email
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                console.log('SMS');
              }}
            >
              SMS
            </ContextMenuItem>
            <ContextMenu>
              <ContextMenuItemTrigger>SNS</ContextMenuItemTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Twitter</ContextMenuItem>
                <ContextMenuItem>Facebook</ContextMenuItem>
                <ContextMenuItem>Mastodon</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenuDivider />
        <ContextMenuItem
          onClick={() => {
            console.log('Print');
          }}
        >
          Print<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+P</span>
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuCheckboxItem
          checked={bookmarksChecked}
          onChange={(checked) => setBookmarksChecked(checked)}
        >
          <ContextMenuItemIndicator>
            <Check />
          </ContextMenuItemIndicator>
          Show Bookmarks<div className="ml-auto pl-5 text-sm text-fg-subtle">⌘+B</div>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={urlsChecked} onChange={(checked) => setUrlsChecked(checked)}>
          <ContextMenuItemIndicator>
            <Check />
          </ContextMenuItemIndicator>
          Show Path
        </ContextMenuCheckboxItem>
        <ContextMenuDivider />
        <ContextMenuRadioGroup value={account} onChange={(value) => setAccount(value)}>
          <ContextMenuGroupLabel>Account</ContextMenuGroupLabel>
          <ContextMenuRadioItem value={'Jack Slovakia'}>
            <ContextMenuItemIndicator>
              <Dot />
            </ContextMenuItemIndicator>
            Jack Slovakia
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value={'Rose DeWitt Bukater'}>
            <ContextMenuItemIndicator>
              <Dot />
            </ContextMenuItemIndicator>
            Rose DeWitt Bukater
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuDivider />
        <ContextMenuItem>Developer Tools</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};`}
    />
  );
};
