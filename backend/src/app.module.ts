import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { StudentModule } from './student/student.module';
import { ServeStaticModule } from "@nestjs/serve-static/dist";
import { join, resolve } from "path";
import { ConfigModule } from "@nestjs/config";
import { cloudinary } from "./config/cloudinary.config";

const frontendPath = resolve( "frontend" );
@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:frontendPath, exclude:["api/*"],}),
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    StudentModule,
    ConfigModule.forRoot({isGlobal:true,
      load:[cloudinary]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {

}
