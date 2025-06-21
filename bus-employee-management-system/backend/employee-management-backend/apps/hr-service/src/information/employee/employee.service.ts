/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Employee as PrismaEmployee } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EmployeeService {
  // Find by employeeNumber
  async findByEmployeeNumber(employeeNumber: string) {
    return prisma.employee.findUnique({
      where: { employeeNumber },
    });
  }

  // Create an employee (map address to barangay)
  async create(data: any) {
    // Map address to barangay for backend
    if (data.address) {
      data.barangay = data.address;
      delete data.address;
    }

    // Check for existing employeeNumber
    const exists = await prisma.employee.findUnique({
      where: { employeeNumber: data.employeeNumber },
    });
    if (exists) {
      throw new Error('Employee with this employeeNumber already exists.');
    }
    return prisma.employee.create({ data });
  }

  // Get all employees (map barangay to address for frontend, optional)
  async findAll(): Promise<PrismaEmployee[]> {
    const employees = await prisma.employee.findMany({
      include: {
        position: { include: { department: true } },
      },
    });
    // Map barangay back to address (optional, can be handled in controller)
    return employees.map(emp => ({
      ...emp,
      address: emp.barangay,
    }));
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
    return { ...emp, address: emp.barangay }; // Map for frontend
  }

  // Update employee (map address to barangay)
  async update(id: string, data: any) {
    if (data.address) {
      data.barangay = data.address;
      delete data.address;
    }
    return prisma.employee.update({
      where: { id },
      data,
    });
  }

  // Delete employee
  async remove(id: string) {
    return prisma.employee.delete({
      where: { id },
    });
  }
}
