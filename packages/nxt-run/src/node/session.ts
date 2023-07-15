// from https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/sessions.ts

import type { CookieParseOptions, CookieSerializeOptions } from 'cookie';

import type { Cookie, CookieOptions, CreateCookieFunction } from './cookie';
import { isCookie } from './cookie';

export type SessionData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
};

export interface Session<Data = SessionData, FlashData = Data> {
  readonly id: string;
  readonly data: FlashSessionData<Data, FlashData>;

  has(name: (keyof Data | keyof FlashData) & string): boolean;

  get<Key extends (keyof Data | keyof FlashData) & string>(
    name: Key,
  ):
    | (Key extends keyof Data ? Data[Key] : undefined)
    | (Key extends keyof FlashData ? FlashData[Key] : undefined)
    | undefined;

  set<Key extends keyof Data & string>(name: Key, value: Data[Key]): void;

  flash<Key extends keyof FlashData & string>(name: Key, value: FlashData[Key]): void;

  unset(name: keyof Data & string): void;
}

export type FlashSessionData<Data, FlashData> = Partial<
  Data & {
    [Key in keyof FlashData as FlashDataKey<Key & string>]: FlashData[Key];
  }
>;

type FlashDataKey<Key extends string> = `__flash_${Key}__`;

const flash = <Key extends string>(name: Key): FlashDataKey<Key> => `__flash_${name}__`;

export type CreateSessionFunction = <Data = SessionData, FlashData = Data>(
  initialData?: Data,
  id?: string,
) => Session<Data, FlashData>;

export const createSession: CreateSessionFunction = <Data = SessionData, FlashData = Data>(
  initialData: Partial<Data> = {},
  id = '',
): Session<Data, FlashData> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = new Map(Object.entries(initialData)) as Map<keyof Data | FlashDataKey<keyof FlashData & string>, any>;

  return {
    get id() {
      return id;
    },
    get data() {
      return Object.fromEntries(map) as FlashSessionData<Data, FlashData>;
    },
    has(name) {
      return map.has(name as keyof Data) || map.has(flash(name as keyof FlashData & string));
    },
    get(name) {
      if (map.has(name as keyof Data)) return map.get(name as keyof Data);

      const flashName = flash(name as keyof FlashData & string);
      if (map.has(flashName)) {
        const value = map.get(flashName);
        map.delete(flashName);
        return value;
      }

      return undefined;
    },
    set(name, value) {
      map.set(name, value);
    },
    flash(name, value) {
      map.set(flash(name), value);
    },
    unset(name) {
      map.delete(name);
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSession = (object: any): object is Session => {
  return (
    object != null &&
    typeof object.id === 'string' &&
    typeof object.data !== 'undefined' &&
    typeof object.has === 'function' &&
    typeof object.get === 'function' &&
    typeof object.set === 'function' &&
    typeof object.flash === 'function' &&
    typeof object.unset === 'function'
  );
};

export type SessionStorage<Data = SessionData, FlashData = Data> = {
  getSession: (cookieHeader?: string | null, options?: CookieParseOptions) => Promise<Session<Data, FlashData>>;
  commitSession: (session: Session<Data, FlashData>, options?: CookieSerializeOptions) => Promise<string>;
  destroySession: (session: Session<Data, FlashData>, options?: CookieSerializeOptions) => Promise<string>;
};

export type SessionIdStorageStrategy<Data = SessionData, FlashData = Data> = {
  cookie?: Cookie | (CookieOptions & { name?: string });
  createData: (data: FlashSessionData<Data, FlashData>, expires?: Date) => Promise<string>;
  readData: (id: string) => Promise<FlashSessionData<Data, FlashData> | null>;
  updateData: (id: string, data: FlashSessionData<Data, FlashData>, expires?: Date) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
};

export type CreateSessionStorageFunction = <Data = SessionData, FlashData = Data>(
  strategy: SessionIdStorageStrategy<Data, FlashData>,
) => SessionStorage<Data, FlashData>;

export const createSessionStorageFactory =
  (createCookie: CreateCookieFunction): CreateSessionStorageFunction =>
  ({ cookie: cookieArg, createData, readData, updateData, deleteData }) => {
    const cookie = isCookie(cookieArg) ? cookieArg : createCookie(cookieArg?.name || '__session', cookieArg);

    return {
      async getSession(cookieHeader, options) {
        const id = cookieHeader && (await cookie.parse(cookieHeader, options));
        const data = id && (await readData(id));
        return createSession(data || {}, id || '');
      },
      async commitSession(session, options) {
        // eslint-disable-next-line prefer-const
        let { id, data } = session;

        let expires = cookie.expires;

        if (options?.expires) {
          expires = options.expires;
        }

        if (options?.maxAge) {
          expires = new Date(Date.now() + options.maxAge * 1000);
        }

        if (id) {
          await updateData(id, data, expires);
        } else {
          id = await createData(data, expires);
        }

        return cookie.serialize(id, options);
      },
      async destroySession(session, options) {
        await deleteData(session.id);
        return cookie.serialize('', {
          ...options,
          expires: new Date(0),
        });
      },
    };
  };
