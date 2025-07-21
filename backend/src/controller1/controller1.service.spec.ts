import { Test, TestingModule } from '@nestjs/testing';
import { Controller1Service } from './controller1.service';

describe('Controller1Service', () => {
  let service: Controller1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Controller1Service],
    }).compile();

    service = module.get<Controller1Service>(Controller1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
