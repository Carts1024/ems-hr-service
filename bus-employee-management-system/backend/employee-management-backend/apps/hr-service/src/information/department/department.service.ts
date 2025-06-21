/* eslint-disable prettier/prettier */
// hr-service/src/information/department/department.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DepartmentService {
  async getAllDepartmentsWithCount() {
    const departments = await prisma.department.findMany({
      include: {
        positions: {
          include: {
            employees: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Add employeeCount property
    return departments.map(dept => ({
      ...dept,
      employeeCount: dept.positions.reduce(
        (sum, pos) => sum + pos.employees.length,
        0
      ),
    }));
  }


  async createDepartment(departmentName: string) {
    return prisma.department.create({
      data: { departmentName },
    });
  }

  async updateDepartment(id: number, departmentName: string) {
    const updated = await prisma.department.update({
      where: { id },
      data: { departmentName },
    });
    if (!updated) throw new NotFoundException('Department not found');
    return updated;
  }

  async deleteDepartment(id: number) {
    // Find all positions under the department, including employees
    const positions = await prisma.position.findMany({
      where: { departmentId: id },
      include: { employees: true },
    });

    // Check if any position has employees
    const hasEmployees = positions.some(position => position.employees.length > 0);

    if (hasEmployees) {
      throw new Error('Cannot delete a department that has employees in its positions.');
    }

    // Optionally, you might also want to prevent deletion if positions exist at all,
    // or you could cascade delete positions (up to your business rule).

    return prisma.department.delete({ where: { id } });
  }

}
