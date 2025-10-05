/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBenefitsDto } from './create-benefits.dto';

export class UpdateBenefitDto extends PartialType(CreateBenefitsDto) {}
