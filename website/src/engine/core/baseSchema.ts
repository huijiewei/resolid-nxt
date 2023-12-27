import { mysqlTableCreator } from 'drizzle-orm/mysql-core';

export const nxtMysqlTable = mysqlTableCreator((name) => {
  const tablePrefix = process.env.NXT_DB_TABLE_PREFIX ?? '';

  return tablePrefix + name;
});
