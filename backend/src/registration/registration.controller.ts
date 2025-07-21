import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from './interceptors';
@Controller('Registration')
export class RegistrationController {
  constructor(private readonly RegistrationService: RegistrationService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body(new ValidationPipe({transform:true})) registrationDto: RegistrationDto) {
    await this.RegistrationService.create(registrationDto);
    return { msg: "Form Submitted Successfully" }
  }

  @Get()
  findAll() {
   this.RegistrationService.findAll();

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


