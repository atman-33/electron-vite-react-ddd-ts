import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const todoTypeData: Prisma.TodoTypeCreateInput[] = [
  {
    name: 'private',
    sort_order: 1
  },
  {
    name: 'work',
    sort_order: 2
  }
];

const transfer = async () => {
  const todoTypes: any = [];
  for (const t of todoTypeData) {
    const todoType = prisma.todoType.create({
      data: t
    });
    todoTypes.push(todoType);
  }
  return await prisma.$transaction(todoTypes);
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`);

  await transfer();

  console.log(`Seeding finished.`);
};

// 処理開始
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
