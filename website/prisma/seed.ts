import { hashSync } from '@node-rs/bcrypt';
import { db } from '../src/foundation/db';

async function main() {
  const adminGroup = await db.userGroup.upsert({
    where: { name: 'Admin Group' },
    update: {},
    create: {
      name: 'Admin Group',
    },
  });

  const admin = await db.user.upsert({
    where: { email: 'admin@resolid.tech' },
    update: {},
    create: {
      email: 'admin@resolid.tech',
      emailVerified: new Date(),
      name: 'admin',
      password: hashSync('123456'),
      nickname: 'Admin User',
      userGroupId: adminGroup.id,
    },
  });

  console.log(admin);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
