import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Post,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ConfigService } from "src/config/config.service";

@Controller("users")
export class UsersController {
  constructor(
    private userServices: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll() {
    return this.userServices.getAllUsers();
  }

  @Get("config")
  getConfig() {
    return this.configService.get("DATA");
  }

  @Get(":id")
  @UsePipes(new ValidationPipe())
  findOne(@Param("id") id: string) {
    return this.userServices.getAUser(id);
  }

  @Post()
  createUser(@Body() userInfo: CreateUserDto) {
    return this.userServices.createUser(userInfo);
  }

  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() userInfo: UpdateUserDto) {
    return this.userServices.updateUser(id, userInfo);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userServices.deleteUsers(id);
  }
}
