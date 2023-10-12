import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApiKeyGuard } from './apps/app.guard';
import { AppModule } from './apps/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));

  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalFilters(new HttpExceptionFilter())

  app.setViewEngine('ejs');



  const config = new DocumentBuilder()
    .setTitle('StarterKit Project')
    .setDescription('This is nestjs starter kit, it\'s will help you when creating new project with nestjs.')
    .setVersion('1.0')
    .addSecurity('api-key', {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key'
    })
    .addBearerAuth()
    .addTag('Auth', "All about authentication")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(APP_PORT);
  
  console.log("--------------------------------------------------------");
  
  if(process.env.DB_EXPOSED_PORT != undefined) {
    console.log(`Adminer Exposed on http://0.0.0.0:${process.env.ADMINER_EXPOSED_PORT}/?pgsql=${process.env.DB_HOST}&username=${process.env.DB_USER}&db=${process.env.DB_NAME}`);
  }
  
  if(process.env.APP_EXPOSED_PORT != undefined) {
    console.log(`App Exposed on http://0.0.0.0:${process.env.APP_EXPOSED_PORT}`);
    console.log(`Swagger Exposed on http://0.0.0.0:${process.env.APP_EXPOSED_PORT}/docs`);
  }

  console.log("--------------------------------------------------------");
  
}

bootstrap();
