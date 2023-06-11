// from https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/cookies.ts

import type { CookieParseOptions, CookieSerializeOptions } from 'cookie';
import { parse, serialize } from 'cookie';

export type CookieOptions = CookieParseOptions & CookieSerializeOptions;

export type Cookie = {
  readonly name: string;
  readonly expires?: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse(cookieHeader: string | null, options?: CookieParseOptions): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize(value: any, options?: CookieSerializeOptions): Promise<string>;
};

export type CreateCookieFunction = (name: string, cookieOptions?: CookieOptions) => Cookie;

export const createCookieFactory =
  (): CreateCookieFunction =>
  (name, cookieOptions = {}) => {
    const options = {
      path: '/',
      sameSite: 'lax' as const,
      ...cookieOptions,
    };

    return {
      get name() {
        return name;
      },
      get expires() {
        return typeof options.maxAge !== 'undefined' ? new Date(Date.now() + options.maxAge * 1000) : options.expires;
      },
      async parse(cookieHeader, parseOptions) {
        if (!cookieHeader) {
          return null;
        }

        const cookies = parse(cookieHeader, { ...options, ...parseOptions });

        return name in cookies ? (cookies[name] === '' ? '' : decodeData(cookies[name])) : null;
      },
      async serialize(value, serializeOptions) {
        return serialize(name, value === '' ? '' : encodeData(value), {
          ...options,
          ...serializeOptions,
        });
      },
    };
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCookie = (object: any): object is Cookie => {
  return (
    object != null &&
    typeof object.name === 'string' &&
    typeof object.signed === 'boolean' &&
    typeof object.parse === 'function' &&
    typeof object.serialize === 'function'
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const encodeData = (value: any): string => btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const decodeData = (value: string): any => {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch (error: unknown) {
    return {};
  }
};

const myEscape = (value: string): string => {
  const str = value.toString();

  let result = '';
  let index = 0;
  let chr, code;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr;
    } else {
      code = chr.charCodeAt(0);
      if (code < 256) {
        result += '%' + hex(code, 2);
      } else {
        result += '%u' + hex(code, 4).toUpperCase();
      }
    }
  }
  return result;
};

const hex = (code: number, length: number): string => {
  let result = code.toString(16);
  while (result.length < length) result = '0' + result;
  return result;
};

// See: https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.unescape.js
const myUnescape = (value: string): string => {
  const str = value.toString();

  let result = '';
  let index = 0;
  let chr, part;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (chr === '%') {
      if (str.charAt(index) === 'u') {
        part = str.slice(index + 1, index + 5);
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
};
