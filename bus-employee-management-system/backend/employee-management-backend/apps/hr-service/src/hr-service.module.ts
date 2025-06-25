/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HrServiceController } from './hr-service.controller';
import { HrServiceService } from './hr-service.service';
import { DepartmentController } from './information/department/department.controller';
import { DepartmentService } from './information/department/department.service';
import { EmployeeController } from './information/employee/employee.controller';
import { EmployeeService } from './information/employee/employee.service';
import { PositionsController } from './information/position/position.controller';
import { PositionsService } from './information/position/positions.service';
import { BenefitsController } from './benefits/benefits.controller';
import { BenefitsService } from './benefits/benefits.service';
import { DeductionsController } from './deductions/deductions.controller';
import { DeductionsService } from './deductions/deductions.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: __dirname + '/../.env', // points to the .env in the parent folder
    }),
  ],
  controllers: [
    HrServiceController,
    DepartmentController,
    EmployeeController,
    PositionsController,
    BenefitsController,
    DeductionsController,
  ],
  providers: [
    HrServiceService,
    DepartmentService,
    EmployeeService,
    PositionsService,
    BenefitsService,
    DeductionsService,
  ],
})
export class HrServiceModule {}
