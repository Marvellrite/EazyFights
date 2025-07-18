import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { RegistrationModule } from './registration/registration.module';
import { ServeStaticModule } from "@nestjs/serve-static/dist";
import { resolve } from "path";


const frontendPath = resolve(__dirname+"/../"+"/../"+ "/frontend/"+"/dist");

console.log(frontendPath);

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:frontendPath, exclude:["api/*"]}),
    UserModule,
    MongooseModule.forRoot("mongodb://localhost:27017"),
    AuthModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
