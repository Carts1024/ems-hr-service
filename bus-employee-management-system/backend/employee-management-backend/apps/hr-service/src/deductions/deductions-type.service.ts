import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeductionTypeDto } from './dto/create-deduction-type.dto';
import { UpdateDeductionTypeDto } from './dto/update-deduction-type.dto';

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
  async createDeductionType(createDeductionTypeDto: CreateDeductionTypeDto) {
    // Filter out any unwanted fields (like id) that might come from frontend
    const cleanData = {
      name: createDeductionTypeDto.name,
      description: createDeductionTypeDto.description,
    };
    return this.prisma.deductionType.create({ data: cleanData });
  }

  // Update a deduction type
  async updateDeductionType(
    id: number,
    updateDeductionTypeDto: UpdateDeductionTypeDto,
  ) {
    // Filter out any unwanted fields (like id) that might come from frontend
    const cleanData: { name?: string; description?: string } = {};
    if (updateDeductionTypeDto.name !== undefined) {
      cleanData.name = updateDeductionTypeDto.name;
    }
    if (updateDeductionTypeDto.description !== undefined) {
      cleanData.description = updateDeductionTypeDto.description;
    }

    const type = await this.prisma.deductionType.update({
      where: { id },
      data: cleanData,
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
