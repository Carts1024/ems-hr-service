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
import { BenefitsService } from './benefits.service';
import { Decimal } from '@prisma/client/runtime/library';

@Controller()
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  // ======== Employee-centric Benefit Endpoints ========

  // GET /employees/:employeeId/benefits
  @Get('employees/:employeeId/benefits')
  async getBenefitsByEmployee(@Param('employeeId') employeeId: string) {
    return this.benefitsService.getBenefitsByEmployee(employeeId);
  }

  // POST /employees/:employeeId/benefits
  @Post('employees/:employeeId/benefits')
  async createBenefitForEmployee(
    @Param('employeeId') employeeId: string,
    @Body() body: {
      benefitTypeId: number;
      value: number;
      frequency: string;
      effectiveDate: string;
      endDate?: string;
      isActive?: boolean;
    }
  ) {
    return this.benefitsService.createBenefit({ ...body, employeeId });
  }

  // GET /employees/:employeeId/benefits/:id
  @Get('employees/:employeeId/benefits/:id')
  async getBenefitOfEmployee(
    @Param('employeeId') employeeId: string,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.benefitsService.findOne(employeeId, id);
  }

  // PATCH /employees/:employeeId/benefits/:id
  @Patch('employees/:employeeId/benefits/:id')
  async updateBenefitOfEmployee(
    @Param('employeeId') employeeId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{
      benefitTypeId: number;
      value: number;
      frequency: string;
      effectiveDate: string;
      endDate?: string;
      isActive?: boolean;
    }>
  ) {
    // Type-cast value and dates if needed
    const updateData: any = { ...body };
    if (body.value !== undefined && typeof body.value === 'number') {
      updateData.value = new Decimal(body.value);
    }
    if (body.effectiveDate) updateData.effectiveDate = new Date(body.effectiveDate);
    if (body.endDate) updateData.endDate = new Date(body.endDate);
    return this.benefitsService.update(employeeId, id, updateData);
  }

  // DELETE /employees/:employeeId/benefits/:id
  @Delete('employees/:employeeId/benefits/:id')
  async deleteBenefitOfEmployee(
    @Param('employeeId') employeeId: string,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.benefitsService.remove(employeeId, id);
  }

  // ======== You can keep the existing endpoints for /benefits and /benefits/:id if you want to support global (admin) listing ========
  @Get('benefits')
  async getAllBenefits() {
    return this.benefitsService.getAllBenefits();
  }

  @Get('benefits/:id')
  async getBenefitById(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsService.getBenefitById(id);
  }

  @Post('benefits')
  async createBenefit(@Body() body: {
    employeeId: string;
    benefitTypeId: number;
    value: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }) {
    return this.benefitsService.createBenefit(body);
  }

  @Patch('benefits/:id')
  async updateBenefit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{
      employeeId: string;
      benefitTypeId: number;
      value: number;
      frequency: string;
      effectiveDate: string;
      endDate?: string;
      isActive?: boolean;
    }>
  ) {
    const updateData: any = { ...body };
    if (body.value !== undefined && typeof body.value === 'number') {
      updateData.value = new Decimal(body.value);
    }
    if (body.effectiveDate) updateData.effectiveDate = new Date(body.effectiveDate);
    if (body.endDate) updateData.endDate = new Date(body.endDate);
    return this.benefitsService.updateBenefit(id, updateData);
  }

  @Delete('benefits/:id')
  async deleteBenefit(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsService.deleteBenefit(id);
  }
}
