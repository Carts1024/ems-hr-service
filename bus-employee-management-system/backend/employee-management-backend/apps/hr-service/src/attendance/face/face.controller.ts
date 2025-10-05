import { Controller, Post, Body } from '@nestjs/common';
import { FaceService } from './face.service';
import { EnrollFaceDto } from './dto/enroll-face.dto';

@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('enroll')
  async enrollFace(@Body() enrollFaceDto: EnrollFaceDto) {
    return this.faceService.saveFace(enrollFaceDto);
  }
}
