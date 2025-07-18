import { Controller } from '@nestjs/common';
import { FrontendService } from './frontend.service';

@Controller('frontend')
export class FrontendController {
  constructor(private readonly frontendService: FrontendService) {}
}
