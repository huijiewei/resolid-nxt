import { relations, sql } from 'drizzle-orm';
import { datetime, index, int, unique, varchar } from 'drizzle-orm/mysql-core';
import { nxtMysqlTable } from '~/engine/core/baseSchema';

export const users = nxtMysqlTable(
  'user',
  {
    id: int('id').autoincrement().primaryKey(),
    userGroupId: int('userGroupId').notNull().default(0),
    email: varchar('email', { length: 90 }).notNull().default(''),
    emailVerified: datetime('emailVerified'),
    username: varchar('username', { length: 32 }).notNull().default(''),
    password: varchar('password', { length: 191 }).notNull().default(''),
    nickname: varchar('nickname', { length: 32 }).notNull().default(''),
    avatar: varchar('avatar', { length: 191 }).notNull().default(''),
    createdAt: datetime('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updatedAt'),
    deletedAt: datetime('deletedAt'),
  },
  (users) => ({
    emailIndex: unique('emailIndex').on(users.email),
    usernameIndex: unique('usernameIndex').on(users.username),
    userGroupIdIndex: index('userGroupIdIndex').on(users.userGroupId),
    deletedAtIndex: index('deletedAtIndex').on(users.deletedAt),
  }),
);

export type UserSelect = typeof users.$inferSelect;
export type UserSelectWithGroup = UserSelect & { userGroup: UserGroupSelect };
export type UserInsert = typeof users.$inferInsert;

export const userGroups = nxtMysqlTable('user_group', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 32 }).notNull().default(''),
  color: varchar('color', { length: 32 }).notNull().default(''),
  icon: varchar('icon', { length: 191 }).notNull().default(''),
});

export type UserGroupSelect = typeof userGroups.$inferSelect;
export type UserGroupInsert = typeof userGroups.$inferInsert;

export const userAccounts = nxtMysqlTable(
  'user_accounts',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('userId').notNull().default(0),
    type: varchar('type', { length: 32 }).notNull().default(''),
    provider: varchar('provider', { length: 32 }).notNull().default(''),
    providerAccountId: varchar('providerAccountId', { length: 191 }).notNull().default(''),
    refreshToken: varchar('refreshToken', { length: 191 }).notNull().default(''),
    accessToken: varchar('accessToken', { length: 191 }).notNull().default(''),
    expiresIn: int('expiresIn').notNull().default(0),
    tokenType: varchar('tokenType', { length: 32 }).notNull().default(''),
    scope: varchar('scope', { length: 32 }).notNull().default(''),
    idToken: varchar('idToken', { length: 191 }).notNull().default(''),
    sessionState: varchar('sessionState', { length: 191 }).notNull().default(''),
  },
  (userAccounts) => ({
    providerIndex: unique('providerIndex').on(userAccounts.provider, userAccounts.providerAccountId),
    userIdIndex: index('userIdIndex').on(userAccounts.userId),
  }),
);

export const userSessions = nxtMysqlTable(
  'user_session',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('userId').notNull().default(0),
    token: varchar('token', { length: 191 }).notNull().default(''),
    expiredAt: datetime('expiredAt').notNull(),
  },
  (userSessions) => ({
    tokenIndex: unique('tokenIndex').on(userSessions.token),
    userIdIndex: index('userIdIndex').on(userSessions.userId),
  }),
);

export const usersRelations = relations(users, ({ one }) => ({
  userGroup: one(userGroups, {
    fields: [users.userGroupId],
    references: [userGroups.id],
  }),
}));
