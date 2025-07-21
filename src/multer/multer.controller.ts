import { Controller } from '@nestjs/common';
import { MulterService } from './multer.service';

@Controller('multer')
export class MulterController {
  constructor(private readonly multerService: MulterService) {}
}
