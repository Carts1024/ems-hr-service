/* eslint-disable prettier/prettier */
 
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Employee as PrismaEmployee } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EmployeeService {
  // Find by employeeNumber
  async findByEmployeeNumber(employeeNumber: string) {
    return prisma.employee.findUnique({
      where: { employeeNumber },
      include: {
        position: { include: { department: true } },
      },
    });
  }

  // Create an employee
  async create(data: any) {
    // Remove any address/barangay mapping; use fields as-is
    // You can validate/transform data here if needed

    // Check for existing employeeNumber
    const exists = await prisma.employee.findUnique({
      where: { employeeNumber: data.employeeNumber },
    });
    if (exists) {
      throw new Error('Employee with this employeeNumber already exists.');
    }
    return prisma.employee.create({
      data,
      include: { position: { include: { department: true } } },
    });
  }

  // Get all employees
  async findAll(): Promise<any[]> {
    return prisma.employee.findMany({
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
              }
            }
          }
        }
      }
    });
  }


  // Get employee by ID
  async findById(id: string) {
    const emp = await prisma.employee.findUnique({
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
    // No address-barangay mapping needed; just update the data as-is
    return prisma.employee.update({
      where: { id },
      data,
      include: { position: { include: { department: true } } },
    });
  }

  // Delete employee
  async remove(id: string) {
    // This will throw if the ID doesn't exist, which is fine
    return prisma.employee.delete({
      where: { id },
    });
  }

  // Find employees by position/role name(s)
  async findByRoles(roleNames: string[]): Promise<any[]> {
    if (!roleNames || roleNames.length === 0) return [];
    return prisma.employee.findMany({
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
            department: { select: { departmentName: true } }
          }
        }
      }
    });
  }


}
