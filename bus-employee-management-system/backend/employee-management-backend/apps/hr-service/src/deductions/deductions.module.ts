import { Module } from '@nestjs/common';
import { DeductionsController } from './deductions.controller';
import { DeductionsService } from './deductions.service';
import { DeductionsTypeController } from './deductions-type.controller';
import { DeductionsTypeService } from './deductions-type.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DeductionsController, DeductionsTypeController],
  providers: [DeductionsService, PrismaService, DeductionsTypeService],
  exports: [DeductionsService],
})
export class DeductionsModule {}
