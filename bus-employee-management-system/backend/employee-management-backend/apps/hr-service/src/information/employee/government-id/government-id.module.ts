import { Module } from '@nestjs/common';
import { GovernmentIdController } from './government-id.controller';
import { GovernmentIdService } from './government-id.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { GovernmentIdTypeModule } from './government-id-type/government-id-type.module';

@Module({
  imports: [GovernmentIdTypeModule],
  controllers: [GovernmentIdController],
  providers: [GovernmentIdService, PrismaService],
  exports: [GovernmentIdService],
})
export class GovernmentIdModule {}
