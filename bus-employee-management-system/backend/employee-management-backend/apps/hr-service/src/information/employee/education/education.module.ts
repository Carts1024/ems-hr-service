import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [EducationController],
  providers: [EducationService, PrismaService],
  exports: [EducationService],
})
export class EducationModule {}
