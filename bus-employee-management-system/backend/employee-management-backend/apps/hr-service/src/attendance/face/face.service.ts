import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EnrollFaceDto } from './dto/enroll-face.dto';

@Injectable()
export class FaceService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFace(dto: EnrollFaceDto) {
    const { employeeNumber, imageBase64 } = dto;

    const base64Data = imageBase64.replace(/^data:image\/jpeg;base64,/, '');

    // Save the face image to the database
    return await this.prisma.employee.update({
      where: { id: employeeNumber },
      data: {
        faceImage: base64Data,
      },
    });
  }
}
