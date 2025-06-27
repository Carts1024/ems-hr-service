import { IsString, IsOptional } from 'class-validator';

export class CreateDeductionTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
