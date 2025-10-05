/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DeductionsService {
  constructor(private prisma: PrismaService) {}

  // ===== Global Deduction CRUD (Admin/All) =====

  async getAllDeductions() {
    return this.prisma.deduction.findMany({
      include: { deductionType: true, employee: true },
    });
  }

  async getDeductionById(id: number) {
    const deduction = await this.prisma.deduction.findUnique({
      where: { id },
      include: { deductionType: true, employee: true },
    });
    if (!deduction) throw new NotFoundException('Deduction not found');
    return deduction;
  }

  async createDeduction(data: {
    employeeId: string;
    deductionTypeId: number;
    type: string;
    value: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }) {
    return this.prisma.deduction.create({
      data: {
        employeeId: data.employeeId,
        deductionTypeId: data.deductionTypeId,
        type: data.type,
        value: new Decimal(data.value),
        frequency: data.frequency,
        effectiveDate: new Date(data.effectiveDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isActive: data.isActive ?? true,
      },
      include: { deductionType: true, employee: true },
    });
  }

  async updateDeduction(id: number, data: any) {
    if (data.value !== undefined) data.value = new Decimal(data.value); // FIXED
    if (data.effectiveDate && typeof data.effectiveDate === 'string') {
      data.effectiveDate = new Date(data.effectiveDate);
    }
    if (data.endDate && typeof data.endDate === 'string') {
      data.endDate = new Date(data.endDate);
    }
    const updated = await this.prisma.deduction.update({
      where: { id },
      data,
      include: { deductionType: true, employee: true },
    });
    if (!updated) throw new NotFoundException('Deduction not found');
    return updated;
  }

  async deleteDeduction(id: number) {
    await this.prisma.deduction.delete({ where: { id } });
    return { message: 'Deduction deleted successfully' };
  }

  // ===== Employee-centric Methods =====

  async getDeductionsByEmployee(employeeId: string) {
    return this.prisma.deduction.findMany({
      where: { employeeId },
      include: { deductionType: true, employee: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(employeeId: string, id: number) {
    const deduction = await this.prisma.deduction.findFirst({
      where: { id, employeeId },
      include: { deductionType: true, employee: true },
    });
    if (!deduction) throw new NotFoundException('Deduction not found');
    return deduction;
  }

  async update(employeeId: string, id: number, data: any) {
    const deduction = await this.prisma.deduction.findFirst({
      where: { id, employeeId },
    });
    if (!deduction) throw new NotFoundException('Deduction not found');

    // Handle decimal value if needed
    if (data.value !== undefined) data.value = new Decimal(data.value);

    // Parse dates
    if (data.effectiveDate && typeof data.effectiveDate === 'string') {
      data.effectiveDate = new Date(data.effectiveDate);
    }
    if (data.endDate && typeof data.endDate === 'string') {
      data.endDate = new Date(data.endDate);
    }

    // Handle deductionType relation
    if (data.deductionTypeId) {
      data.deductionType = { connect: { id: data.deductionTypeId } };
      delete data.deductionTypeId;
    }

    return this.prisma.deduction.update({
      where: { id },
      data,
      include: { deductionType: true, employee: true },
    });
  }

  async remove(employeeId: string, id: number) {
    const deduction = await this.prisma.deduction.findFirst({
      where: { id, employeeId },
    });
    if (!deduction) throw new NotFoundException('Deduction not found');
    await this.prisma.deduction.delete({ where: { id } });
    return { message: 'Deduction deleted successfully' };
  }
}
