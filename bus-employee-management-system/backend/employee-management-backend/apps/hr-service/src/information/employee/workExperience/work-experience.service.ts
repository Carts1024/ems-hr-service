/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Adjust path as needed
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkExperienceDto) {
    const processedData: any = { ...dto };
    if (processedData.startDate) {
      processedData.startDate = new Date(processedData.startDate);
    }
    if (processedData.endDate) {
      processedData.endDate = new Date(processedData.endDate);
    }
    return this.prisma.workExperience.create({ data: processedData });
  }

  async findAll(employeeId?: string) {
    if (employeeId) {
      return this.prisma.workExperience.findMany({ where: { employeeId } });
    }
    return this.prisma.workExperience.findMany();
  }

  async findOne(id: number) {
    const workExp = await this.prisma.workExperience.findUnique({
      where: { id },
    });
    if (!workExp) throw new NotFoundException('Work experience not found');
    return workExp;
  }

  async update(id: number, dto: UpdateWorkExperienceDto) {
    // Remove id from dto if it exists (frontend might send it)
    const { id: _id, ...data } = dto as UpdateWorkExperienceDto & {
      id?: number;
    };

    // Convert date strings to Date objects for Prisma
    const processedData: any = { ...data };
    if (processedData.startDate) {
      processedData.startDate = new Date(processedData.startDate);
    }
    if (processedData.endDate) {
      processedData.endDate = new Date(processedData.endDate);
    }

    return this.prisma.workExperience.update({
      where: { id },
      data: processedData,
    });
  }

  async remove(id: number) {
    return this.prisma.workExperience.delete({ where: { id } });
  }
}
