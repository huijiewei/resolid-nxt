import { Divider } from '../divider/Divider';
import { FloatingArrow } from '../floating/FloatingArrow';
import { Menu } from '../menu/Menu';
import { MenuCheckboxItem } from '../menu/MenuCheckboxItem';
import { MenuContent } from '../menu/MenuContent';
import { MenuGroup } from '../menu/MenuGroup';
import { MenuGroupLabel } from '../menu/MenuGroupLabel';
import { MenuItem } from '../menu/MenuItem';
import { MenuItemIndicator } from '../menu/MenuItemIndicator';
import { MenuItemTrigger } from '../menu/MenuItemTrigger';
import { MenuRadioGroup } from '../menu/MenuRadioGroup';
import { MenuRadioItem } from '../menu/MenuRadioItem';
import { MenuTrigger } from '../menu/MenuTrigger';

export const DropdownMenu = Menu;

export const DropdownMenuTrigger = MenuTrigger;
export const DropdownMenuContent = MenuContent;

export const DropdownMenuArrow = FloatingArrow;

export const DropdownMenuGroup = MenuGroup;
export const DropdownMenuGroupLabel = MenuGroupLabel;

export const DropdownMenuItem = MenuItem;
export const DropdownMenuItemTrigger = MenuItemTrigger;

export const DropdownMenuItemIndicator = MenuItemIndicator;

export const DropdownMenuCheckboxItem = MenuCheckboxItem;

export const DropdownMenuRadioGroup = MenuRadioGroup;

export const DropdownMenuRadioItem = MenuRadioItem;

export const DropdownMenuDivider = () => {
  return <Divider className={'my-1.5'} />;
};
