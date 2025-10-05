import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path if needed

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async getAllDepartmentsWithCount() {
    const departments = await this.prisma.department.findMany({
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
    return departments.map((dept) => ({
      ...dept,
      employeeCount: dept.positions.reduce(
        (sum, pos) => sum + pos.employees.length,
        0,
      ),
    }));
  }

  async createDepartment(departmentName: string) {
    return this.prisma.department.create({
      data: { departmentName },
    });
  }

  async updateDepartment(id: number, departmentName: string) {
    const updated = await this.prisma.department.update({
      where: { id },
      data: { departmentName },
    });
    if (!updated) throw new NotFoundException('Department not found');
    return updated;
  }

  async deleteDepartment(id: number) {
    // Find all positions under the department, including employees
    const positions = await this.prisma.position.findMany({
      where: { departmentId: id },
      include: { employees: true },
    });

    // Check if any position has employees
    const hasEmployees = positions.some(
      (position) => position.employees.length > 0,
    );

    if (hasEmployees) {
      throw new Error(
        'Cannot delete a department that has employees in its positions.',
      );
    }

    // Optionally, you might also want to prevent deletion if positions exist at all,
    // or you could cascade delete positions (up to your business rule).

    return this.prisma.department.delete({ where: { id } });
  }
}
