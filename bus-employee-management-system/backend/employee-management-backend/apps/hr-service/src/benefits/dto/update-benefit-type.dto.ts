import { PartialType } from '@nestjs/mapped-types';
import { CreateBenefitTypeDto } from './create-benefit-type.dto';

export class UpdateBenefitTypeDto extends PartialType(CreateBenefitTypeDto) {}
