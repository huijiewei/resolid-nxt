import { type InferModel } from 'drizzle-orm';
import { index, int, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';
import { nxtMysqlTable } from '~/engine/core/schema';

export const districts = nxtMysqlTable(
  'district',
  {
    id: int('id').autoincrement().primaryKey(),
    parentId: int('parentId').notNull().default(0),
    name: varchar('name', { length: 32 }).notNull().default(''),
    code: varchar('code', { length: 32 }).notNull().default(''),
    zipCode: varchar('zipCode', { length: 32 }).notNull().default(''),
    areaCode: varchar('areaCode', { length: 32 }).notNull().default(''),
  },
  (districts) => ({
    codeIndex: uniqueIndex('codeIndex').on(districts.code),
    parentIdIndex: index('parentIdIndex').on(districts.parentId),
    nameIndex: index('nameIndex').on(districts.name),
  })
);

export type DistrictSelect = InferModel<typeof districts, 'select'>;
export type DistrictInsert = InferModel<typeof districts, 'insert'>;

export const districtsClosure = nxtMysqlTable(
  'district_closure',
  {
    id: int('id').autoincrement().primaryKey(),
    ancestor: int('ancestor').notNull().default(0),
    descendant: int('descendant').notNull().default(0),
    distance: int('distance').notNull().default(0),
  },
  (districts) => ({
    distanceIndex: index('distanceIndex').on(districts.distance),
    ancestorIndex: index('ancestorIndex').on(districts.ancestor, districts.descendant),
    descendantIndex: index('descendantIndex').on(districts.descendant, districts.distance),
  })
);
