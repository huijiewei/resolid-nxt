import 'dotenv/config';

import { hashSync } from '@node-rs/bcrypt';
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { districts, districtsClosure, userGroups, users } from '~/engine/core/schema';
import { insertDistrict } from '~/engine/modules/district/districtRepository';
import { db } from '~/foundation/db';

const program = new Command();

program.command('seed').action(async () => {
  await db.delete(users);
  await db.delete(userGroups);

  await db.insert(userGroups).values([
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Guest' },
    { id: 3, name: 'Member' },
  ]);

  await db.insert(users).values({
    id: 1,
    userGroupId: 1,
    email: 'admin@resolid.tech',
    emailVerified: new Date(),
    username: 'admin',
    nickname: 'Admin',
    password: hashSync('123456'),
  });

  console.log('Database seed success!');

  process.exit(0);
});

type District = {
  code: string;
  name: string;
  children?: District[];
};

const createDistrict = async (district: District, parentId: number) => {
  const newDistrict = await insertDistrict({
    parentId: parentId,
    name: district.name,
    code: district.code,
  });

  console.log(`Insert district ${district.name} success!`);

  if (district.children) {
    for (const child of district.children) {
      await createDistrict(child, newDistrict.id);
    }
  }
};

program.command('district-import').action(async () => {
  const json = JSON.parse(readFileSync(join(process.cwd(), './runtime/data/pcas-code.json'), 'utf8')) as District[];

  console.log('Load district json data success!');

  await db.delete(districts);
  await db.delete(districtsClosure);

  console.log('Empty old district data success!');

  for (const item of json) {
    await createDistrict(item, 0);
  }
});

program.parse();
