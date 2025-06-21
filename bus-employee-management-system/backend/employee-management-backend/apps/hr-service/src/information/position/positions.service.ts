import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PositionsService {
  async findAll() {
    return prisma.position.findMany();
  }

  async create(data: { positionName: string; departmentId: number }) {
    return prisma.position.create({
      data: {
        positionName: data.positionName,
        department: {
          connect: { id: data.departmentId },
        },
      },
    });
  }
}
