import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller1Service } from './controller1.service';
import { CreateController1Dto } from './dto/create-controller1.dto';
import { UpdateController1Dto } from './dto/update-controller1.dto';

@Controller('controller1')
export class Controller1Controller {
  constructor(private readonly controller1Service: Controller1Service) {}

  @Post()
  create(@Body() createController1Dto: CreateController1Dto) {
    return this.controller1Service.create(createController1Dto);
  }

  @Get()
  findAll() {
    console.log("Accessing the get route of controller1")
    return this.controller1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controller1Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateController1Dto: UpdateController1Dto) {
    return this.controller1Service.update(+id, updateController1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controller1Service.remove(+id);
  }
}
