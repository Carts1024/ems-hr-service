/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  // GET /benefits/types
  @Get('types')
  async getAllBenefitTypes() {
    return this.benefitsService.getAllBenefitTypes();
  }

  // GET /benefits/types/:id
  @Get('types/:id')
  async getBenefitTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsService.getBenefitTypeById(id);
  }

  // POST /benefits/types
  @Post('types')
  async createBenefitType(@Body() body: { name: string; description?: string }) {
    return this.benefitsService.createBenefitType(body);
  }

  // PATCH /benefits/types/:id
  @Patch('types/:id')
  async updateBenefitType(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; description?: string }
  ) {
    return this.benefitsService.updateBenefitType(id, body);
  }

  // DELETE /benefits/types/:id
  @Delete('types/:id')
  async deleteBenefitType(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsService.deleteBenefitType(id);
  }

  // ===== BENEFITS CRUD =====

  // GET /benefits
  @Get()
  async getAllBenefits() {
    return this.benefitsService.getAllBenefits();
  }

  // GET /benefits/:id
  @Get(':id')
  async getBenefitById(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsService.getBenefitById(id);
  }

  // POST /benefits
  @Post()
  async createBenefit(@Body() body: {
    employeeId: string;
    benefitTypeId: number;
    type: string;
    value: number;
    frequency: string;
    effectiveDate: string;
    endDate?: string;
    isActive?: boolean;
  }) {
    return this.benefitsService.createBenefit(body);
  }

  // PATCH /benefits/:id
  @Patch(':id')
  async updateBenefit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{
      employeeId: string;
      benefitTypeId: number;
      type: string;
      value: number;
      frequency: string;
      effectiveDate: string;
      endDate?: string;
      isActive?: boolean;
    }>
  ) {
    // Build a new object with correct types for the service
    const updateData: any = { ...body };
    if (body.value !== undefined && typeof body.value === 'number') {
      updateData.value = new Decimal(body.value);
    }
    if (body.effectiveDate) {
      updateData.effectiveDate = new Date(body.effectiveDate);
    }
    if (body.endDate) {
      updateData.endDate = new Date(body.endDate);
    }
    return this.benefitsService.updateBenefit(id, updateData);
  }

  // DELETE /benefits/:id
  @Delete(':id')
  async deleteBenefit(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsService.deleteBenefit(id);
  }

}
