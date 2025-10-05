import { Module } from '@nestjs/common';
import { HrServiceController } from './hr-service.controller';
import { HrServiceService } from './hr-service.service';
import { DepartmentController } from './information/department/department.controller';
import { DepartmentService } from './information/department/department.service';
import { EmployeeController } from './information/employee/employee.controller';
import { EmployeeService } from './information/employee/employee.service';
import { Department_Module } from './information/department/department.module';

@Module({
  imports: [Department_Module],
  controllers: [HrServiceController, DepartmentController, EmployeeController],
  providers: [HrServiceService, DepartmentService, EmployeeService],
})
export class HrServiceModule {}
