import { getTableConfig } from 'drizzle-orm/mysql-core';
import { insertClosure } from '~/engine/core/treeRepository';
import { db } from '~/foundation/db';
import type { DistrictInsert, DistrictSelect } from './schema';
import { districts } from './schema';

export const insertDistrict = async (district: DistrictInsert) => {
  const inserted = await db.insert(districts).values(district);

  const { name } = getTableConfig(districts);

  const result = { ...district, id: inserted[0].insertId } as DistrictSelect;

  await insertClosure(result, name);

  return result;
};
