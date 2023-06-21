import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import * as schema from '~/engine/core/schema';

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
  schema,
  logger: process.env.NODE_ENV == 'development',
});
