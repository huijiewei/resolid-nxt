import { createSessionStorage, type SessionIdStorageStrategy, type SessionStorage } from '@resolid/nxt-run/node';
import { omit } from '@resolid/nxt-utils';
import type { UserSelect } from '~/engine/modules/user/schema';
import { deleteUserSession, findUserBySessionToken, updateUserSession } from '~/engine/modules/user/userRepository';

export type SessionUser = Omit<UserSelect, 'password' | 'updatedAt' | 'deletedAt'>;

export const omitUser = (user: UserSelect): SessionUser => {
  return omit(user, ['password', 'updatedAt', 'deletedAt']) as SessionUser;
};

// noinspection JSUnusedGlobalSymbols
const createDatabaseSessionStorage = ({
  cookie,
}: {
  cookie: SessionIdStorageStrategy['cookie'];
}): SessionStorage<SessionUser> =>
  createSessionStorage({
    cookie,
    async createData(data, expires) {
      const expiredAt = expires ?? new Date(Date.now() + 1000 * 60 * 30);

      return await updateUserSession(data.id as number, expiredAt);
    },
    async readData(id) {
      const user = await findUserBySessionToken(id);

      return user ? omitUser(user) : null;
    },
    async updateData(id, data, expires) {
      const expiredAt = expires ?? new Date(Date.now() + 1000 * 60 * 30);

      await updateUserSession(data.id as number, expiredAt, id);
    },
    async deleteData(id) {
      await deleteUserSession(id);
    },
  });

const { getSession, commitSession, destroySession } = createDatabaseSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
});

export { commitSession, destroySession, getSession };
