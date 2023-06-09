import { PrismaClient } from '@prisma/client';
import { closureTableMiddleware } from './prisma/closure-table-middleware';
import { softDeleteMiddleware } from './prisma/soft-delete-middleware';

interface PrismaNodeJsGlobal extends Global {
  prisma: PrismaClient | null;
}

declare const global: PrismaNodeJsGlobal;

const db = global.prisma || new PrismaClient();

db.$use(softDeleteMiddleware());
db.$use(closureTableMiddleware(db));

if (process.env.NODE_ENV === 'development') global.prisma = db;

export { db };
