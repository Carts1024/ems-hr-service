import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { FinanceController } from './finance/finance.controller';
import { FinanceService } from './finance/finance.service';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path as needed
import { WorkExperienceModule } from './workExperience/work-experience.module';
import { GovernmentIdModule } from './government-id/government-id.module';
import { EducationModule } from './education/education.module';

@Module({
  imports: [WorkExperienceModule, GovernmentIdModule, EducationModule],
  controllers: [EmployeeController, FinanceController],
  providers: [EmployeeService, FinanceService, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
