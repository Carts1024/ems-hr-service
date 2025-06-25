/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HrServiceController } from './hr-service.controller';
import { HrServiceService } from './hr-service.service';
import { BenefitsModule } from './benefits/benefits.module';
import { DeductionsModule } from './deductions/deductions.module';
import { DepartmentModule } from './information/department/department.module';
import { EmployeeModule } from './information/employee/employee.module';
import { PositionModule } from './information/position/posiitons.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    BenefitsModule,
    DeductionsModule,
    DepartmentModule,
    EmployeeModule,
    PositionModule,
    AttendanceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: __dirname + '/../.env', // points to the .env in the parent folder
    }),
  ],
  controllers: [
    HrServiceController,
  ],
  providers: [
    HrServiceService,
  ],
})
export class HrServiceModule {}
