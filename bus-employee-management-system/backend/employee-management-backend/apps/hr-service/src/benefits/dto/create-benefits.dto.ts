import {
  IsEnum,
  IsNumber,
  IsDateString,
  IsInt,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateBenefitsDto {
  @IsEnum(['fixed', 'percentage'])
  type: 'fixed' | 'percentage';

  @IsNumber()
  value: number;

  @IsString()
  frequency: string;

  @IsDateString()
  effectiveDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsInt()
  benefitTypeId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
