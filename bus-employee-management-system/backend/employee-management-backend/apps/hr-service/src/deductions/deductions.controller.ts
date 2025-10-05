/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DeductionsService } from './deductions.service';

@Controller()
export class DeductionsController {
  constructor(private readonly deductionsService: DeductionsService) {}


  // ========== Employee-centric endpoints ==========

  // GET /employees/:employeeId/deductions
  @Get('employees/:employeeId/deductions')
  async getDeductionsByEmployee(@Param('employeeId') employeeId: string) {
    return this.deductionsService.getDeductionsByEmployee(employeeId);
  }

  // POST /employees/:employeeId/deductions
  @Post('employees/:employeeId/deductions')
  async createDeductionForEmployee(
    @Param('employeeId') employeeId: string,
    @Body() body: {
      deductionTypeId: number;
      type: string;
      value: number;
      frequency: string;
      effectiveDate: string;
      endDate?: string;
      isActive?: boolean;
    },
  ) {
    return this.deductionsService.createDeduction({ ...body, employeeId });
  }

  // GET /employees/:employeeId/deductions/:id
  @Get('employees/:employeeId/deductions/:id')
  async getDeductionOfEmployee(
    @Param('employeeId') employeeId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deductionsService.findOne(employeeId, id);
  }

  // PATCH /employees/:employeeId/deductions/:id
  @Patch('employees/:employeeId/deductions/:id')
  async updateDeductionOfEmployee(
    @Param('employeeId') employeeId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.deductionsService.update(employeeId, id, body);
  }

  // DELETE /employees/:employeeId/deductions/:id
  @Delete('employees/:employeeId/deductions/:id')
  async deleteDeductionOfEmployee(
    @Param('employeeId') employeeId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deductionsService.remove(employeeId, id);
  }

  // ========== Global endpoints (admin/all) ==========

  @Get('deductions')
  async getAllDeductions() {
    return this.deductionsService.getAllDeductions();
  }

  @Get('deductions/:id')
  async getDeductionById(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsService.getDeductionById(id);
  }

  @Post('deductions')
  async createDeduction(@Body() body: {
    employeeId: string;
    deductionTypeId: number;
    type: string;
    value: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }) {
    return this.deductionsService.createDeduction(body);
  }

  @Patch('deductions/:id')
  async updateDeduction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.deductionsService.updateDeduction(id, body);
  }

  @Delete('deductions/:id')
  async deleteDeduction(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsService.deleteDeduction(id);
  }
}