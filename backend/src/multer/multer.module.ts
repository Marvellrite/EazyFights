import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';
import { ConfigurableModuleClass } from './config.module-definition';

@Module({
  providers: [MulterService],
})
export class MulterModule extends ConfigurableModuleClass {}
