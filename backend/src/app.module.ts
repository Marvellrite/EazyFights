import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { RegistrationModule } from './enrollment/Registration.module';
import { FrontendModule } from './frontend/frontend.module';

console.log(UserModule);
console.log(AuthModule);
console.log(MongooseModule);
console.log(MongooseModule.forRoot("mongodb://localhost:27017"));

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot("mongodb://localhost:27017"),
    AuthModule,
    RegistrationModule,
    FrontendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
