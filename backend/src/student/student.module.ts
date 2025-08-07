import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Registration, RegistrationSchema } from './schemas/student.registration.schema';
import { StudentController } from "./student.controller";
// import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports:[MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema }])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
