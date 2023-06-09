import { Prisma, PrismaClient } from '@prisma/client';

const allModels = Prisma.dmmf.datamodel.models;

type ClosureModel = {
  modelName: string;
  modelDbName: string | null;
  closureModelName: string;
  closureModelDbName: string | null;
};

const closureModelMap = new Map<string, ClosureModel | null>(
  allModels.map((m) => {
    if (!m.fields.some((f) => f.name == 'parentId')) {
      return [m.name, null];
    }

    const closureModel = allModels.find((am) => am.name == `${m.name}Closure`);

    if (!closureModel) {
      return [m.name, null];
    }

    return [
      m.name,
      {
        modelName: m.name,
        modelDbName: m.dbName,
        closureModelName: closureModel.name,
        closureModelDbName: closureModel.dbName,
      },
    ];
  })
);

const getDbName = (model: ClosureModel) => {
  return {
    dbName: model.modelDbName ?? model.modelName,
    closureDbName: model.closureModelDbName ?? model.closureModelName,
  };
};

export const closureTableMiddleware = (db: PrismaClient): Prisma.Middleware => {
  return async (params, next) => {
    const closureTableModel = closureModelMap.get(String(params.model));

    if (closureTableModel) {
      //
    }

    const result = await next(params);

    if (closureTableModel) {
      if (params.action == 'create') {
        const { closureDbName } = getDbName(closureTableModel);

        await db.$executeRawUnsafe(
          `INSERT INTO ${closureDbName} (ancestor, descendant, distance)
      SELECT ancestor, ${result.id} AS descendant, distance + 1 AS distance FROM ${closureDbName} WHERE descendant = ${result.parentId}
      UNION ALL
      SELECT ${result.id} AS ancestor, ${result.id} AS descendant, 0 AS distance`
        );
      }

      if (params.action == 'update') {
        const { closureDbName } = getDbName(closureTableModel);

        await db.$executeRawUnsafe(
          `DELETE C FROM ${closureDbName} AS C
          INNER JOIN ${closureDbName} AS D ON C.descendant = D.descendant
          LEFT JOIN ${closureDbName} AS A ON A.ancestor = D.ancestor AND A.descendant = C.ancestor
          WHERE D.ancestor = ${result.id} AND A.ancestor IS NULL`
        );

        await db.$executeRawUnsafe(
          `INSERT INTO ${closureDbName} (ancestor, descendant, distance)
          SELECT A.ancestor, D.descendant, A.distance + D.distance + 1 FROM ${closureDbName} AS A
          CROSS JOIN ${closureDbName} AS D WHERE D.ancestor = ${result.id} AND A.descendant = ${result.parentId}`
        );
      }

      if (params.action == 'delete') {
        const { dbName, closureDbName } = getDbName(closureTableModel);

        await db.$executeRawUnsafe(
          `DELETE D, DC FROM ${closureDbName} C
          INNER JOIN ${dbName} D ON C.descendant = D.id
          INNER JOIN ${closureDbName} DC ON DC.ancestor = D.id OR DC.descendant = D.id
          WHERE C.ancestor = ${result.id}`
        );
      }
    }

    return result;
  };
};
