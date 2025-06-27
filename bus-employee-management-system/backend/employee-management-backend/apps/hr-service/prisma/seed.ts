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

  // // Helper: For sample, seed each employee with ALL benefit and deduction types
  // async function seedBenefitsAndDeductions(employeeId: string) {
  //   // Seed all benefit types
  //   for (const benefitType of benefitTypesData) {
  //     await prisma.benefit.create({
  //       data: {
  //         employeeId,
  //         benefitTypeId: benefitType.id,                          // or "percentage"
  //         value: new Prisma.Decimal(100 + benefitType.id * 10), // just sample different values
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
  //         value: new Prisma.Decimal(50 + deductionType.id * 5), // just sample different values
  //         frequency: 'monthly',
  //         effectiveDate: new Date("2024-07-01"),
  //         endDate: null,
  //         isActive: true,
  //       },
  //     });
  //   }
  // }

  // // --- 4. SEED EMPLOYEES + THEIR BENEFITS/DEDUCTIONS ---
  // // Seed employees for positionId: 9 (Driver)
  // for (let i = 1; i <= 10; i++) {
  //   const emp = await prisma.employee.create({
  //     data: {
  //       employeeNumber: `EMP2024-P9-${i.toString().padStart(3, '0')}`,
  //       firstName: `DriverFirst${i}`,
  //       middleName: `M${i}`,
  //       lastName: `DriverLast${i}`,
  //       suffix: i % 2 === 0 ? "Jr." : null,
  //       birthdate: new Date("1990-01-01"),
  //       hiredate: new Date("2024-06-01"),
  //       phone: `0917000000${i}`,
  //       streetAddress: `Street ${i}`,
  //       barangay: `Barangay P9`,
  //       city: "Sample City",
  //       province: "Metro Manila",
  //       country: "Philippines",
  //       zipCode: "1100",
  //       emergencyContactName: `Emergency Contact ${i}`,
  //       emergencyContactNo: `0922000000${i}`,
  //       basicRate: new Prisma.Decimal("250.00"),
  //       licenseType: "Professional",
  //       licenseNo: `LICP9${i}`,
  //       restrictionCodes: ["A", "B"],
  //       expireDate: new Date("2028-06-01"),
  //       employeeStatus: "active",
  //       employeeType: "regular",
  //       employeeClassification: "full-time",
  //       terminationDate: null,
  //       terminationReason: null,
  //       positionId: 9,
  //     }
  //   });
  //   await seedBenefitsAndDeductions(emp.id);
  // }

  // // Seed employees for positionId: 8 (Conductor)
  // for (let i = 1; i <= 10; i++) {
  //   const emp = await prisma.employee.create({
  //     data: {
  //       employeeNumber: `EMP2024-P8-${i.toString().padStart(3, '0')}`,
  //       firstName: `ConductorFirst${i}`,
  //       middleName: `M${i}`,
  //       lastName: `ConductorLast${i}`,
  //       suffix: i % 2 === 0 ? "Jr." : null,
  //       birthdate: new Date("1992-02-02"),
  //       hiredate: new Date("2024-06-02"),
  //       phone: `0918000000${i}`,
  //       streetAddress: `Street ${i}`,
  //       barangay: `Barangay P8`,
  //       city: "Sample City",
  //       province: "Metro Manila",
  //       country: "Philippines",
  //       zipCode: "1101",
  //       emergencyContactName: `Emergency Contact ${i}`,
  //       emergencyContactNo: `0923000000${i}`,
  //       basicRate: new Prisma.Decimal("220.00"),
  //       licenseType: "Non-Professional",
  //       licenseNo: `LICP8${i}`,
  //       restrictionCodes: ["B", "C"],
  //       expireDate: new Date("2029-07-01"),
  //       employeeStatus: "active",
  //       employeeType: "regular",
  //       employeeClassification: "full-time",
  //       terminationDate: null,
  //       terminationReason: null,
  //       positionId: 8,
  //     }
  //   });
  //   await seedBenefitsAndDeductions(emp.id);
  // }

  console.log('BenefitTypes, DeductionTypes, Departments, Positions, Employees, Benefits, and Deductions seeded successfully.');
}

main()
  .catch((e) => console.error('Error seeding data:', e))
  .finally(async () => {
    await prisma.$disconnect();
  });
