import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import {  Registration as registration } from './schemas/registration.schema';
import { HydratedDocument, Model } from 'mongoose';


@Injectable()
export class RegistrationService {

  constructor(@InjectModel(registration.name) private Registration: Model<registration> ){

  }


  create(registrationDto: RegistrationDto) {
    return this.Registration.create(registrationDto);
  }
  
  findAll() {
    return this.Registration.find({});
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
