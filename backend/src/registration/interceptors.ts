// no-files.interceptor.ts
import { FileFieldsInterceptor } from '@nestjs/platform-express';

export function NoFilesInterceptor() {
  return FileFieldsInterceptor([]);
}
