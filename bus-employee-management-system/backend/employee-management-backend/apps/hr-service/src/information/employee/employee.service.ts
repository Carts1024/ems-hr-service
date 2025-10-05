/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path if needed

function generateRandomString(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  // Find by employeeNumber
  async findByEmployeeNumber(employeeNumber: string) {
    return this.prisma.employee.findUnique({
      where: { employeeNumber },
      include: {
        position: { include: { department: true } },
        benefits: {
          include: { benefitType: true },
        },
        deductions: {
          include: { deductionType: true },
        },
      },
    });
  }

  // Create an employee
  async create(data: any) {
    // 1. Helper function to convert to Date or undefined
    const toDateOrUndefined = (val: any) => val ? new Date(val) : undefined;

    // 2. Process dates in root
    const processedData: any = { ...data };
    processedData.birthdate = toDateOrUndefined(processedData.birthdate);
    processedData.hiredate = toDateOrUndefined(processedData.hiredate);
    processedData.expireDate = toDateOrUndefined(processedData.expireDate);
    processedData.terminationDate = toDateOrUndefined(processedData.terminationDate);

    // 3. Destructure out nested relations
    const {
      governmentIDs,
      workExperiences,
      educations,
      benefits,
      deductions,
      ...rest
    } = processedData;

    // 4. Convert dates in nested governmentIDs
    let governmentIDsInput;
    if (governmentIDs && Array.isArray(governmentIDs) && governmentIDs.length > 0) {
      governmentIDsInput = governmentIDs.map((g: any) => ({
        ...g,
        issuedDate: toDateOrUndefined(g.issuedDate),
        expiryDate: toDateOrUndefined(g.expiryDate),
      }));
    }

    // 5. Get the hire year for employee number
    if (!processedData.hiredate || isNaN(processedData.hiredate.getTime())) {
      throw new Error('Valid hiredate is required for employee number generation.');
    }
    const hireYear = processedData.hiredate.getFullYear();

    // 6. Generate employee number
    let employeeNumber: string;
    let exists = true;
    do {
      const rand = generateRandomString(6);
      employeeNumber = `EMP-${hireYear}-${rand}`;
      const found = await this.prisma.employee.findUnique({
        where: { employeeNumber },
      });
      exists = !!found;
    } while (exists);

    // 7. Build data object (no undefined for nested creates)
    const prismaData: any = {
      ...rest,
      employeeNumber,
    };

    if (workExperiences && Array.isArray(workExperiences) && workExperiences.length > 0)
      prismaData.workExperiences = { create: workExperiences };
    if (educations && Array.isArray(educations) && educations.length > 0)
      prismaData.educations = { create: educations };
    if (governmentIDsInput && governmentIDsInput.length > 0)
      prismaData.governmentIDs = { create: governmentIDsInput };
    if (benefits && Array.isArray(benefits) && benefits.length > 0)
      prismaData.benefits = { create: benefits };
    if (deductions && Array.isArray(deductions) && deductions.length > 0)
      prismaData.deductions = { create: deductions };

    // 8. Create the employee
    console.log('governmentIDs input to Prisma:', JSON.stringify(governmentIDsInput, null, 2));
    console.log('prismaData:', JSON.stringify(prismaData, null, 2));

    return this.prisma.employee.create({
      data: prismaData,
      include: {
        position: { include: { department: true } },
        workExperiences: true,
        educations: true,
        governmentIDs: { include: { type: true } },
        benefits: true,
        deductions: true,
      },
    });
  }

  // Get all employees
  async findAll(): Promise<any[]> {
    return this.prisma.employee.findMany({
      where: { NOT: { employeeStatus: 'deleted' } },
      include: {
        position: {
          select: {
            positionName: true,
            department: {
              select: {
                id: true,
                departmentName: true,
              },
            },
          },
        },
        benefits: {
          include: { benefitType: true },
        },
        deductions: {
          include: { deductionType: true },
        },
        workExperiences: true,
        governmentIDs: {
          include: { type: true }, // If using typeId and GovernmentIDType relation
        },
        educations: true,
      },
    });
  }

  // Get employee by ID
  async findById(id: string) {
    const emp = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        position: { include: { department: true } },
        benefits: {
          include: { benefitType: true },
        },
        deductions: {
          include: { deductionType: true },
        },
        workExperiences: true,
        governmentIDs: {
          include: { type: true }, // If using typeId and GovernmentIDType relation
        },
        educations: true,
      },
    });
    if (!emp) return null;
    return emp;
  }

  // Update employee
  async update(id: string, data: any) {
    return this.prisma.employee.update({
      where: { id },
      data,
      include: { position: { include: { department: true } } },
    });
  }

  // Delete employee
  async remove(id: string) {
    // 1. Soft delete employee
    const employee = await this.prisma.employee.update({
      where: { id },
      data: { employeeStatus: 'deleted' },
    });

    // 2. Soft delete (deactivate) benefits
    await this.prisma.benefit.updateMany({
      where: { employeeId: id },
      data: { isActive: false },
    });

    // 3. Soft delete (deactivate) deductions
    await this.prisma.deduction.updateMany({
      where: { employeeId: id },
      data: { isActive: false },
    });

    return employee;
  }

  // Find employees by position/role name(s)
  async findByRoles(roleNames: string[]): Promise<any[]> {
    if (!roleNames || roleNames.length === 0) return [];
    return this.prisma.employee.findMany({
      where: {
        position: {
          positionName: {
            in: roleNames,
            mode: 'insensitive',
          },
        },
        employeeStatus: 'active',
      },
      include: {
        position: {
          select: {
            positionName: true,
            department: { select: { departmentName: true } },
          },
        },
      },
    });
  }
}
