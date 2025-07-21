import { Module } from '@nestjs/common';
import { Controller1Service } from './controller1.service';
import { Controller1Controller } from './controller1.controller';

@Module({
  controllers: [Controller1Controller],
  providers: [Controller1Service],
})
export class Controller1Module {}
