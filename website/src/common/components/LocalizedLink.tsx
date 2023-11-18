import { __DEV__, isNumber, isString } from '@resolid/nxt-utils';
import { forwardRef } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  createSearchParams,
  redirect,
  useNavigate,
  useSearchParams,
  type LinkProps,
  type NavLinkProps,
  type NavigateFunction,
  type NavigateOptions,
  type NavigateProps,
  type To,
} from 'react-router-dom';
import { DEFAULT_LOCALE, LOCALE_PARAMS } from '~/i18n';

const localizedTo = (to: To, locale: string | null): To => {
  if (isString(to)) {
    to = {
      pathname: to,
    };
  }

  const searchParams = createSearchParams(to.search);

  if (locale) {
    searchParams.set(LOCALE_PARAMS, locale);
  }

  return {
    ...to,
    search: searchParams.toString(),
  };
};

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

// eslint-disable-next-line react-refresh/only-export-components
export const useLocalizedNavigate = (): NavigateFunction => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (to, options: NavigateOptions = {}) => {
    if (isNumber(to)) {
      navigate(to);
    }

    navigate(localizedTo(to as To, searchParams.get(LOCALE_PARAMS)), options);
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const getLocale = (request: Request): string | null => {
  return new URL(request.url).searchParams.get(LOCALE_PARAMS);
};

// eslint-disable-next-line react-refresh/only-export-components
export const getLocaleWithDefault = (request: Request): string => {
  return getLocale(request) ?? DEFAULT_LOCALE;
};

// eslint-disable-next-line react-refresh/only-export-components
export const localizedRedirect = (url: string, request: Request, init?: number | ResponseInit) => {
  const locale = getLocale(request);

  if (locale) {
    const search = createSearchParams([[LOCALE_PARAMS, locale]]).toString();
    const join = url.includes('?') ? '&' : '?';

    url = `${url}${join}${search}`;
  }

  return redirect(url, init);
};

// eslint-disable-next-line react-refresh/only-export-components
export const getLocaleUrl = (url: string, locale?: string) => {
  const newUrl = new URL(url);
  newUrl.searchParams.delete(LOCALE_PARAMS);

  if (locale && locale != DEFAULT_LOCALE) {
    newUrl.searchParams.set(LOCALE_PARAMS, locale);
  }

  return newUrl.toString();
};
