import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultTypeOrmConfig } from 'src/config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { I18nModule, QueryResolver, HeaderResolver, AcceptLanguageResolver } from 'nestjs-i18n'
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '..', 'i18n'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(["lang", "l"]),
        new HeaderResolver(["x-app-lang"]),
        AcceptLanguageResolver,
      ]
    }),
    TypeOrmModule.forRootAsync(defaultTypeOrmConfig),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET
        }
      }
    }),
    AuthModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
