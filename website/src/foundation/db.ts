import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import * as blogSchema from '~/engine/modules/blog/schema';
import * as districtSchema from '~/engine/modules/district/schema';
import * as userSchema from '~/engine/modules/user/schema';

const pool = await mysql.createPool({
  host: process.env.NXT_DB_HOST,
  user: process.env.NXT_DB_USER,
  password: process.env.NXT_DB_PASSWORD,
  database: process.env.NXT_DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, {
  schema: { ...userSchema, ...blogSchema, ...districtSchema },
  logger: process.env.NODE_ENV == 'development',
});
