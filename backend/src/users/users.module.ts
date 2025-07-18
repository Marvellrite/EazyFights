import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "./user.schema";
import { ConfigModule } from "src/config/config.module";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    ConfigModule.register({ filename: "production" }),
    // ConfigModule.register("production"),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

console.log(UserModule);
