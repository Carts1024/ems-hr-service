/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEducationDto) {
    const processedData: any = { ...dto };
    if (processedData.startDate) {
      processedData.startDate = new Date(processedData.startDate);
    }
    if (processedData.endDate) {
      processedData.endDate = new Date(processedData.endDate);
    }
    return this.prisma.education.create({ data: processedData });
  }

  async findAll(employeeId?: string) {
    if (employeeId) {
      return this.prisma.education.findMany({ where: { employeeId } });
    }
    return this.prisma.education.findMany();
  }

  async findOne(id: number) {
    const education = await this.prisma.education.findUnique({ where: { id } });
    if (!education) throw new NotFoundException('Education not found');
    return education;
  }

  async update(id: number, dto: UpdateEducationDto) {
    // Remove id from dto if it exists (frontend might send it)
    const { id: _id, ...data } = dto as UpdateEducationDto & { id?: number };
    
    // Convert date strings to Date objects for Prisma
    const processedData: Record<string, any> = { ...data };
    if (typeof processedData.startDate === 'string') {
      processedData.startDate = new Date(processedData.startDate);
    }
    if (typeof processedData.endDate === 'string') {
      processedData.endDate = new Date(processedData.endDate);
    }
    
    return this.prisma.education.update({
      where: { id },
      data: processedData,
    });
  }

  async remove(id: number) {
    return this.prisma.education.delete({ where: { id } });
  }
}
