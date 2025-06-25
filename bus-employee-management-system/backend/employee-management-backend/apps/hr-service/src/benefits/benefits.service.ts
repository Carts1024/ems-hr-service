/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Benefit, BenefitType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

@Injectable()
export class BenefitsService {
  // List all benefit types
  async getAllBenefitTypes(): Promise<BenefitType[]> {
    return prisma.benefitType.findMany();
  }

  // Get a single benefit type by id
  async getBenefitTypeById(id: number): Promise<BenefitType> {
    const type = await prisma.benefitType.findUnique({ where: { id } });
    if (!type) throw new NotFoundException('Benefit type not found');
    return type;
  }

  // Create a benefit type
  async createBenefitType(data: { name: string; description?: string }): Promise<BenefitType> {
    return prisma.benefitType.create({ data });
  }

  // Update a benefit type
  async updateBenefitType(id: number, data: { name?: string; description?: string }): Promise<BenefitType> {
    const type = await prisma.benefitType.update({
      where: { id },
      data,
    });
    if (!type) throw new NotFoundException('Benefit type not found');
    return type;
  }

  // Delete a benefit type
  async deleteBenefitType(id: number): Promise<{ message: string }> {
    await prisma.benefitType.delete({ where: { id } });
    return { message: 'Benefit type deleted successfully' };
  }

  // ===== BENEFITS CRUD =====

  // Get all benefits (optionally, you can filter by employeeId later)
  async getAllBenefits(): Promise<Benefit[]> {
    return prisma.benefit.findMany({
      include: { benefitType: true, employee: true },
    });
  }

  // Get one benefit by ID
  async getBenefitById(id: number): Promise<Benefit> {
    const benefit = await prisma.benefit.findUnique({
      where: { id },
      include: { benefitType: true, employee: true },
    });
    if (!benefit) throw new NotFoundException('Benefit not found');
    return benefit;
  }

  // Create a benefit
  async createBenefit(data: {
    employeeId: string;
    benefitTypeId: number;
    type: string;
    value: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }): Promise<Benefit> {
    return prisma.benefit.create({
      data: {
        employeeId: data.employeeId,
        benefitTypeId: data.benefitTypeId,
        type: data.type,
        value: new Decimal(data.value), 
        frequency: data.frequency,
        effectiveDate: new Date(data.effectiveDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isActive: data.isActive ?? true,
      },
      include: { benefitType: true, employee: true },
    });
  }

  // Update a benefit
  async updateBenefit(id: number, data: Partial<Omit<Benefit, 'id'>>): Promise<Benefit> {
    // No need to convert value to Decimal here if controller already does it
    if (data.effectiveDate && typeof data.effectiveDate === 'string') {
      (data as any).effectiveDate = new Date(data.effectiveDate);
    }
    if (data.endDate && typeof data.endDate === 'string') {
      (data as any).endDate = new Date(data.endDate);
    }
    const updated = await prisma.benefit.update({
      where: { id },
      data,
      include: { benefitType: true, employee: true },
    });
    if (!updated) throw new NotFoundException('Benefit not found');
    return updated;
  }


  // Delete a benefit
  async deleteBenefit(id: number): Promise<{ message: string }> {
    await prisma.benefit.delete({ where: { id } });
    return { message: 'Benefit deleted successfully' };
  }

}
