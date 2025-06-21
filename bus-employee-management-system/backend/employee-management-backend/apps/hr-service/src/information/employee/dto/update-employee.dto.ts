/* eslint-disable prettier/prettier */
import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
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
  barangay?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsInt()
  @IsOptional()
  positionId?: number;

  @IsString()
  @IsOptional()
  employeeStatus?: string;
}
