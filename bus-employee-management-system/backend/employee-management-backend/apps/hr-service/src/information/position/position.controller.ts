import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto'; // Create this DTO if it doesn't exist

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async findAll() {
    return this.positionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.positionsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionsService.update(Number(id), updatePositionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.positionsService.remove(Number(id));
  }
}
