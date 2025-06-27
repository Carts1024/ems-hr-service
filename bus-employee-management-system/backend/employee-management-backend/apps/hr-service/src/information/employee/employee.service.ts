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
    // 1. Process dates so any string format will be accepted
    const processedData: any = { ...data };

    if (processedData.birthdate) {
      processedData.birthdate = new Date(processedData.birthdate);
    }
    if (processedData.hiredate) {
      processedData.hiredate = new Date(processedData.hiredate);
    }
    if (processedData.expireDate) {
      processedData.expireDate = new Date(processedData.expireDate);
    }
    if (processedData.terminationDate) {
      processedData.terminationDate = new Date(processedData.terminationDate);
    }

    // 2. Get the hire year from hiredate
    if (!processedData.hiredate || isNaN(processedData.hiredate.getTime())) {
      throw new Error('Valid hiredate is required for employee number generation.');
    }
    const hireYear = processedData.hiredate.getFullYear();

    // 3. Generate employeeNumber in format: EMP-<YEAR>-<RandomString>
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

    // 4. Create the employee (with nested creates if provided)
    return this.prisma.employee.create({
      data: {
        ...processedData,
        employeeNumber,
        workExperiences: processedData.workExperiences,
        educations: processedData.educations,
        governmentIDs: processedData.governmentIDs,
        benefits: processedData.benefits,
        deductions: processedData.deductions,
      },
      include: {
        position: {
          include: { department: true },
        },
        workExperiences: true,
        educations: true,
        governmentIDs: true,
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
