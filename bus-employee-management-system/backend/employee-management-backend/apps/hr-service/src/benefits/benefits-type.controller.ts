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
import { BenefitsTypeService } from './benefits-type.service';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('benefit')
export class BenefitsTypeController {
  constructor(private readonly benefitsTypeService: BenefitsTypeService) {}

  // GET /benefits/types
  @Get('types')
  async getAllBenefitTypes() {
    return this.benefitsTypeService.getAllBenefitTypes();
  }

  // GET /benefits/types/:id
  @Get('types/:id')
  async getBenefitTypeById(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsTypeService.getBenefitTypeById(id);
  }

  // POST /benefits/types
  @Post('types')
  async createBenefitType(@Body() body: { name: string; description?: string }) {
    return this.benefitsTypeService.createBenefitType(body);
  }

  // PATCH /benefits/types/:id
  @Patch('types/:id')
  async updateBenefitType(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; description?: string }
  ) {
    return this.benefitsTypeService.updateBenefitType(id, body);
  }

  // DELETE /benefits/types/:id
  @Delete('types/:id')
  async deleteBenefitType(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsTypeService.deleteBenefitType(id);
  }
}