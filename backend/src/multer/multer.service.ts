import { Injectable, Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';

@Injectable()
export class MulterService {

    constructor(@Inject(MODULE_OPTIONS_TOKEN) private option){
        console.log(option);
    }

}
