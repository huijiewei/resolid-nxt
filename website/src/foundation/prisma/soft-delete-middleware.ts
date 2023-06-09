import { Prisma } from '@prisma/client';
import { createSoftDeleteMiddleware } from 'prisma-soft-delete-middleware';

const softDeleteModels = Prisma.dmmf.datamodel.models
  .filter((m) => m.fields.some((f) => f.name == 'deletedAt'))
  .map((md) => ({ [md.name]: true }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});

export const softDeleteMiddleware = () =>
  createSoftDeleteMiddleware({
    models: softDeleteModels,
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date();
        return null;
      },
    },
  });
