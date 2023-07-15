import { getTableConfig } from 'drizzle-orm/mysql-core';
import { insertClosure } from '~/engine/core/treeService';
import { db } from '~/foundation/db';
import type { DistrictInsert, DistrictSelect } from './districtSchema';
import { districts } from './districtSchema';

export const insertDistrict = async (district: DistrictInsert) => {
  const inserted = await db.insert(districts).values(district);

  const { name } = getTableConfig(districts);

  const result = { ...district, id: inserted[0].insertId } as DistrictSelect;

  await insertClosure(result, name);

  return result;
};
