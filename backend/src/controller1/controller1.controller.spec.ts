import { Test, TestingModule } from '@nestjs/testing';
import { Controller1Controller } from './controller1.controller';
import { Controller1Service } from './controller1.service';

describe('Controller1Controller', () => {
  let controller: Controller1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Controller1Controller],
      providers: [Controller1Service],
    }).compile();

    controller = module.get<Controller1Controller>(Controller1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
