import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "./user.schema";
import { TestMiddleware, TestMiddleware2 } from "src/middlewares/test";
import { Controller1Module } from "src/controller1/controller1.module";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]), Controller1Module
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(TestMiddleware).forRoutes({path:'users', method:RequestMethod.GET});
    consumer.apply(TestMiddleware2).forRoutes({path:'controller1', method:RequestMethod.GET});

  }
}

console.log(UserModule);
