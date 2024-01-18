import { __DEV__ } from '@resolid/nxt-utils';
import { forwardRef } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  useSearchParams,
  type LinkProps,
  type NavLinkProps,
  type NavigateProps,
} from 'react-router-dom';
import { localizedTo } from '~/extensions/localized-link/localizedLinkUtils';
import { LOCALE_PARAMS } from '~/i18n';

export const LocalizedLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { state, to, ...rest } = props;

  const [searchParams] = useSearchParams();

  return (
    <Link
      to={localizedTo(to, searchParams.get(LOCALE_PARAMS))}
      state={{ ...state, previous: true }}
      ref={ref}
      {...rest}
    />
  );
});

if (__DEV__) {
  LocalizedLink.displayName = 'Link';
}

export const LocalizedNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  const { state, to, ...rest } = props;

  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={localizedTo(to, searchParams.get(LOCALE_PARAMS))}
      state={{ ...state, previous: true }}
      ref={ref}
      {...rest}
    />
  );
});

if (__DEV__) {
  LocalizedNavLink.displayName = 'NavLink';
}

export const LocalizedNavigate = (props: NavigateProps) => {
  const { to, ...rest } = props;
  const [searchParams] = useSearchParams();

  return <Navigate to={localizedTo(to, searchParams.get(LOCALE_PARAMS))} {...rest} />;
};
