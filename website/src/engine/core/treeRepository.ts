import { sql } from 'drizzle-orm';
import { db } from '~/foundation/db';

const getClosureTableName = (tableName: string) => {
  return `${tableName}_closure`;
};

type ClosureEntity = {
  id: number;
  parentId: number;
};

export const insertClosure = async <T extends ClosureEntity>(entity: T, tableName: string) => {
  const closureTableName = getClosureTableName(tableName);

  await db.execute(
    sql.raw(`INSERT INTO ${closureTableName} (ancestor, descendant, distance)
      SELECT ancestor, ${entity.id} AS descendant, distance + 1 AS distance FROM ${closureTableName} WHERE descendant = ${entity.parentId}
      UNION ALL
      SELECT ${entity.id} AS ancestor, ${entity.id} AS descendant, 0 AS distance`)
  );
};

export const updateClosure = async <T extends ClosureEntity>(entity: T, tableName: string) => {
  const closureTableName = getClosureTableName(tableName);

  await db.transaction(async (tx) => {
    await tx.execute(
      sql.raw(`DELETE C FROM ${closureTableName} AS C
          INNER JOIN ${closureTableName} AS D ON C.descendant = D.descendant
          LEFT JOIN ${closureTableName} AS A ON A.ancestor = D.ancestor AND A.descendant = C.ancestor
          WHERE D.ancestor = ${entity.id} AND A.ancestor IS NULL`)
    );

    await tx.execute(
      sql.raw(`INSERT INTO ${closureTableName} (ancestor, descendant, distance)
          SELECT A.ancestor, D.descendant, A.distance + D.distance + 1 FROM ${closureTableName} AS A
          CROSS JOIN ${closureTableName} AS D WHERE D.ancestor = ${entity.id} AND A.descendant = ${entity.parentId}`)
    );
  });
};

export const deleteClosure = async <T extends ClosureEntity>(entity: T, tableName: string) => {
  const closureTableName = getClosureTableName(tableName);

  await db.execute(
    sql.raw(`DELETE D, DC FROM ${closureTableName} C
          INNER JOIN ${tableName} D ON C.descendant = D.id
          INNER JOIN ${closureTableName} DC ON DC.ancestor = D.id OR DC.descendant = D.id
          WHERE C.ancestor = ${entity.id}`)
  );
};

export const findDescendantsById = async (id: number, tableName: string) => {
  const closureTableName = getClosureTableName(tableName);

  return await db.execute(
    sql`SELECT E.* FROM ${sql.raw(tableName)} AS E
    INNER JOIN ${sql.raw(closureTableName)} AS D ON E.id = D.descendant
    WHERE D.ancestor = ${id} ORDER BY E.id ASC`
  );
};

export const findAncestorsById = async (id: number, tableName: string) => {
  const closureTableName = getClosureTableName(tableName);

  return await db.execute(
    sql`SELECT E.* FROM ${sql.raw(tableName)} AS E
    INNER JOIN ${sql.raw(closureTableName)} AS A ON E.id = A.ancestor
    WHERE A.descendant = ${id} ORDER BY E.id ASC`
  );
};
