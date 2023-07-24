import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApiKeyGuard } from './apps/app.guard';
import { AppModule } from './apps/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

const APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));

  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalFilters(new HttpExceptionFilter())

  app.setViewEngine('ejs');

  await app.listen(APP_PORT);

  console.log('listening http://0.0.0.0:' + APP_PORT);
}

bootstrap();
