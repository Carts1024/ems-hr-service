import { Module } from '@nestjs/common';
import { PositionsController } from './position.controller';
import { PositionsService } from './positions.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust path if needed

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, PrismaService],
  exports: [PositionsService],
})
export class PositionModule {}
