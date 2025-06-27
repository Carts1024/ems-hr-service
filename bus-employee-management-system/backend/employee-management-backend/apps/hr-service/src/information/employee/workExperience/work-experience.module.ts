import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { WorkExperienceController } from './work-experience.controller';
import { PrismaService } from '../../../prisma/prisma.service'; // Adjust path

@Module({
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService, PrismaService],
  exports: [WorkExperienceService],
})
export class WorkExperienceModule {}
