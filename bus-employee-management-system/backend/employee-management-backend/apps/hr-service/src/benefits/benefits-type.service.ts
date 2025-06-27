/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BenefitsTypeService {
  constructor(private prisma: PrismaService) {}

  // List all benefit types
  async getAllBenefitTypes() {
    return this.prisma.benefitType.findMany();
  }

  // Get a single benefit type by id
  async getBenefitTypeById(id: number) {
    const type = await this.prisma.benefitType.findUnique({ where: { id } });
    if (!type) throw new NotFoundException('Benefit type not found');
    return type;
  }

  // Create a benefit type
  async createBenefitType(data: { name: string; description?: string }) {
    return this.prisma.benefitType.create({ data });
  }

  // Update a benefit type
  async updateBenefitType(id: number, data: { name?: string; description?: string }) {
    const type = await this.prisma.benefitType.update({
      where: { id },
      data,
    });
    if (!type) throw new NotFoundException('Benefit type not found');
    return type;
  }

  // Delete a benefit type
  async deleteBenefitType(id: number) {
    await this.prisma.benefitType.delete({ where: { id } });
    return { message: 'Benefit type deleted successfully' };
  }
}