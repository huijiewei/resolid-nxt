import { desc, eq, inArray } from 'drizzle-orm';
import { randomBytes } from 'node:crypto';
import { db } from '~/foundation/db';
import type { UserInsert, UserSelect } from './schema';
import { userSessions, users } from './schema';

export const findUserByLast = async (): Promise<UserSelect | null> => {
  const result = await db.select().from(users).orderBy(desc(users.id)).limit(1);

  return result[0] ?? null;
};

export const findUserByEmail = async (email: string): Promise<UserSelect | null> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      userGroup: true,
    },
  });

  return user ?? null;
};

export const updateUserSession = async (
  userId: number,
  expires: Date,
  token: string | null = null
): Promise<string> => {
  if (token) {
    await db.update(userSessions).set({ userId: userId, expiredAt: expires }).where(eq(userSessions.token, token));
  }

  token = Buffer.from(randomBytes(32)).toString('hex');

  await db.insert(userSessions).values({
    userId: userId,
    token: token,
    expiredAt: expires,
  });

  return token;
};

export const deleteUserSession = async (token: string) => {
  await db.delete(userSessions).where(eq(userSessions.token, token));
};

export const findUserBySessionToken = async (token: string): Promise<UserSelect | null> => {
  const user = await db.query.users.findFirst({
    where: inArray(
      users.id,
      db.select({ data: userSessions.userId }).from(userSessions).where(eq(userSessions.token, token))
    ),
    with: {
      userGroup: true,
    },
  });

  return user ?? null;
};

export const existByEmail = async (email: string) => {
  return Boolean(await db.query.users.findFirst({ where: eq(users.email, email) }));
};

export const existByUsername = async (username: string) => {
  return Boolean(await db.query.users.findFirst({ where: eq(users.username, username) }));
};

export const insertUser = async (user: UserInsert) => {
  const inserted = await db.insert(users).values(user);

  return { ...user, id: inserted[0].insertId } as UserSelect;
};
