import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DeductionsTypeService {
  constructor(private prisma: PrismaService) {}

  // List all deduction types
  async getAllDeductionTypes() {
    return this.prisma.deductionType.findMany();
  }

  // Get a single deduction type by id
  async getDeductionTypeById(id: number) {
    const type = await this.prisma.deductionType.findUnique({ where: { id } });
    if (!type) throw new NotFoundException('Deduction type not found');
    return type;
  }

  // Create a deduction type
  async createDeductionType(data: { name: string; description?: string }) {
    return this.prisma.deductionType.create({ data });
  }

  // Update a deduction type
  async updateDeductionType(
    id: number,
    data: { name?: string; description?: string },
  ) {
    const type = await this.prisma.deductionType.update({
      where: { id },
      data,
    });
    if (!type) throw new NotFoundException('Deduction type not found');
    return type;
  }

  // Delete a deduction type
  async deleteDeductionType(id: number) {
    await this.prisma.deductionType.delete({ where: { id } });
    return { message: 'Deduction type deleted successfully' };
  }
}
