import { __DEV__ } from '@resolid/nxt-utils';
import { forwardRef } from 'react';
import {
  Link as ReactRouterLink,
  NavLink as ReactRouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from 'react-router-dom';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { state, ...rest } = props;

  return <ReactRouterLink state={{ ...state, previous: true }} ref={ref} {...rest} />;
});

if (__DEV__) {
  Link.displayName = 'Link';
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  const { state, ...rest } = props;

  return <ReactRouterNavLink state={{ ...state, previous: true }} ref={ref} {...rest} />;
});

if (__DEV__) {
  NavLink.displayName = 'NavLink';
}
