import { IsOptional, IsString, IsInt } from 'class-validator';
export class UpdatePositionDto {
  @IsString()
  @IsOptional()
  positionName?: string;

  @IsInt()
  @IsOptional()
  departmentId?: number;
}
