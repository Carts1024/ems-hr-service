import { Module } from '@nestjs/common';
import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';
import { BenefitsTypeController } from './benefits-type.controller';
import { BenefitsTypeService } from './benefits-type.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BenefitsController, BenefitsTypeController],
  providers: [BenefitsService, PrismaService, BenefitsTypeService],
  exports: [BenefitsService],
})
export class BenefitsModule {}
