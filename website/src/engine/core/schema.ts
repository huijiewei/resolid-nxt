import { relations, sql, type InferModel } from 'drizzle-orm';
import { datetime, index, int, mysqlTableCreator, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const nxtMysqlTable = mysqlTableCreator((name) => {
  return `nxt_${name}`;
});

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
    emailIndex: uniqueIndex('emailIndex').on(users.email),
    usernameIndex: uniqueIndex('usernameIndex').on(users.username),
    userGroupIdIndex: index('userGroupIdIndex').on(users.userGroupId),
    deletedAtIndex: index('deletedAtIndex').on(users.deletedAt),
  })
);

export type UserSelect = InferModel<typeof users, 'select'>;
export type UserInsert = InferModel<typeof users, 'insert'>;

export const userGroups = nxtMysqlTable('user_group', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 32 }).notNull().default(''),
  color: varchar('color', { length: 32 }).notNull().default(''),
  icon: varchar('icon', { length: 191 }).notNull().default(''),
});

export type UserGroupSelect = InferModel<typeof userGroups, 'select'>;
export type UserGroupInsert = InferModel<typeof userGroups, 'insert'>;

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
    providerIndex: uniqueIndex('providerIndex').on(userAccounts.provider, userAccounts.providerAccountId),
    userIdIndex: index('userIdIndex').on(userAccounts.userId),
  })
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
    tokenIndex: uniqueIndex('tokenIndex').on(userSessions.token),
    userIdIndex: index('userIdIndex').on(userSessions.userId),
  })
);

export const usersRelations = relations(users, ({ one }) => ({
  userGroup: one(userGroups, {
    fields: [users.userGroupId],
    references: [userGroups.id],
  }),
}));

export const districts = nxtMysqlTable(
  'district',
  {
    id: int('id').autoincrement().primaryKey(),
    parentId: int('parentId').notNull().default(0),
    name: varchar('name', { length: 32 }).notNull().default(''),
    code: varchar('code', { length: 32 }).notNull().default(''),
    zipCode: varchar('zipCode', { length: 32 }).notNull().default(''),
    areaCode: varchar('areaCode', { length: 32 }).notNull().default(''),
  },
  (districts) => ({
    codeIndex: uniqueIndex('codeIndex').on(districts.code),
    parentIdIndex: index('parentIdIndex').on(districts.parentId),
    nameIndex: index('nameIndex').on(districts.name),
  })
);

export type DistrictSelect = InferModel<typeof districts, 'select'>;
export type DistrictInsert = InferModel<typeof districts, 'insert'>;

export const districtsClosure = nxtMysqlTable(
  'district_closure',
  {
    id: int('id').autoincrement().primaryKey(),
    ancestor: int('ancestor').notNull().default(0),
    descendant: int('descendant').notNull().default(0),
    distance: int('distance').notNull().default(0),
  },
  (districts) => ({
    distanceIndex: index('distanceIndex').on(districts.distance),
    ancestorIndex: index('ancestorIndex').on(districts.ancestor, districts.descendant),
    descendantIndex: index('descendantIndex').on(districts.descendant, districts.distance),
  })
);

export const blogCategories = nxtMysqlTable(
  'blog_category',
  {
    id: int('id').autoincrement().primaryKey(),
    parentId: int('parentId').notNull().default(0),
    slug: varchar('slug', { length: 32 }).notNull().default(''),
    name: varchar('name', { length: 32 }).notNull().default(''),
  },
  (blogCategories) => ({
    slugIndex: uniqueIndex('slugIndex').on(blogCategories.slug),
    parentIdIndex: index('parentId').on(blogCategories.parentId),
  })
);

export const blogPosts = nxtMysqlTable(
  'blog_post',
  {
    id: int('id').autoincrement().primaryKey(),
    userId: int('userId').notNull().default(0),
    blogCategoryId: int('blogCategoryId').notNull().default(0),
    slug: varchar('slug', { length: 90 }).notNull().default(''),
    title: varchar('title', { length: 90 }).notNull().default(''),
    viewCount: int('viewCount').notNull().default(0),
    commentCount: int('commentCount').notNull().default(0),
    excerpt: text('excerpt'),
    content: text('content'),
    createdAt: datetime('createdAt')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updatedAt'),
    deletedAt: datetime('deletedAt'),
  },
  (blogPosts) => ({
    slugIndex: uniqueIndex('slugIndex').on(blogPosts.slug, blogPosts.userId),
    userIdIndex: index('userIdIndex').on(blogPosts.userId),
    blogCategoryIdIndex: index('blogCategoryIdIndex').on(blogPosts.blogCategoryId),
  })
);

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  user: one(users, {
    fields: [blogPosts.userId],
    references: [users.id],
  }),
  blogCategory: one(blogCategories, {
    fields: [blogPosts.blogCategoryId],
    references: [blogCategories.id],
  }),
}));
