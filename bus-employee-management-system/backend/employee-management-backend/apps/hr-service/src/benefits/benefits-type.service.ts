/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBenefitTypeDto } from './dto/create-benefit-type.dto';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';

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
  async createBenefitType(createBenefitTypeDto: CreateBenefitTypeDto) {
    // Filter out any unwanted fields (like id) that might come from frontend
    const cleanData = {
      name: createBenefitTypeDto.name,
      description: createBenefitTypeDto.description,
    };
    return this.prisma.benefitType.create({ data: cleanData });
  }

  // Update a benefit type
  async updateBenefitType(id: number, updateBenefitTypeDto: UpdateBenefitTypeDto) {
    // Filter out any unwanted fields (like id) that might come from frontend
    const cleanData: { name?: string; description?: string } = {};
    if (updateBenefitTypeDto.name !== undefined) cleanData.name = updateBenefitTypeDto.name;
    if (updateBenefitTypeDto.description !== undefined) cleanData.description = updateBenefitTypeDto.description;
    
    const type = await this.prisma.benefitType.update({
      where: { id },
      data: cleanData,
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