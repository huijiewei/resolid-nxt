import { relations, sql } from 'drizzle-orm';
import { datetime, index, int, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';
import { nxtMysqlTable } from '~/engine/core/schema';
import { users } from '~/engine/modules/user/schema';

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
