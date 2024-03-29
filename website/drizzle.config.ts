import type { Config } from 'drizzle-kit';

import 'dotenv/config';

export default {
  schema: ['./src/engine/core/baseSchema.ts', './src/engine/modules/*/*Schema.ts'],
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: `mysql://${process.env.NXT_DB_USER}:${process.env.NXT_DB_PASSWORD}@${process.env.NXT_DB_HOST}:${process.env.NXT_DB_PORT}/${process.env.NXT_DB_DATABASE}?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config;
