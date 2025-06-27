import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateGovernmentIdDto {
  @IsString()
  employeeId: string;

  @IsNumber()
  typeId: number; // Now an integer, references GovernmentIDType

  @IsString()
  idNumber: string;

  @IsOptional()
  @IsDateString()
  issuedDate?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
