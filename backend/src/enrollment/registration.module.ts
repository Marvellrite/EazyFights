import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Registration, RegistrationSchema } from './schemas/registration.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema }])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
