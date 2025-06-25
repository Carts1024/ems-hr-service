import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  IsNumber,
  IsDecimal,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  employeeNumber?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  suffix?: string;

  @IsDateString()
  @IsOptional()
  birthdate?: string;

  @IsDateString()
  @IsOptional()
  hiredate?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  streetAddress?: string;

  @IsString()
  @IsOptional()
  barangay?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  emergencyContactName?: string;

  @IsString()
  @IsOptional()
  emergencyContactNo?: string;

  @IsDecimal()
  @IsOptional()
  basicPay?: number | string;

  @IsString()
  @IsOptional()
  licenseType?: string;

  @IsString()
  @IsOptional()
  licenseNo?: string;

  @IsArray()
  @IsOptional()
  restrictionCodes?: string[];

  @IsDateString()
  @IsOptional()
  expireDate?: string;

  @IsString()
  @IsOptional()
  employeeStatus?: string; // default: 'active'

  @IsString()
  @IsOptional()
  employeeType?: string; // default: 'regular'

  @IsString()
  @IsOptional()
  employeeClassification?: string;

  @IsDateString()
  @IsOptional()
  terminationDate?: string;

  @IsString()
  @IsOptional()
  terminationReason?: string;

  @IsInt()
  @IsOptional()
  positionId?: number;
}
