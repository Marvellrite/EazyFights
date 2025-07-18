import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationService {
  create(registrationDto: RegistrationDto) {
    return 'This action adds a new Registration';
  }

  findAll() {
    return `This action returns all Registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} Registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} Registration`;
  }
}
