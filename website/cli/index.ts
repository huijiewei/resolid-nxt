import 'dotenv/config';

import { faker } from '@faker-js/faker';
import { hashSync } from '@node-rs/bcrypt';
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { insertDistrict } from '~/engine/modules/district/districtRepository';
import { districts, districtsClosure } from '~/engine/modules/district/schema';
import { userGroups, users } from '~/engine/modules/user/schema';
import { existByEmail, existByUsername, findUserByLast, insertUser } from '~/engine/modules/user/userRepository';
import { db } from '~/foundation/db';

const program = new Command();

program.name('nxt-cli').description('CLI to Resolid Nxt').version('0.1.0');

program
  .command('seed')
  .description('Database seed')
  .action(async () => {
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

program
  .command('district-import')
  .description('Import district data from json file')
  .action(async () => {
    const json = JSON.parse(readFileSync(join(process.cwd(), './runtime/data/pcas-code.json'), 'utf8')) as District[];

    console.log('Load district json data success!');

    await db.delete(districts);
    await db.delete(districtsClosure);

    console.log('Empty old district data success!');

    for (const item of json) {
      await createDistrict(item, 0);
    }
  });

program
  .command('user-fake')
  .description('Fake user')
  .argument('[number]', 'User number', (value) => parseInt(value, 10), 20)
  .action(async (number: number) => {
    const lastUser = await findUserByLast();

    let fakeCreatedAtTimestamp =
      lastUser && lastUser.id > 2000 ? lastUser.createdAt.getTime() / 1000 : new Date('2022-01-01').getTime() / 1000;

    for (let i = 0; i < number; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.userName({ firstName, lastName });
      const email = faker.internet.email({ firstName, lastName, allowSpecialCharacters: false });

      if (await existByUsername(username)) {
        console.log(`Username: ${username} is exist, ignore.`);
        continue;
      }

      if (await existByEmail(email)) {
        console.log(`Email: ${email} is exist, ignore.`);
        continue;
      }

      const password = faker.internet.password();

      fakeCreatedAtTimestamp += faker.number.int({ max: 28800 - 30 + 1 });

      const avatar = faker.number.int({ max: 100 }) > 11 ? faker.image.avatar() : '';

      const createdAt = new Date(fakeCreatedAtTimestamp * 1000);

      await insertUser({
        userGroupId: 3,
        email: email,
        emailVerified: faker.number.int({ max: 100 }) > 30 ? null : createdAt,
        username: username,
        password: hashSync(password),
        avatar: avatar,
        nickname: faker.internet.displayName({ firstName, lastName }),
        createdAt: createdAt,
      });

      console.log(`Insert user ${email} success!`);
    }

    process.exit(0);
  });

await program.parseAsync(process.argv);
