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
import { DeductionsTypeService } from './deductions-type.service';
import { CreateDeductionTypeDto } from './dto/create-deduction-type.dto';
import { UpdateDeductionTypeDto } from './dto/update-deduction-type.dto';

@Controller('deduction')
export class DeductionsTypeController {
  constructor(private readonly deductionsTypeService: DeductionsTypeService) {}


    @Get('types')
    async getAllDeductionTypes() {
    return this.deductionsTypeService.getAllDeductionTypes();
    }

    @Get('types/:id')
    async getDeductionTypeById(@Param('id', ParseIntPipe) id: number) {
    console.log('HIT getDeductionTypeById with id:', id);
    return this.deductionsTypeService.getDeductionTypeById(id);
    }

  // POST /deductions/types
    @Post('types')
    async createDeductionType(@Body() createDeductionTypeDto: CreateDeductionTypeDto) {
      return this.deductionsTypeService.createDeductionType(createDeductionTypeDto);
    }

  // PATCH /deductions/types/:id
    @Patch('types/:id')
    async updateDeductionType(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDeductionTypeDto: UpdateDeductionTypeDto
    ) {
      return this.deductionsTypeService.updateDeductionType(id, updateDeductionTypeDto);
    }

    // DELETE /deductions/types/:id
    @Delete('types/:id')
    async deleteDeductionType(@Param('id', ParseIntPipe) id: number) {
      return this.deductionsTypeService.deleteDeductionType(id);
    }
}