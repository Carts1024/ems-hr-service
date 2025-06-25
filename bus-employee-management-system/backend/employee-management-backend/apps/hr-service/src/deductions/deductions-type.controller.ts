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

@Controller('deduction')
export class DeductionsTypeController {
  constructor(private readonly deductionsTypeService: DeductionsTypeService) {}


    @Get('types')
    async getAllDeductionTypes() {
    console.log('HIT getAllDeductionTypes');
    return this.deductionsTypeService.getAllDeductionTypes();
    }

    @Get('types/:id')
    async getDeductionTypeById(@Param('id', ParseIntPipe) id: number) {
    console.log('HIT getDeductionTypeById with id:', id);
    return this.deductionsTypeService.getDeductionTypeById(id);
    }

  // POST /deductions/types
  @Post('types')
  async createDeductionType(@Body() body: { name: string; description?: string }) {
    return this.deductionsTypeService.createDeductionType(body);
  }

  // PATCH /deductions/types/:id
  @Patch('types/:id')
  async updateDeductionType(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; description?: string }
  ) {
    return this.deductionsTypeService.updateDeductionType(id, body);
  }

  // DELETE /deductions/types/:id
  @Delete('types/:id')
  async deleteDeductionType(@Param('id', ParseIntPipe) id: number) {
    return this.deductionsTypeService.deleteDeductionType(id);
  }
}