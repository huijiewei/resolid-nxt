import {
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuDivider,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuItemTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@resolid/nxt-ui';
import { useState } from 'react';
import { Check } from '~/common/icons/Check';
import { Dot } from '~/common/icons/Dot';
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
              Close Window<span className={'ml-auto text-sm text-fg-subtle'}>⇧+⌘+W</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Close Tab<span className={'ml-auto text-sm text-fg-subtle'}>⌘+W</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Save As...<span className={'ml-auto text-sm text-fg-subtle'}>⌘+S</span>
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
      Close Window<span className={'ml-auto text-sm text-fg-subtle'}>⇧+⌘+W</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Close Tab<span className={'ml-auto text-sm text-fg-subtle'}>⌘+W</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Save As...<span className={'ml-auto text-sm text-fg-subtle'}>⌘+S</span>
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
                    console.log('Email');
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

const ComplexDemo = () => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [account, setAccount] = useState('Jack Slovakia');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>Complex menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuArrow />
        <DropdownMenuItem
          onClick={() => {
            console.log('New Tab');
          }}
        >
          New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log('New Window');
          }}
        >
          New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
        </DropdownMenuItem>
        <DropdownMenuDivider />
        <DropdownMenuItem
          onClick={() => {
            console.log('Close Window');
          }}
        >
          Close Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+W</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log('Close Tab');
          }}
        >
          Close Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+W</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log('Save As...');
          }}
        >
          Save As...<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+S</span>
        </DropdownMenuItem>
        <DropdownMenuDivider />
        <DropdownMenu>
          <DropdownMenuItemTrigger>Share</DropdownMenuItemTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                console.log('Email');
              }}
            >
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log('SMS');
              }}
            >
              SMS
            </DropdownMenuItem>
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
        <DropdownMenuDivider />
        <DropdownMenuItem
          onClick={() => {
            console.log('Print');
          }}
        >
          Print<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+P</span>
        </DropdownMenuItem>
        <DropdownMenuDivider />
        <DropdownMenuCheckboxItem
          checked={bookmarksChecked}
          onChange={(checked) => setBookmarksChecked(checked as boolean)}
        >
          <DropdownMenuItemIndicator>
            <Check size={'1em'} />
          </DropdownMenuItemIndicator>
          Show Bookmarks<div className="ml-auto pl-5 text-sm text-fg-subtle">⌘+B</div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={urlsChecked} onChange={(checked) => setUrlsChecked(checked as boolean)}>
          <DropdownMenuItemIndicator>
            <Check size={'1em'} />
          </DropdownMenuItemIndicator>
          Show Full URLs
        </DropdownMenuCheckboxItem>
        <DropdownMenuDivider />
        <DropdownMenuRadioGroup value={account} onChange={(value) => setAccount(value.toString())}>
          <DropdownMenuGroupLabel>Account</DropdownMenuGroupLabel>
          <DropdownMenuRadioItem value={'Jack Slovakia'}>
            <DropdownMenuItemIndicator>
              <Dot size={'1em'} />
            </DropdownMenuItemIndicator>
            Jack Slovakia
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={'Rose DeWitt Bukater'}>
            <DropdownMenuItemIndicator>
              <Dot size={'1em'} />
            </DropdownMenuItemIndicator>
            Rose DeWitt Bukater
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuDivider />
        <DropdownMenuItem>Developer Tools</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>Complex menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuArrow />
        <DropdownMenuItem
          onClick={() => {
            console.log('New Tab');
          }}
        >
          New Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+T</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log('New Window');
          }}
        >
          New Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+N</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          New Incognito Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+N</span>
        </DropdownMenuItem>
        <DropdownMenuDivider />
        <DropdownMenuItem
          onClick={() => {
            console.log('Close Window');
          }}
        >
          Close Window<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⇧+⌘+W</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log('Close Tab');
          }}
        >
          Close Tab<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+W</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log('Save As...');
          }}
        >
          Save As...<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+S</span>
        </DropdownMenuItem>
        <DropdownMenuDivider />
        <DropdownMenu>
          <DropdownMenuItemTrigger>Share</DropdownMenuItemTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                console.log('Email');
              }}
            >
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log('SMS');
              }}
            >
              SMS
            </DropdownMenuItem>
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
        <DropdownMenuDivider />
        <DropdownMenuItem
          onClick={() => {
            console.log('Print');
          }}
        >
          Print<span className={'ml-auto pl-5 text-sm text-fg-subtle'}>⌘+P</span>
        </DropdownMenuItem>
        <DropdownMenuDivider />
        <DropdownMenuCheckboxItem
          checked={bookmarksChecked}
          onChange={(checked) => setBookmarksChecked(checked)}
        >
          <DropdownMenuItemIndicator>
            <Check size={'1em'} />
          </DropdownMenuItemIndicator>
          Show Bookmarks<div className="ml-auto pl-5 text-sm text-fg-subtle">⌘+B</div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={urlsChecked} onChange={(checked) => setUrlsChecked(checked)}>
          <DropdownMenuItemIndicator>
            <Check size={'1em'} />
          </DropdownMenuItemIndicator>
          Show Path
        </DropdownMenuCheckboxItem>
        <DropdownMenuDivider />
        <DropdownMenuRadioGroup value={account} onChange={(value) => setAccount(value)}>
          <DropdownMenuGroupLabel>Account</DropdownMenuGroupLabel>
          <DropdownMenuRadioItem value={'Jack Slovakia'}>
            <DropdownMenuItemIndicator>
              <Dot size={'1em'} />
            </DropdownMenuItemIndicator>
            Jack Slovakia
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={'Rose DeWitt Bukater'}>
            <DropdownMenuItemIndicator>
              <Dot size={'1em'} />
            </DropdownMenuItemIndicator>
            Rose DeWitt Bukater
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuDivider />
        <DropdownMenuItem>Developer Tools</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};`}
    />
  );
};
