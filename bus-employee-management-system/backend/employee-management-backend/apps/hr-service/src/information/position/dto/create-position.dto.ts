import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  positionName: string;

  @IsNumber()
  @IsNotEmpty()
  departmentId: number;
}
