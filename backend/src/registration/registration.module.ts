import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Registration, RegistrationSchema } from './schemas/registration.schema';
import { MulterModule } from '../multer/multer.module';

// 'CONFIGURABLE_MODULE_OPTIONS[1cf35d9635ec6d4672429]'  CONFIGURABLE_MODULE_OPTIONS[1cf35d9635ec6d4672429]

console.log(MulterModule.register({filename:'test_filed'}))
@Module({
  imports:[MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema }]), MulterModule.register({filename:'test_filed'})],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
