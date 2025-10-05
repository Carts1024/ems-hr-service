import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
