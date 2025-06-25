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
}
