import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { RegistrationModule } from './registration/registration.module';
import { ServeStaticModule } from "@nestjs/serve-static/dist";
import { join, resolve } from "path";


const frontendPath = resolve( "frontend" );

console.log(frontendPath);
console.log(__dirname);
@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:frontendPath, exclude:["api/*"]}),
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {

}
