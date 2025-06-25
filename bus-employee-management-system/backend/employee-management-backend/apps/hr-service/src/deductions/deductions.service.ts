/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Deduction, DeductionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

@Injectable()
export class DeductionsService {
  // List all deduction types
  async getAllDeductionTypes(): Promise<DeductionType[]> {
    return prisma.deductionType.findMany();
  }

  // Get a single deduction type by id
  async getDeductionTypeById(id: number): Promise<DeductionType> {
    const type = await prisma.deductionType.findUnique({ where: { id } });
    if (!type) throw new NotFoundException('Deduction type not found');
    return type;
  }

  // Create a deduction type
  async createDeductionType(data: { name: string; description?: string }): Promise<DeductionType> {
    return prisma.deductionType.create({ data });
  }

  // Update a deduction type
  async updateDeductionType(id: number, data: { name?: string; description?: string }): Promise<DeductionType> {
    const type = await prisma.deductionType.update({
      where: { id },
      data,
    });
    if (!type) throw new NotFoundException('Deduction type not found');
    return type;
  }

  // Delete a deduction type
  async deleteDeductionType(id: number): Promise<{ message: string }> {
    await prisma.deductionType.delete({ where: { id } });
    return { message: 'Deduction type deleted successfully' };
  }

  // ==== Deductions ====
  async getAllDeductions(): Promise<Deduction[]> {
    return prisma.deduction.findMany({
      include: { deductionType: true, employee: true },
    });
  }

  async getDeductionById(id: number): Promise<Deduction> {
    const deduction = await prisma.deduction.findUnique({
      where: { id },
      include: { deductionType: true, employee: true },
    });
    if (!deduction) throw new NotFoundException('Deduction not found');
    return deduction;
  }

  async createDeduction(data: {
    employeeId: string;
    deductionTypeId: number;
    amount: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }): Promise<Deduction> {
    return prisma.deduction.create({
      data: {
        employeeId: data.employeeId,
        deductionTypeId: data.deductionTypeId,
        amount: new Decimal(data.amount),
        frequency: data.frequency,
        effectiveDate: new Date(data.effectiveDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isActive: data.isActive ?? true,
      },
      include: { deductionType: true, employee: true },
    });
  }

  async updateDeduction(id: number, data: Partial<Omit<Deduction, 'id'>>): Promise<Deduction> {
    const updated = await prisma.deduction.update({
      where: { id },
      data,
      include: { deductionType: true, employee: true },
    });
    if (!updated) throw new NotFoundException('Deduction not found');
    return updated;
  }

  async deleteDeduction(id: number): Promise<{ message: string }> {
    await prisma.deduction.delete({ where: { id } });
    return { message: 'Deduction deleted successfully' };
  }
}
