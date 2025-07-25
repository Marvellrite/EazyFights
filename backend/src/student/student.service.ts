import { Injectable, NotFoundException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import {  Registration as registration } from './schemas/registration.schema';
import {  Model } from 'mongoose';
import deleteFromCloudinary from 'src/lib/deleteFromCloudinary';


@Injectable()
export class StudentService {

  constructor(@InjectModel(registration.name) private studentModel: Model<registration> ){

  }


  create(registrationInfo: RegistrationDto&{passportPhoto:string, publicId:string}) {
    return this.studentModel.create(registrationInfo);
  }
  
  findAll() {
    return this.studentModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} Registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} Registration`;
  }

 async deleteStudent(id: string) {
    
     const student = await this.studentModel.findById(id);
        if (!student) {
          throw new NotFoundException('Registration not found');
        }
    
        // Step 1: Delete from Cloudinary
        if (student.publicId) {
          await deleteFromCloudinary(student.publicId);
        }
    
        // Step 2: Delete from DB
        await this.studentModel.findByIdAndDelete(id);
    


  }


}
