import { mysqlTableCreator } from 'drizzle-orm/mysql-core';

export const nxtMysqlTable = mysqlTableCreator((name) => {
  return `nxt_${name}`;
});
