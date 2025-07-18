import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Controller('Registration')
export class RegistrationController {
  constructor(private readonly RegistrationService: RegistrationService) {}

  @Post()
  create(@Body(ValidationPipe) registrationDto: RegistrationDto) {
    return this.RegistrationService.create(registrationDto);
  }

  @Get()
  findAll() {
    return this.RegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.RegistrationService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RegistrationService.remove(+id);
  }
}
