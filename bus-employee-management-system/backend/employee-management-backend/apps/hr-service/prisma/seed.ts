/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // --- 1. SEED BENEFIT TYPES ---
  const benefitTypesData = [
    { id: 1, name: "Service Incentive Leave", description: "Service Incentive Leave" },
    { id: 2, name: "Holiday Pay", description: "Holiday Pay" },
    { id: 3, name: "13th Month Pay", description: "13th Month Pay" },
    { id: 4, name: "Revenue Benefit", description: "Revenue Benefit" },
    { id: 5, name: "Safety Benefit", description: "Safety Benefit" },
    { id: 6, name: "Additional Benefit", description: "Additional Benefit" },
  ];

  for (const benefitType of benefitTypesData) {
    await prisma.benefitType.upsert({
      where: { id: benefitType.id },
      update: { name: benefitType.name, description: benefitType.description },
      create: benefitType,
    });
  }

  // --- 2. SEED DEDUCTION TYPES ---
  const deductionTypesData = [
    { id: 1, name: "Philhealth", description: "Philhealth Deduction" },
    { id: 2, name: "SSS", description: "Social Security System Deduction" },
    { id: 3, name: "Pag-ibig", description: "Pag-ibig Deduction" },
    { id: 4, name: "Cash Advance", description: "Cash Advance Deduction" },
    { id: 5, name: "Short", description: "Short Deduction" },
  ];

  for (const deductionType of deductionTypesData) {
    await prisma.deductionType.upsert({
      where: { id: deductionType.id },
      update: { name: deductionType.name, description: deductionType.description },
      create: deductionType,
    });
  }

  // --- 3. SEED DEPARTMENTS AND POSITIONS ---
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

  // --- 4. SEED GOVERNMENT ID TYPES ---
  const governmentIdTypesData = [
    { id: 1, name: "SSS", description: "Social Security System" },
    { id: 2, name: "PAG-IBIG", description: "Home Development Mutual Fund" },
    { id: 3, name: "PHILHEALTH", description: "Philippine Health Insurance Corporation" },
    { id: 4, name: "TIN", description: "Tax Identification Number" },
    { id: 5, name: "UMID", description: "Unified Multi-purpose ID" },
  ];

  for (const idType of governmentIdTypesData) {
    await prisma.governmentIDType.upsert({
      where: { id: idType.id },
      update: { name: idType.name, description: idType.description },
      create: idType,
    });
  }

  // // Helper: For sample, seed each employee with ALL benefit and deduction types
  // async function seedBenefitsAndDeductions(employeeId: string) {
  //   // Seed all benefit types
  //   for (const benefitType of benefitTypesData) {
  //     await prisma.benefit.create({
  //       data: {
  //         employeeId,
  //         benefitTypeId: benefitType.id,
  //         value: new Prisma.Decimal(100 + benefitType.id * 10),
  //         frequency: 'monthly',
  //         effectiveDate: new Date("2024-07-01"),
  //         endDate: null,
  //         isActive: true,
  //       },
  //     });
  //   }
  //   // Seed all deduction types
  //   for (const deductionType of deductionTypesData) {
  //     await prisma.deduction.create({
  //       data: {
  //         employeeId,
  //         deductionTypeId: deductionType.id,
  //         type: 'fixed',
  //         value: new Prisma.Decimal(50 + deductionType.id * 5),
  //         frequency: 'monthly',
  //         effectiveDate: new Date("2024-07-01"),
  //         endDate: null,
  //         isActive: true,
  //       },
  //     });
  //   }
  // }

  // // --- 5. SEED EMPLOYEES + THEIR BENEFITS/DEDUCTIONS ---
  // // (see your previous code for this, currently commented out)

  console.log('BenefitTypes, DeductionTypes, Departments, Positions, GovernmentIdTypes seeded successfully.');
}

main()
  .catch((e) => console.error('Error seeding data:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
