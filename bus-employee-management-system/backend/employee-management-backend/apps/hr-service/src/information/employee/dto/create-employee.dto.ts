import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  employeeNumber: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: string;

  @IsDateString()
  @IsNotEmpty()
  hiredate: string; // Make sure this matches Prisma/DB field

  @IsString()
  @IsNotEmpty()
  phone: string; // Maps to frontend "contact"

  @IsString()
  @IsNotEmpty()
  barangay: string; // Will be used as address for now

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsInt()
  @IsNotEmpty()
  positionId: number; // From dropdown

  @IsString()
  @IsOptional()
  employeeStatus?: string; // Maps to frontend "status"
}
