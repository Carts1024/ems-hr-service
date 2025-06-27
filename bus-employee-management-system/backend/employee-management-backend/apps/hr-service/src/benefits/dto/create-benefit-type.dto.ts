import { IsString, IsOptional } from 'class-validator';

export class CreateBenefitTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
