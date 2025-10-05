/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BenefitsService {
  constructor(private prisma: PrismaService) {}
  // ===== Global Benefits CRUD (Admin) =====

  async getAllBenefits() {
    return this.prisma.benefit.findMany({
      include: { benefitType: true, employee: true },
    });
  }

  async getBenefitById(id: number) {
    const benefit = await this.prisma.benefit.findUnique({
      where: { id },
      include: { benefitType: true, employee: true },
    });
    if (!benefit) throw new NotFoundException('Benefit not found');
    return benefit;
  }

  async createBenefit(data: {
    employeeId: string;
    benefitTypeId: number;
    value: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }) {
    return this.prisma.benefit.create({
      data: {
        employeeId: data.employeeId,
        benefitTypeId: data.benefitTypeId,
        value: new Decimal(data.value),
        frequency: data.frequency,
        effectiveDate: new Date(data.effectiveDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isActive: data.isActive ?? true,
      },
      include: { benefitType: true, employee: true },
    });
  }

  async updateBenefit(id: number, data: any) {
    if (data.effectiveDate && typeof data.effectiveDate === 'string') {
      data.effectiveDate = new Date(data.effectiveDate);
    }
    if (data.endDate && typeof data.endDate === 'string') {
      data.endDate = new Date(data.endDate);
    }
    const updated = await this.prisma.benefit.update({
      where: { id },
      data,
      include: { benefitType: true, employee: true },
    });
    if (!updated) throw new NotFoundException('Benefit not found');
    return updated;
  }

  async deleteBenefit(id: number) {
    await this.prisma.benefit.delete({ where: { id } });
    return { message: 'Benefit deleted successfully' };
  }

  // ===== Employee-centric Methods =====

  async getBenefitsByEmployee(employeeId: string) {
    return this.prisma.benefit.findMany({
      where: { employeeId },
      include: { benefitType: true, employee: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(employeeId: string, id: number) {
    const benefit = await this.prisma.benefit.findFirst({
      where: { id, employeeId },
      include: { benefitType: true, employee: true },
    });
    if (!benefit) throw new NotFoundException('Benefit not found');
    return benefit;
  }

  async update(employeeId: string, id: number, data: any) {
    // Optionally validate benefit exists and belongs to the employee
    const benefit = await this.prisma.benefit.findFirst({ where: { id, employeeId } });
    if (!benefit) throw new NotFoundException('Benefit not found');
    if (data.value !== undefined && typeof data.value === 'number') {
      data.value = new Decimal(data.value);
    }
    if (data.effectiveDate && typeof data.effectiveDate === 'string') {
      data.effectiveDate = new Date(data.effectiveDate);
    }
    if (data.endDate && typeof data.endDate === 'string') {
      data.endDate = new Date(data.endDate);
    }
    return this.prisma.benefit.update({
      where: { id },
      data,
      include: { benefitType: true, employee: true },
    });
  }

  async remove(employeeId: string, id: number) {
    // Optionally validate benefit exists and belongs to the employee
    const benefit = await this.prisma.benefit.findFirst({ where: { id, employeeId } });
    if (!benefit) throw new NotFoundException('Benefit not found');
    await this.prisma.benefit.delete({ where: { id } });
    return { message: 'Benefit deleted successfully' };
  }
}
