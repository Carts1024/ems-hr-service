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
import { CreateBenefitTypeDto } from './dto/create-benefit-type.dto';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';

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
  async createBenefitType(@Body() createBenefitTypeDto: CreateBenefitTypeDto) {
    return this.benefitsTypeService.createBenefitType(createBenefitTypeDto);
  }

  // PATCH /benefits/types/:id
  @Patch('types/:id')
  async updateBenefitType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBenefitTypeDto: UpdateBenefitTypeDto
  ) {
    return this.benefitsTypeService.updateBenefitType(id, updateBenefitTypeDto);
  }

  // DELETE /benefits/types/:id
  @Delete('types/:id')
  async deleteBenefitType(@Param('id', ParseIntPipe) id: number) {
    return this.benefitsTypeService.deleteBenefitType(id);
  }
}