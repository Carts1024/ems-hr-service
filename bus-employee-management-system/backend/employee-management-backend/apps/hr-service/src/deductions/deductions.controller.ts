/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

@Controller('deductions')
export class DeductionsController {
  constructor(private readonly deductionsService: DeductionsService) {}

  // GET /deductions/types
  @Get('types')
  async getAllDeductionTypes() {
    return this.deductionsService.getAllDeductionTypes();
  }

  // GET /deductions/types/:id
  @Get('types/:id')
  async getDeductionTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsService.getDeductionTypeById(id);
  }

  // POST /deductions/types
  @Post('types')
  async createDeductionType(@Body() body: { name: string; description?: string }) {
    return this.deductionsService.createDeductionType(body);
  }

  // PATCH /deductions/types/:id
  @Patch('types/:id')
  async updateDeductionType(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; description?: string }
  ) {
    return this.deductionsService.updateDeductionType(id, body);
  }

  // DELETE /deductions/types/:id
  @Delete('types/:id')
  async deleteDeductionType(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsService.deleteDeductionType(id);
  }

  // =========================
  // CRUD for deductions
  // =========================

  // GET /deductions
  @Get()
  async getAllDeductions() {
    return this.deductionsService.getAllDeductions();
  }

  // GET /deductions/:id
  @Get(':id')
  async getDeductionById(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsService.getDeductionById(id);
  }

  // POST /deductions
  @Post()
  async createDeduction(@Body() body: {
    employeeId: string;
    deductionTypeId: number;
    amount: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }) {
    return this.deductionsService.createDeduction(body);
  }

  // PATCH /deductions/:id
  @Patch(':id')
  async updateDeduction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{
      employeeId: string;
      deductionTypeId: number;
      amount: number;
      frequency: string;
      effectiveDate: string;
      endDate?: string;
      isActive?: boolean;
    }>
  ) {
    // Map fields for update (like with benefits)
    const updateData: any = {};

    if (body.employeeId !== undefined) updateData.employeeId = body.employeeId;
    if (body.deductionTypeId !== undefined) updateData.deductionTypeId = body.deductionTypeId;
    if (body.amount !== undefined) {
      const { Decimal } = require('@prisma/client/runtime/library');
      updateData.amount = new Decimal(body.amount);
    }
    if (body.frequency !== undefined) updateData.frequency = body.frequency;
    if (body.effectiveDate !== undefined) updateData.effectiveDate = new Date(body.effectiveDate);
    if (body.endDate !== undefined) updateData.endDate = new Date(body.endDate);
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    return this.deductionsService.updateDeduction(id, updateData);
  }

  // DELETE /deductions/:id
  @Delete(':id')
  async deleteDeduction(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsService.deleteDeduction(id);
  }
}
