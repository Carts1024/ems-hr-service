import { Module } from '@nestjs/common';
import { DepartmentController } from '../department/department.controller';
import { DepartmentService } from '../department/department.service';

@Module({
  imports: [EmployeeModule],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class Department_Module {}
