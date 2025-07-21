import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { RegistrationModule } from './registration/registration.module';
import { ServeStaticModule } from "@nestjs/serve-static/dist";
import { resolve } from "path";
import { TestMiddleware2 } from "./middlewares/test";


const frontendPath = resolve(__dirname+"/../"+"/../"+ "/frontend/"+"/dist");

console.log(frontendPath);

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:frontendPath, exclude:["api/*"]}),
    UserModule,
    // MongooseModule.forRoot("mongodb+srv://marvel_cadet:marvelsix@cluster0.yoory8s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    MongooseModule.forRoot("mongodb://localhost:27017"),
    AuthModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware2).forRoutes({path:'controller1', method:RequestMethod.GET})
  }
}
