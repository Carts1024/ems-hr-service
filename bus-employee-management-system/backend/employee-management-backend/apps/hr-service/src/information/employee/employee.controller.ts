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
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll() {
    // Optionally, map barangay -> address in service or here
    return this.employeeService.findAll();
  }

  @Get('by-number/:employeeNumber')
  async getByEmployeeNumber(@Param('employeeNumber') employeeNumber: string) {
    const employee = await this.employeeService.findByEmployeeNumber(employeeNumber);
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
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
