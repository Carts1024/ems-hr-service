import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateGovernmentIdTypeDto } from './dto/create-government-id-type.dto';
import { UpdateGovernmentIdTypeDto } from './dto/update-government-id-type.dto';

@Injectable()
export class GovernmentIdTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGovernmentIdTypeDto) {
    return this.prisma.governmentIDType.create({ data: dto });
  }

  async findAll() {
    return this.prisma.governmentIDType.findMany();
  }

  async findOne(id: number) {
    const type = await this.prisma.governmentIDType.findUnique({
      where: { id },
    });
    if (!type) throw new NotFoundException('Government ID type not found');
    return type;
  }

  async update(id: number, dto: UpdateGovernmentIdTypeDto) {
    return this.prisma.governmentIDType.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.governmentIDType.delete({ where: { id } });
  }
}
