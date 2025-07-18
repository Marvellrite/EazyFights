import { PartialType } from '@nestjs/mapped-types';
import { registrationDto } from './registration.dto';

export class UpdateRegistrationDto extends PartialType(registrationDto) {}
