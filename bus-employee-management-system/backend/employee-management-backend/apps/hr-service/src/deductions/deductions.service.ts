/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, DeductionType } from '@prisma/client';

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
}
