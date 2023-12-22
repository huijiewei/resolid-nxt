// noinspection JSUnusedGlobalSymbols

import { createCookieFactory } from './cookie';
import { createSessionStorageFactory, type SessionIdStorageStrategy, type SessionStorage } from './session';

export * from './http';

export type { SessionIdStorageStrategy, SessionStorage };

export const createCookie = createCookieFactory();

export const createSessionStorage = createSessionStorageFactory(createCookie);
