import { Module } from '@nestjs/common';
import { GovernmentIdTypeController } from './government-id-type.controller';
import { GovernmentIdTypeService } from './government-id-type.service';
import { PrismaService } from '../../../../prisma/prisma.service';

@Module({
  controllers: [GovernmentIdTypeController],
  providers: [GovernmentIdTypeService, PrismaService],
  exports: [GovernmentIdTypeService],
})
export class GovernmentIdTypeModule {}
