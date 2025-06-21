/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Departments and their positions
  const data = [
    {
      departmentName: 'Human Resources',
      positions: ['HR Officer', 'HR Assistant'],
    },
    {
      departmentName: 'Finance',
      positions: ['Accountant', 'Finance Assistant'],
    },
    {
      departmentName: 'Inventory',
      positions: ['Inventory Clerk', 'Stockroom Supervisor'],
    },
    {
      departmentName: 'Operations',
      positions: ['Operations Manager', 'Driver', 'Conductor', 'Dispatcher'],
    },
  ];

  for (const dept of data) {
    // Upsert the department
    const department = await prisma.department.upsert({
      where: { departmentName: dept.departmentName },
      update: {},
      create: { departmentName: dept.departmentName },
    });

    // Seed positions (skip if already exist)
    for (const positionName of dept.positions) {
      await prisma.position.upsert({
        where: {
          // Combination of positionName and departmentId must be unique
          // You may want to add a @@unique([positionName, departmentId]) constraint in your schema!
          positionName_departmentId: {
            positionName,
            departmentId: department.id,
          },
        },
        update: {},
        create: {
          positionName,
          departmentId: department.id,
        },
      });
    }
  }

  console.log('Departments and positions seeded successfully.');
}

main()
  .catch((e) => console.error('Error seeding data:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
