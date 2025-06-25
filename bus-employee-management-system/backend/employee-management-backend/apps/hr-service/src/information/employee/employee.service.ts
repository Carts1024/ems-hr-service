/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path if needed

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  // Find by employeeNumber
  async findByEmployeeNumber(employeeNumber: string) {
    return this.prisma.employee.findUnique({
      where: { employeeNumber },
      include: {
        position: { include: { department: true } },
      },
    });
  }

  // Create an employee
  async create(data: any) {
    // Check for existing employeeNumber
    const exists = await this.prisma.employee.findUnique({
      where: { employeeNumber: data.employeeNumber },
    });
    if (exists) {
      throw new Error('Employee with this employeeNumber already exists.');
    }
    return this.prisma.employee.create({
      data,
      include: { position: { include: { department: true } } },
    });
  }

  // Get all employees
  async findAll(): Promise<any[]> {
    return this.prisma.employee.findMany({
      where: {
        employeeStatus: 'active',
      },
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
      },
    });
  }

  // Get employee by ID
  async findById(id: string) {
    const emp = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        position: { include: { department: true } },
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
    return this.prisma.employee.delete({
      where: { id },
    });
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
