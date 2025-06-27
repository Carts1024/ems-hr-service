/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { UpdateGovernmentIdDto } from './dto/update-government-id.dto';

@Injectable()
export class GovernmentIdService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGovernmentIdDto) {
    const processedData: any = { ...dto };
    if (processedData.issuedDate) {
      processedData.issuedDate = new Date(processedData.issuedDate);
    }
    if (processedData.expiryDate) {
      processedData.expiryDate = new Date(processedData.expiryDate);
    }
    // Prisma handles unique constraints, so duplicate types for same employee will throw an error
    return this.prisma.governmentID.create({ data: processedData });
  }

  async findAll(employeeId?: string) {
    if (employeeId) {
      return this.prisma.governmentID.findMany({
        where: { employeeId },
        include: { type: true },
      });
    }
    return this.prisma.governmentID.findMany();
  }

  async findOne(id: number) {
    const govId = await this.prisma.governmentID.findUnique({ where: { id } });
    if (!govId) throw new NotFoundException('Government ID not found');
    return govId;
  }

  async update(id: number, dto: UpdateGovernmentIdDto) {
    const processedData: any = { ...dto };
    if (processedData.issuedDate) {
      processedData.issuedDate = new Date(processedData.issuedDate);
    }
    if (processedData.expiryDate) {
      processedData.expiryDate = new Date(processedData.expiryDate);
    }
    return this.prisma.governmentID.update({
      where: { id },
      data: processedData,
    });
  }

  async remove(id: number) {
    return this.prisma.governmentID.delete({ where: { id } });
  }
}
