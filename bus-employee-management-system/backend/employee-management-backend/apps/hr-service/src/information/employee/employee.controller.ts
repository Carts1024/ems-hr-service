/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Query
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(@Query('role') role: string) {
    // If the "role" query param is provided, filter by roles
    if (role) {
      // role is a comma-separated string, e.g., "driver,conductor"
      const roleList = role.split(',').map(r => r.trim());
      return this.employeeService.findByRoles(roleList);
    }
    // Otherwise, return all employees
    return this.employeeService.findAll();
  }

  @Get('by-number/:employeeNumber')
  async getByEmployeeNumber(@Param('employeeNumber') employeeNumber: string) {
    const employee = await this.employeeService.findByEmployeeNumber(employeeNumber);
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  @Get('ops')
  async findForOperations(@Query('role') role: string) {
    const roleList = role ? role.split(',').map(r => r.trim()) : [];
    const employees = await this.employeeService.findByRoles(roleList);

    // DO NOT throw if employees.length === 0
    return employees.map(emp => ({
      employeeNumber: emp.employeeNumber,
      firstName: emp.firstName,
      middleName: emp.middleName,
      lastName: emp.lastName,
      phone: emp.phone,
      position: emp.position?.positionName,
      barangay: emp.barangay,
      zipCode: emp.zipCode,
    }));
  }

  @Get('inv')
  async findForInventory() {
    const employees = await this.employeeService.findAll();

    // DO NOT throw if employees.length === 0
    return employees.map(emp => ({
      employeeNumber: emp.employeeNumber,
      firstName: emp.firstName,
      middleName: emp.middleName,
      lastName: emp.lastName,
      phone: emp.phone,
      position: emp.position?.positionName,
      departmentId: emp.position?.department?.id,
      department: emp.position?.department?.departmentName,
    }));
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    const employee = await this.employeeService.findById(id);
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    const updated = await this.employeeService.update(id, updateEmployeeDto);
    if (!updated) throw new NotFoundException('Employee not found');
    return updated;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.employeeService.remove(id);
    if (!deleted) throw new NotFoundException('Employee not found');
    return { message: 'Employee deleted successfully' };
  }





}
