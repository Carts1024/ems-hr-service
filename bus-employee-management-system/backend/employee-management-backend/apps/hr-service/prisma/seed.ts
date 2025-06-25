/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed departments and positions (your original code)
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
    const department = await prisma.department.upsert({
      where: { departmentName: dept.departmentName },
      update: {},
      create: { departmentName: dept.departmentName },
    });

    for (const positionName of dept.positions) {
      await prisma.position.upsert({
        where: {
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

  // Seed employees for positionId: 9
  for (let i = 1; i <= 10; i++) {
    await prisma.employee.create({
      data: {
        employeeNumber: `EMP2024-P9-${i.toString().padStart(3, '0')}`,
        firstName: `DriverFirst${i}`,
        middleName: `M${i}`,
        lastName: `DriverLast${i}`,
        suffix: i % 2 === 0 ? "Jr." : null,
        birthdate: new Date("1990-01-01"),
        hiredate: new Date("2024-06-01"),
        phone: `0917000000${i}`,
        streetAddress: `Street ${i}`,
        barangay: `Barangay P9`,
        city: "Sample City",
        province: "Metro Manila",
        country: "Philippines",
        zipCode: "1100",
        emergencyContactName: `Emergency Contact ${i}`,
        emergencyContactNo: `0922000000${i}`,
        basicRate: "250.00",
        licenseType: "Professional",
        licenseNo: `LICP9${i}`,
        restrictionCodes: ["A", "B"],
        expireDate: new Date("2028-06-01"),
        employeeStatus: "active",
        employeeType: "regular",
        employeeClassification: "full-time",
        terminationDate: null,
        terminationReason: null,
        positionId: 9,
      }
    });
  }

  // Seed employees for positionId: 8
  for (let i = 1; i <= 10; i++) {
    await prisma.employee.create({
      data: {
        employeeNumber: `EMP2024-P8-${i.toString().padStart(3, '0')}`,
        firstName: `ConductorFirst${i}`,
        middleName: `M${i}`,
        lastName: `ConductorLast${i}`,
        suffix: i % 2 === 0 ? "Jr." : null,
        birthdate: new Date("1992-02-02"),
        hiredate: new Date("2024-06-02"),
        phone: `0918000000${i}`,
        streetAddress: `Street ${i}`,
        barangay: `Barangay P8`,
        city: "Sample City",
        province: "Metro Manila",
        country: "Philippines",
        zipCode: "1101",
        emergencyContactName: `Emergency Contact ${i}`,
        emergencyContactNo: `0923000000${i}`,
        basicRate: "220.00",
        licenseType: "Non-Professional",
        licenseNo: `LICP8${i}`,
        restrictionCodes: ["B", "C"],
        expireDate: new Date("2029-07-01"),
        employeeStatus: "active",
        employeeType: "regular",
        employeeClassification: "full-time",
        terminationDate: null,
        terminationReason: null,
        positionId: 8,
      }
    });
  }

  console.log('Departments, positions, and employees seeded successfully.');
}

main()
  .catch((e) => console.error('Error seeding data:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
