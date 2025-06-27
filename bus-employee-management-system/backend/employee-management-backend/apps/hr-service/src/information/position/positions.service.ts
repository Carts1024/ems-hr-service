/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

const prisma = new PrismaClient();

@Injectable()
export class PositionsService {
  async findAll() {
    return prisma.position.findMany({
      include: {
        department: true,
      },
    });
  }

  async findOne(id: number) {
    return prisma.position.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });
  }

  async create(data: CreatePositionDto) {
    return prisma.position.create({
      data: {
        positionName: data.positionName,
        department: {
          connect: { id: data.departmentId },
        },
      },
    });
  }

  async update(id: number, data: UpdatePositionDto) {
    // Only update what is provided in UpdatePositionDto
    const updateData: any = {};
    if (data.positionName) updateData.positionName = data.positionName;
    if (data.departmentId)
      updateData.department = { connect: { id: data.departmentId } };

    return prisma.position.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return prisma.position.delete({
      where: { id },
    });
  }
}
