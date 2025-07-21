import { Injectable } from '@nestjs/common';
import { CreateController1Dto } from './dto/create-controller1.dto';
import { UpdateController1Dto } from './dto/update-controller1.dto';

@Injectable()
export class Controller1Service {
  create(createController1Dto: CreateController1Dto) {
    return 'This action adds a new controller1';
  }

  findAll() {
    return `This action returns all controller1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} controller1`;
  }

  update(id: number, updateController1Dto: UpdateController1Dto) {
    return `This action updates a #${id} controller1`;
  }

  remove(id: number) {
    return `This action removes a #${id} controller1`;
  }
}
