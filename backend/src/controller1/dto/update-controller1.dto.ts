import { PartialType } from '@nestjs/mapped-types';
import { CreateController1Dto } from './create-controller1.dto';

export class UpdateController1Dto extends PartialType(CreateController1Dto) {}
