import { isString } from '@resolid/nxt-utils';
import { createSearchParams, redirect, type To } from 'react-router-dom';
import { DEFAULT_LOCALE, LOCALE_PARAMS } from '~/i18n';

export const localizedTo = (to: To, locale: string | null): To => {
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

export const localizedRedirect = (url: string, request: Request, init?: number | ResponseInit) => {
  const locale = getLocale(request);

  if (locale) {
    const search = createSearchParams([[LOCALE_PARAMS, locale]]).toString();
    const join = url.includes('?') ? '&' : '?';

    url = `${url}${join}${search}`;
  }

  return redirect(url, init);
};

export const getLocale = (request: Request): string | null => {
  return new URL(request.url).searchParams.get(LOCALE_PARAMS);
};

export const getLocaleWithDefault = (request: Request): string => {
  return getLocale(request) ?? DEFAULT_LOCALE;
};

export const getLocaleUrl = (url: string, locale?: string) => {
  const newUrl = new URL(url);
  newUrl.searchParams.delete(LOCALE_PARAMS);

  if (locale && locale != DEFAULT_LOCALE) {
    newUrl.searchParams.set(LOCALE_PARAMS, locale);
  }

  return newUrl.toString();
};
