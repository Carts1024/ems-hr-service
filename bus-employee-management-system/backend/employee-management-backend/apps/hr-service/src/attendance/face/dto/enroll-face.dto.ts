import { IsString } from 'class-validator';

export class EnrollFaceDto {
  @IsString()
  employeeNumber: string;

  @IsString()
  imageBase64: string; // Format: data:image/jpeg;base64,
}
