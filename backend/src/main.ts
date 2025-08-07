import dotenv from 'dotenv';
dotenv.config();
import { StudentService } from './student/student.service';

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.setGlobalPrefix("api");
  const studentService = app.get(StudentService);
  await studentService.ensureUniqueIndexes();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
