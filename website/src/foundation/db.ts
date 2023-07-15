import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import * as blogSchema from '~/engine/modules/blog/blogSchema';
import * as districtSchema from '~/engine/modules/district/districtSchema';
import * as forumSchema from '~/engine/modules/forum/formSchema';
import * as userSchema from '~/engine/modules/user/userSchema';

process.env.TZ = 'UTC';

const pool = mysql.createPool({
  host: process.env.NXT_DB_HOST,
  user: process.env.NXT_DB_USER,
  password: process.env.NXT_DB_PASSWORD,
  database: process.env.NXT_DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, {
  schema: { ...userSchema, ...blogSchema, ...districtSchema, ...forumSchema },
  logger: process.env.NODE_ENV == 'development',
});
