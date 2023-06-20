import { type User } from '@prisma/client';
import { createSessionStorage, type SessionIdStorageStrategy, type SessionStorage } from '@resolid/nxt-run/node';
import { omit } from '@resolid/nxt-utils';
import { randomBytes } from 'node:crypto';
import { db } from '~/foundation/db';

export type SessionUser = Omit<User, 'password' | 'updatedAt' | 'deletedAt'>;

export const omitUser = (user: User): SessionUser => {
  return omit(user, ['password', 'updatedAt', 'deletedAt']) as SessionUser;
};

const createDatabaseSessionStorage = ({
  cookie,
}: {
  cookie: SessionIdStorageStrategy['cookie'];
}): SessionStorage<SessionUser> =>
  createSessionStorage({
    cookie,
    async createData(data, expires) {
      const token = Buffer.from(randomBytes(8)).toString('hex');

      await db.userSession.create({
        data: {
          userId: data.id,
          token: token,
          expiredAt: expires || new Date(Date.now() + 1000 * 60 * 30),
        },
      });

      return token;
    },
    async readData(id) {
      const user = await db.user.findFirst({
        where: {
          userSessions: {
            some: {
              token: id,
            },
          },
        },
        include: {
          userGroup: true,
        },
      });

      return user ? omitUser(user) : null;
    },
    async updateData(id, data, expires) {
      await db.userSession.update({
        where: {
          token: id,
        },
        data: {
          userId: data.id,
          expiredAt: expires,
        },
      });
    },
    async deleteData(id) {
      await db.userSession.delete({
        where: {
          token: id,
        },
      });
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
